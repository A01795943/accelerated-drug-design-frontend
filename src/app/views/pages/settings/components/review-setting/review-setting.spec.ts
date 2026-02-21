import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewSetting } from './review-setting';

describe('ReviewSetting', () => {
  let component: ReviewSetting;
  let fixture: ComponentFixture<ReviewSetting>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewSetting]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewSetting);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
