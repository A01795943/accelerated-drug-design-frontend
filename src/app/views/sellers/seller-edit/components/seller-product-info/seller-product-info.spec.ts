import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerProductInfo } from './seller-product-info';

describe('SellerProductInfo', () => {
  let component: SellerProductInfo;
  let fixture: ComponentFixture<SellerProductInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellerProductInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerProductInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
