import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerState } from './customer-state';

describe('CustomerState', () => {
  let component: CustomerState;
  let fixture: ComponentFixture<CustomerState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerState]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerState);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
