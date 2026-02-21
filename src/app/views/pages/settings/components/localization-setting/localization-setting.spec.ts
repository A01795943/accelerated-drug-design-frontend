import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalizationSetting } from './localization-setting';

describe('LocalizationSetting', () => {
  let component: LocalizationSetting;
  let fixture: ComponentFixture<LocalizationSetting>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocalizationSetting]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocalizationSetting);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
