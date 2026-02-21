import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPricing } from './product-pricing';

describe('ProductPricing', () => {
  let component: ProductPricing;
  let fixture: ComponentFixture<ProductPricing>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductPricing]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductPricing);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
