import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingDetail } from './shipping-detail';

describe('ShippingDetail', () => {
  let component: ShippingDetail;
  let fixture: ComponentFixture<ShippingDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShippingDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShippingDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
