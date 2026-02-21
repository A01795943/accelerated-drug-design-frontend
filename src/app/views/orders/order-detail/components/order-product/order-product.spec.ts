import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderProduct } from './order-product';

describe('OrderProduct', () => {
  let component: OrderProduct;
  let fixture: ComponentFixture<OrderProduct>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderProduct]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderProduct);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
