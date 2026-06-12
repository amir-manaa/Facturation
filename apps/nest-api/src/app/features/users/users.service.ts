import { Inject, Injectable } from '@nestjs/common';
import { UserEntity } from '@api/users/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '@api/users/dto/create-user.dto';
import { UserResponseDto } from '@api/users/dto/user-response.dto';
import { toDtoResponse, toDto, toDtoArray } from '@api/common/mappers/dto.mapper';
import { ERROR_CODES } from '@org/error-catalog';
import { AppHttpException } from '@api/common/exceptions/app-http-exception';
import { HashService } from '@api/common/services/hash.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { LoggerDevService } from '@api/common/services/logger-dev.service';
import { QueueService} from '@api/app/infrastructure/queue/queue.service';
import { JobName } from '@api/app/infrastructure/queue/jobs/job.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  // private readonly logger: Logger = new Logger(UsersService.name) ;

  // Clés Redis centralisées — évite les typos et facilite l'invalidation
  private readonly CACHE_KEYS = {
    ALL_USERS: 'users:all',
    USER: (id: string) => `users:${id}`, // → "users:42"
  };

  // TTL spécifiques (en millisecondes)
  private readonly TTL = {
    ALL_USERS: 30 * 1000, // liste : 30s (change souvent)
    USER: 5 * 60 * 1000, // détail : 5min (change moins)
  };

  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private hashService: HashService,
    private logger: LoggerDevService,
    private queueService: QueueService,
    private jwtService: JwtService
  ) {}

  async findAll(): Promise<UserResponseDto[]> {
    const cacheKey = this.CACHE_KEYS.ALL_USERS;

    try {
      const cached = await this.cacheManager.get<UserResponseDto[]>(cacheKey);
      if (cached && Array.isArray(cached)) {
        this.logger.debug(`Users retrieved from cache`);
        return cached;
      }
    } catch (error) {
      this.logger.warn(
        `Cache unavailable, falling back to DB: ${error.message}`
      );
    }

    const users = await this.userRepository.find();
    // Retourner une liste vide au lieu de lever une exception
    // Une liste vide est une réponse valide
    const usersDto = users.length > 0 ? toDtoArray(users, UserResponseDto) : [];

    try {
      await this.cacheManager.set(cacheKey, usersDto, this.TTL.ALL_USERS);
      this.logger.debug(`Users cached successfully`);
    } catch (error) {
      // Utiliser le logger pour la cohérence (au lieu de console.log)
      this.logger.warn(`Failed to set cache for all users: ${error.message}`);
    }

    return usersDto;
  }

  async findOne(id: string): Promise<UserResponseDto> {
    const cacheKey = this.CACHE_KEYS.USER(id);

    try {
      const cached = await this.cacheManager.get<UserResponseDto>(cacheKey);
      if (cached) {
        return cached;
      }
    } catch (error) {
      this.logger.warn(
        `Cache unavailable, falling back to DB: ${error.message}`
      );
    }

    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new AppHttpException(ERROR_CODES.USER_NOT_FOUND);
    }

    const userDTO = toDto(user, UserResponseDto);

    try {
      await this.cacheManager.set(cacheKey, userDTO, this.TTL.USER);
    } catch (error) {
      this.logger.warn(
        `Cache unavailable, falling back to DB: ${error.message}`
      );
    }

    return userDTO;
  }

  async findOneByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new AppHttpException(ERROR_CODES.USER_NOT_FOUND);
    }

    return user;
  }

  async findUserRefreshToken(id: string): Promise<{ refreshToken: string }> {
    const user = await this.userRepository.findOne({
      where: { id },
      select: ['refreshToken'],
    });

    if (!user.refreshToken) {
      throw new AppHttpException(ERROR_CODES.USER_NOT_FOUND);
    }

    return user;
  }

  // async createOne(body: UserParams);
  async createOne(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const isEmailExists = await this.emailExists(createUserDto.email);

    if (isEmailExists) {
      throw new AppHttpException(ERROR_CODES.USER_ALREADY_EXISTS);
    }

    const passwordHash = await this.hashService.hash(createUserDto.passwordHash);

    const userToCreate = this.userRepository.create({
      ...createUserDto,
      passwordHash: passwordHash,
    });

    let savedUser: UserEntity | null = null;
    try {
      savedUser = await this.userRepository.save(userToCreate);
    } catch (error) {
      throw new AppHttpException(ERROR_CODES.USER_CREATION_FAILED);
    }

    try {
      await this.cacheManager.del(this.CACHE_KEYS.ALL_USERS);
    } catch (error) {
      this.logger.warn(`Failed to invalidate cache: ${error.message}`);
    }

    await this.queueService.addJob(JobName.WELCOME_EMAIL, {
      email: createUserDto.email,
      name: `${createUserDto.firstName} ${createUserDto.lastName}`,
    });

    return toDtoResponse(savedUser);
  }

  async updateRefreshToken(userId: string, hashedToken: string): Promise<void> {
    await this.userRepository.update(userId, { refreshToken: hashedToken });
  }

  async emailExists(email: string): Promise<boolean> {
    return await this.userRepository.exists({
      where: { email },
    });
  }
}
