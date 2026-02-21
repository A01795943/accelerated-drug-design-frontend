import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentOrder } from './recent-order';

describe('RecentOrder', () => {
  let component: RecentOrder;
  let fixture: ComponentFixture<RecentOrder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentOrder]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecentOrder);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
