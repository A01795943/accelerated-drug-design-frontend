import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponState } from './coupon-state';

describe('CouponState', () => {
  let component: CouponState;
  let fixture: ComponentFixture<CouponState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CouponState]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CouponState);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
