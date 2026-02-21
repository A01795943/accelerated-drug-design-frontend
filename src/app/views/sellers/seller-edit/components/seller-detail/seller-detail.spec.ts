import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerDetail } from './seller-detail';

describe('SellerDetail', () => {
  let component: SellerDetail;
  let fixture: ComponentFixture<SellerDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellerDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
