import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestProduct } from './latest-product';

describe('LatestProduct', () => {
  let component: LatestProduct;
  let fixture: ComponentFixture<LatestProduct>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LatestProduct]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LatestProduct);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
