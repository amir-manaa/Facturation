import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InvoiceEntity } from '@api/app/features/invoices/entities/invoice.entity';
import { CustomerEntity } from '@api/app/features/customers/entities/customer.entity';
import { InvoiceItemEntity } from '@api/app/features/invoices/entities/invoice-item.entity';
import { CreateInvoiceInput } from '@api/app/features/invoices/dto/create-invoice.input';

@Injectable()
export class InvoicesService {
  constructor(
    @InjectRepository(InvoiceEntity)
    private readonly invoiceRepo: Repository<InvoiceEntity>,
    @InjectRepository(CustomerEntity)
    private readonly customerRepo: Repository<CustomerEntity>,
    @InjectRepository(InvoiceItemEntity)
    private readonly itemsRepo: Repository<InvoiceItemEntity>
  ) {}

  async findAll(options?: any): Promise<InvoiceEntity[] | null> {
    return await this.invoiceRepo.find();
    // we set Promise on mapper so we don't need to load relations here, but if we want to load them here, we can do it like this:
    // return await this.invoiceRepo.find({
    //   relations: ['customer', 'invoiceItems'],
    // });
  }

  async findById(id: string): Promise<InvoiceEntity | null> {
    return await this.invoiceRepo.findOneOrFail({
      where: { id },
      relations: {
        customer: true,
        invoiceItems: true,
      },
    });
  }

  async findItemsByInvoiceId(invoiceId: string) {
    return await this.itemsRepo.find({
      where: { invoiceId },
    });
  }

  async create(createInvoiceInput: CreateInvoiceInput): Promise<InvoiceEntity> {
    const { customerId, invoiceItems, ...invoiceData } = createInvoiceInput;

    const customer = await this.customerRepo.findOneOrFail({
      where: { id: customerId },
    });

    const invoice = this.invoiceRepo.create({
      ...invoiceData,
      customer,
    });

    const savedInvoice = await this.invoiceRepo.save(invoice);

    console.log('savedInvoice : ', savedInvoice);
    if (invoiceItems && invoiceItems.length > 0) {
      const itemsToSave = invoiceItems.map((item) =>
        this.itemsRepo.create({
          ...item,
          invoice: savedInvoice,
        })
      );
      await this.itemsRepo.save(itemsToSave);
    }

    return savedInvoice;
  }

  async update(id: string, updateInvoiceInput: any): Promise<InvoiceEntity> {
    const invoice = await this.invoiceRepo.findOneOrFail({
      where: { id },
    });

    Object.assign(invoice, updateInvoiceInput);

    return await this.invoiceRepo.save(invoice);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.invoiceRepo.delete(id);
    return result.affected === 1;
  }
}
