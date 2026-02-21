import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoucherSetting } from './voucher-setting';

describe('VoucherSetting', () => {
  let component: VoucherSetting;
  let fixture: ComponentFixture<VoucherSetting>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoucherSetting]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoucherSetting);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
