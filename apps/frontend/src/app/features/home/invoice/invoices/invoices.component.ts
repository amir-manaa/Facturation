import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-invoices',
    imports: [CommonModule, RouterLink],
    templateUrl: './invoices.component.html',
    styleUrl: './invoices.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvoicesComponent {}
