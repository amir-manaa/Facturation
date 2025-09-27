import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomersComponent } from './customers.component';
import { CustomerService } from '../service/customer.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('CustomersComponent', =() => {
  let component: CustomersComponent;
  let fixture: ComponentFixture<CustomersComponent>;
  let customerServiceMock: any;

  beforeEach(async () => {
    customerServiceMock = {
      getAll: jest.fn(),
    }
    await TestBed.configureTestingModule({
      imports: [CustomersComponent],
      providers: [{
        provide: CustomerService,
        useValue: customerServiceMock
      }, {
        provide: ActivatedRoute,
        useValue: { queryParams: of({ limit: 0, search: 'test' }) }
      },],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomersComponent);
    component = fixture.componentInstance;
    component.customers = { set: jest.fn() }.set([]);
    component.totalCount = { set: jest.fn() }.set(0);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch customers and set totalcount and customers', () => {
    const mockResponse = {
      totalCount: 2,
      customers: [
        {
          id: "bbbf0f89-b098-4883-9622-6ed5456d250b",
          name: "btbtb",
          address: "nyny",
          phone: 96617285,
          email: "amir.manaa@gmail.com",
          role: 3,
          createdAt: "2024-12-03T23:39:19.515Z",
          updatedAt: "2024-12-25T20:31:27.630Z",
          userId: "d91857da-562d-4e69-97d9-8551ea40d267"
        },
        {
          id: "4b80c5cc-c3ff-4eca-b68e-9c86aa0876b4",
          name: "tesrrrr",
          address: "uhuhum",
          phone: null,
          email: "",
          role: 3,
          createdAt: "2024-12-08T15:22:29.169Z",
          updatedAt: "2024-12-09T00:02:46.487Z",
          userId: "d91857da-562d-4e69-97d9-8551ea40d267"
        }
      ]
    };
    customerServiceMock.getAll.mockReturnValue(of(mockResponse));
    component.getAll();

    expect(customerServiceMock.getAll).toHaveBeenCalledWith({
      limit: 2,
      search: 'test'
    });

    expect(component.customers.set).toHaveBeenCalledWith(mockResponse.customers);
    expect(component.totalCount.set).toHaveBeenCalledWith(mockResponse.totalCount);
  });
});
