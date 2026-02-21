import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseState } from './purchase-state';

describe('PurchaseState', () => {
  let component: PurchaseState;
  let fixture: ComponentFixture<PurchaseState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchaseState]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseState);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
