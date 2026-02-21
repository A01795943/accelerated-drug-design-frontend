import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerInformation } from './seller-information';

describe('SellerInformation', () => {
  let component: SellerInformation;
  let fixture: ComponentFixture<SellerInformation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellerInformation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerInformation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
