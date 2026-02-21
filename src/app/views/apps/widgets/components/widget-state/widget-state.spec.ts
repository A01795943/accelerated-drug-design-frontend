import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetState } from './widget-state';

describe('WidgetState', () => {
  let component: WidgetState;
  let fixture: ComponentFixture<WidgetState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WidgetState]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WidgetState);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
