import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddCustomerComponent } from './add-customer.component';
import { CustomerService } from '../service/customer.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';

describe('AddCustomerComponent', () => {
  let component: AddCustomerComponent;
  let fixture: ComponentFixture<AddCustomerComponent>;
  let mockCustomerService: jest.Mocked<CustomerService>;
  let mockRouter: jest.Mocked<Router>;
  let mockHttpClient: jest.Mocked<HttpClient>;

  beforeEach(async () => {
    mockCustomerService = {
      add: jest.fn().mockReturnValue(of({}))
    } as any;

    mockRouter = {
      navigateByUrl: jest.fn()
    } as any;

    mockHttpClient = {} as any;

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [
        { provide: CustomerService, useValue: mockCustomerService },
        { provide: Router, useValue: mockRouter },
        { provide: HttpClient, useValue: mockHttpClient }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values', () => {
    expect(component.addForm.get('name')?.value).toBe('');
    expect(component.addForm.get('address')?.value).toBe('');
    expect(component.addForm.get('phone')?.value).toBeNull();
    expect(component.addForm.get('email')?.value).toBe('');
  });

  it('should validate required fields', () => {
    const form = component.addForm;
    expect(form.valid).toBeFalsy();

    form.controls['name'].setValue('John Doe');
    form.controls['address'].setValue('123 Street');
    form.controls['phone'].setValue(1234567890);
    form.controls['email'].setValue('john@example.com');

    expect(form.valid).toBeTruthy();
  });

  it('should reset form when resetForm is called', () => {
    component.addForm.controls['name'].setValue('Test');
    component.resetForm();
    expect(component.addForm.get('name')?.value).toBe('');
  });

  it('should submit form and navigate when valid', () => {
    const formValue = {
      name: 'John Doe',
      address: '123 Street',
      phone: 1234567890,
      email: 'john@example.com'
    };

    component.addForm.setValue(formValue);
    component.onSubmit();

    expect(mockCustomerService.add).toHaveBeenCalledWith(formValue);
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/customers');
  });

  it('should validate phone number correctly', () => {
    const form = component.addForm;

    // Test null phone number
    form.controls['phone'].setValue(null);
    expect(component['phoneValidator']()).toBeTruthy();

    // Test invalid phone number
    form.controls['phone'].setValue(123);
    expect(component['phoneValidator']()).toBeFalsy();
  });

  it('should validate email correctly', () => {
    const form = component.addForm;

    // Test empty email
    form.controls['email'].setValue('');
    expect(component['emailValidator']()).toBeTruthy();

    // Test valid email
    form.controls['email'].setValue('test@example.com');
    expect(component['emailValidator']()).toBeTruthy();

    // Test invalid email
    form.controls['email'].setValue('invalid-email');
    expect(component['emailValidator']()).toBeFalsy();
  });
});
