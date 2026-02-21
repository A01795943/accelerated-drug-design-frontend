import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnState } from './return-state';

describe('ReturnState', () => {
  let component: ReturnState;
  let fixture: ComponentFixture<ReturnState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReturnState]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReturnState);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
