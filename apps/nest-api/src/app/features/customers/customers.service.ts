import { Inject, Injectable } from '@nestjs/common';
import { Repository, DeleteResult, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  toDto,
  toDtoArray,
} from '@api/common/mappers/dto.mapper';
import { ERROR_CODES } from '@org/error-catalog';
import { AppHttpException } from '@api/common/exceptions/app-http-exception';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { LoggerDevService } from '@api/common/services/logger-dev.service';
import { QueueService } from '@api/app/infrastructure/queue/queue.service';
import { JobName } from '@api/app/infrastructure/queue/jobs/job.interface';
import { CustomerEntity } from './entities/customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CustomerResponseDto } from './dto/customer-response.dto';
import { CustomerTypeEnum } from './models/enums/customer-type.enum';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomersService {
  // private readonly logger: Logger = new Logger(UsersService.name) ;

  // Clés Redis centralisées — évite les typos et facilite l'invalidation
  private readonly CACHE_KEYS = {
    ALL_CUSTOMERS: 'customers:all',
    CUSTOMER: (id: string) => `customers:${id}`, // → "customers:42"
  };

  // TTL spécifiques (en millisecondes)
  private readonly TTL = {
    ALL_CUSTOMERS: 30 * 1000, // liste : 30s (change souvent)
    CUSTOMER: 5 * 60 * 1000, // détail : 5min (change moins)
  };

  constructor(
    @InjectRepository(CustomerEntity)
    private customerRepository: Repository<CustomerEntity>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private logger: LoggerDevService,
    private queueService: QueueService
  ) {}

  async findAll(): Promise<CustomerResponseDto[]> {
    const cacheKey = this.CACHE_KEYS.ALL_CUSTOMERS;

    try {
      const cached = await this.cacheManager.get<CustomerResponseDto[]>(
        cacheKey
      );
      if (cached && Array.isArray(cached)) {
        this.logger.debug(`Users retrieved from cache`);
        return cached;
      }
    } catch (error) {
      this.logger.warn(
        `Cache unavailable, falling back to DB: ${error.message}`
      );
    }

    const customers = await this.customerRepository.find({
      order: {
        createdAt: 'DESC'
      }
    });
    // Retourner une liste vide au lieu de lever une exception
    // Une liste vide est une réponse valide
    const customersDto =
      customers.length > 0 ? toDtoArray(customers, CustomerResponseDto) : [];

    try {
      await this.cacheManager.set(
        cacheKey,
        customersDto,
        this.TTL.ALL_CUSTOMERS
      );
      this.logger.debug(`Users cached successfully`);
    } catch (error) {
      // Utiliser le logger pour la cohérence (au lieu de console.log)
      this.logger.warn(`Failed to set cache for all users: ${error.message}`);
    }

    return customersDto;
  }

  async findOne(id: string): Promise<CustomerResponseDto> {
    const cacheKey = this.CACHE_KEYS.CUSTOMER(id);

    try {
      const cached = await this.cacheManager.get<CustomerResponseDto>(cacheKey);
      if (cached) {
        return cached;
      }
    } catch (error) {
      this.logger.warn(
        `Cache unavailable, falling back to DB: ${error.message}`
      );
    }

    const user = await this.customerRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new AppHttpException(ERROR_CODES.USER_NOT_FOUND);
    }

    const userDTO = toDto(user, CustomerResponseDto);

    try {
      await this.cacheManager.set(cacheKey, userDTO, this.TTL.CUSTOMER);
    } catch (error) {
      this.logger.warn(
        `Cache unavailable, falling back to DB: ${error.message}`
      );
    }

    return userDTO;
  }

  // async createOne(body: UserParams);
  async createOne(
    createCustomerDto: CreateCustomerDto
  ): Promise<CustomerResponseDto> {
    const isDuplicated: boolean = await this.isDuplicatedCustomer(
      createCustomerDto
    );

    if (isDuplicated) {
      throw new AppHttpException(ERROR_CODES.USER_ALREADY_EXISTS);
    }

    const customerToCreate = this.customerRepository.create({
      ...createCustomerDto,
    });

    let savedCustomer: CustomerEntity | null = null;
    try {
      savedCustomer = await this.customerRepository.save(customerToCreate);
    } catch (error) {
      throw new AppHttpException(ERROR_CODES.USER_CREATION_FAILED);
    }

    try {
      await this.cacheManager.del(this.CACHE_KEYS.ALL_CUSTOMERS);
    } catch (error) {
      this.logger.warn(`Failed to invalidate cache: ${error.message}`);
    }

    await this.queueService.addJob(JobName.WELCOME_EMAIL, {
      email: createCustomerDto.email,
      name: `${
        createCustomerDto.type === CustomerTypeEnum.PART
          ? createCustomerDto.name
          : createCustomerDto.companyName
      }`,
    });

    return toDto(savedCustomer, CustomerResponseDto);
  }

  async updateOne(id: string, updateCustomerDto: CreateCustomerDto): Promise<UpdateCustomerDto> {
    const { type, name, companyName, ...rest } = updateCustomerDto;

    const payload = {
      ...rest,
      name: type === CustomerTypeEnum.PRO ? null : name ?? null,
      companyName: type === CustomerTypeEnum.PART ? null : companyName ?? null,
    };

    let result: UpdateResult | null = null;
    try {
      result = await this.customerRepository.update(id, payload);
    } catch (error) {
      throw new AppHttpException(ERROR_CODES.USER_UPDATE_FAILED);
    }

    if (!result.affected) {
      throw new AppHttpException(ERROR_CODES.USER_NOT_FOUND);
    }

    try {
      await Promise.all([
        this.cacheManager.del(this.CACHE_KEYS.ALL_CUSTOMERS),
        this.cacheManager.del(this.CACHE_KEYS.CUSTOMER(id)),
      ]);
    } catch (error) {
      this.logger.warn(`Failed to invalidate cache: ${error.message}`);
    }

    const updatedCustomer = await this.customerRepository.findOne({
      where: { id },
    });

    if (!updatedCustomer) {
      throw new AppHttpException(ERROR_CODES.USER_NOT_FOUND);
    }

    return toDto(updatedCustomer, CustomerResponseDto);
  };

  async deleteOne(id: string): Promise<DeleteResult> {
    let result: DeleteResult | null = null;
    try {
      result = await this.customerRepository.delete(id);
    } catch (error) {
      throw new AppHttpException(ERROR_CODES.USER_DELETION_FAILED);
    }

    try {
      await this.cacheManager.del(this.CACHE_KEYS.ALL_CUSTOMERS);
    } catch (error) {
      this.logger.warn(`Failed to invalidate cache: ${error.message}`);
    }

    return result;
  }

  private async isDuplicatedCustomer(
    createCustomerDto: CreateCustomerDto
  ): Promise<boolean> {
    const condition =
      createCustomerDto.type === CustomerTypeEnum.PART
        ? { name: createCustomerDto.name }
        : { companyName: createCustomerDto.companyName };
    return await this.customerRepository.exists({
      where: condition,
    });
  }

  async findCustomerById(customerId: string) {
    return await this.customerRepository.findOne({ where: { id: customerId } });
  }
}
