import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderTimeline } from './order-timeline';

describe('OrderTimeline', () => {
  let component: OrderTimeline;
  let fixture: ComponentFixture<OrderTimeline>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderTimeline]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderTimeline);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
