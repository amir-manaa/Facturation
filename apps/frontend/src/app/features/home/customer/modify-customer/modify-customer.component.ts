import { ChangeDetectionStrategy, Component, OnInit, signal, inject, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerService } from '../service/customer.service';
import { customValidator } from '@utils';
import { ICustomer } from '../models';

@Component({
  selector: 'app-modify-customer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './modify-customer.component.html',
  styleUrl: './modify-customer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModifyCustomerComponent {
  customerService = inject(CustomerService);
  router = inject(Router);

  modifyForm!: FormGroup;
  id: string   = inject(ActivatedRoute).snapshot.params['id'];
  submitedForm: WritableSignal<boolean> = signal(false);
  customer!: ICustomer;

  ngOnInit(): void {
    this.initForm();
    this.getCustomer(this.id);
  }

  onSubmit(): void {
    this.submitedForm.set(true);
    if (
      this.modifyForm.valid ||
      (this.modifyForm.invalid &&
        this.modifyForm.get('name')?.valid &&
        this.modifyForm.get('address')?.valid &&
        this.modifyForm.get('phone')?.value === null &&
        this.modifyForm.get('email')?.value === '')
    ) {
      this.customerService.modify(this.id, this.modifyForm.value).subscribe({
        complete: () => this.router.navigateByUrl('/customers'),
      });
    }
  }

  get form() {
    return this.modifyForm.controls;
  }

  resetForm(): void {
    this.modifyForm.setValue({
      name: this.customer.name,
      address: this.customer.address,
      phone: this.customer.phone,
      email: this.customer.email,
    });
  }

  private initForm(): void {
    this.modifyForm = new FormGroup({
      name: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      address: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required, Validators.required],
      }),
      phone: new FormControl<number | null>(null, [
        customValidator.validatePhone(),
      ]),
      email: new FormControl<string>('', [customValidator.validateEmail()]),
    });
  }

  private getCustomer(id: string): void {
    this.customerService.getOne(id).subscribe(customer => {
      this.customer = customer;
      this.modifyForm.setValue({
        name: customer.name,
        address: customer.address,
        phone: customer.phone,
        email: customer.email,
      });
    })
  }
}
