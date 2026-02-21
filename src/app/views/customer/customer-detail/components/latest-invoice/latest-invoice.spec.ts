import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestInvoice } from './latest-invoice';

describe('LatestInvoice', () => {
  let component: LatestInvoice;
  let fixture: ComponentFixture<LatestInvoice>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LatestInvoice]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LatestInvoice);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
