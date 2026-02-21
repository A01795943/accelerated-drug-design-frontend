import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxSetting } from './tax-setting';

describe('TaxSetting', () => {
  let component: TaxSetting;
  let fixture: ComponentFixture<TaxSetting>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaxSetting]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaxSetting);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
