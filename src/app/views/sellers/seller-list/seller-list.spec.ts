import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerList } from './seller-list';

describe('SellerList', () => {
  let component: SellerList;
  let fixture: ComponentFixture<SellerList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellerList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
