import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceState } from './invoice-state';

describe('InvoiceState', () => {
  let component: InvoiceState;
  let fixture: ComponentFixture<InvoiceState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceState]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceState);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
