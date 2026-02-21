import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivedOrders } from './received-orders';

describe('ReceivedOrders', () => {
  let component: ReceivedOrders;
  let fixture: ComponentFixture<ReceivedOrders>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceivedOrders]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceivedOrders);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
