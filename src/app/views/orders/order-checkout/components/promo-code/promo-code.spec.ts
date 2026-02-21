import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoCode } from './promo-code';

describe('PromoCode', () => {
  let component: PromoCode;
  let fixture: ComponentFixture<PromoCode>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromoCode]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromoCode);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
