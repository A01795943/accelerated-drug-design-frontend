import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopReview } from './top-review';

describe('TopReview', () => {
  let component: TopReview;
  let fixture: ComponentFixture<TopReview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopReview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopReview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
