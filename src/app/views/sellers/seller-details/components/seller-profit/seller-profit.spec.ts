import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerProfit } from './seller-profit';

describe('SellerProfit', () => {
  let component: SellerProfit;
  let fixture: ComponentFixture<SellerProfit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellerProfit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerProfit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
