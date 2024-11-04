import { ChangeDetectionStrategy, Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from '../service/customer.service';
import { customValidator } from '@utils';

@Component({
  selector: 'app-add-customer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-customer.component.html',
  styleUrl: './add-customer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddCustomerComponent implements OnInit {
  addForm!: FormGroup;
  submitedForm = signal(false);
  customerService = inject(CustomerService);
  router = inject(Router);

  ngOnInit() {
    this.initForm();
  }

  onSubmit() {
    this.submitedForm.set(true);
    if (
      this.addForm.valid ||
      (
        this.addForm.invalid &&
        this.addForm.get('name')?.valid &&
        this.addForm.get('address')?.valid &&
        this.addForm.get('phone')?.value === null &&
        this.addForm.get('email')?.value === ''
      )
    ) {
      this.customerService.add(this.addForm.value).subscribe({
        complete: () => this.router.navigateByUrl('/customers'),
      })
    }
  }

  get form() {
    return this.addForm.controls;
  }

  resetForm() {
    this.addForm.reset();
  }

  private initForm() {
    this.addForm = new FormGroup({
      name: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
      address: new FormControl<string>('', {nonNullable: true, validators: [Validators.required, Validators.required]}),
      phone: new FormControl<number | null>(null, [customValidator.validatePhone()]),
      email: new FormControl<string>('', [customValidator.validateEmail()]),
    });

    this.addForm.valueChanges.subscribe(console.log)
  }
}
