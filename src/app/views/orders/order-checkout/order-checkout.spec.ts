import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderCheckout } from './order-checkout';

describe('OrderCheckout', () => {
  let component: OrderCheckout;
  let fixture: ComponentFixture<OrderCheckout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderCheckout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderCheckout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
