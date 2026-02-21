import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponsAdd } from './coupons-add';

describe('CouponsAdd', () => {
  let component: CouponsAdd;
  let fixture: ComponentFixture<CouponsAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CouponsAdd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CouponsAdd);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
