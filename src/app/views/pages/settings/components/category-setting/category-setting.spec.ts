import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorySetting } from './category-setting';

describe('CategorySetting', () => {
  let component: CategorySetting;
  let fixture: ComponentFixture<CategorySetting>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategorySetting]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategorySetting);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
