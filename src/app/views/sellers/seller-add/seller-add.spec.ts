import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerAdd } from './seller-add';

describe('SellerAdd', () => {
  let component: SellerAdd;
  let fixture: ComponentFixture<SellerAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellerAdd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerAdd);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
