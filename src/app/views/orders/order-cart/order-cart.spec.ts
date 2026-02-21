import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderCart } from './order-cart';

describe('OrderCart', () => {
  let component: OrderCart;
  let fixture: ComponentFixture<OrderCart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderCart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderCart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
