import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyReview } from './company-review';

describe('CompanyReview', () => {
  let component: CompanyReview;
  let fixture: ComponentFixture<CompanyReview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyReview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyReview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
