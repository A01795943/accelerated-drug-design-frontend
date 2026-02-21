import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSetting } from './customer-setting';

describe('CustomerSetting', () => {
  let component: CustomerSetting;
  let fixture: ComponentFixture<CustomerSetting>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerSetting]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerSetting);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
