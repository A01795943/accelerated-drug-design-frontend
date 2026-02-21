import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderProgress } from './order-progress';

describe('OrderProgress', () => {
  let component: OrderProgress;
  let fixture: ComponentFixture<OrderProgress>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderProgress]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderProgress);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
