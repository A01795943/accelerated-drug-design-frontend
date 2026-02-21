import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponInfo } from './coupon-info';

describe('CouponInfo', () => {
  let component: CouponInfo;
  let fixture: ComponentFixture<CouponInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CouponInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CouponInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
