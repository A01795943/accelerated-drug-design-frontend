import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponsList } from './coupons-list';

describe('CouponsList', () => {
  let component: CouponsList;
  let fixture: ComponentFixture<CouponsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CouponsList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CouponsList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
