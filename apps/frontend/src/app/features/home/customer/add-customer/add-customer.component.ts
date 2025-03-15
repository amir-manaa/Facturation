import { ChangeDetectionStrategy, Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CustomerService } from '../service/customer.service';
import { customValidator } from '@utils';
import {MatIconModule} from '@angular/material/icon';





import { HttpClient} from '@angular/common/http';

@Component({
    selector: 'app-add-customer',
    imports: [CommonModule, ReactiveFormsModule, MatIconModule, RouterLink],
    templateUrl: './add-customer.component.html',
    styleUrl: './add-customer.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddCustomerComponent implements OnInit {
  addForm!: FormGroup;
  submitedForm = signal(false);
  customerService = inject(CustomerService);
  router = inject(Router);


  http = inject(HttpClient);

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
        this.phoneValidator() &&
        this.emailValidator()
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
  }

  private phoneValidator(): boolean {
    if (this.addForm.controls['phone'].value === null)
      return true;
    return this.addForm.controls['phone'].valid;
  }

  private emailValidator(): boolean {
    if (this.addForm.controls['email'].value === '')
      return true;
    return this.addForm.controls['email'].valid;
  }
}
