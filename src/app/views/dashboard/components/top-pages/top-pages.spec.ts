import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopPages } from './top-pages';

describe('TopPages', () => {
  let component: TopPages;
  let fixture: ComponentFixture<TopPages>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopPages]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopPages);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
