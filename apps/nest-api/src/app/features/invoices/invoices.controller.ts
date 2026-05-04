import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@api/common/guards/auth.guard';
import { InvoicesService } from '@api/app/features/invoices/invoices.service';


@Controller('users')
@UseGuards(AuthGuard)
export class InvoicesController {
  constructor(private invoicesService: InvoicesService) {}
}
