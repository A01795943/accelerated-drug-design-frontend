import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseReturns } from './purchase-returns';

describe('PurchaseReturns', () => {
  let component: PurchaseReturns;
  let fixture: ComponentFixture<PurchaseReturns>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchaseReturns]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseReturns);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
