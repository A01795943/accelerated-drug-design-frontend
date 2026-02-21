import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailState } from './detail-state';

describe('DetailState', () => {
  let component: DetailState;
  let fixture: ComponentFixture<DetailState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailState]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailState);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
