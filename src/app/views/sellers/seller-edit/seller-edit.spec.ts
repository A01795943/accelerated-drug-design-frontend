import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerEdit } from './seller-edit';

describe('SellerEdit', () => {
  let component: SellerEdit;
  let fixture: ComponentFixture<SellerEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellerEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
