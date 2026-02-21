import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceAdd } from './invoice-add';

describe('InvoiceAdd', () => {
  let component: InvoiceAdd;
  let fixture: ComponentFixture<InvoiceAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceAdd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceAdd);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
