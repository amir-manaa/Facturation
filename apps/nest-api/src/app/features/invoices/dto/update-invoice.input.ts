import { PartialType, InputType } from '@nestjs/graphql';
import { CreateInvoiceInput } from '@api/app/features/invoices/dto/create-invoice.input';

@InputType()
export class UpdateInvoiceInput extends PartialType(CreateInvoiceInput) {}
