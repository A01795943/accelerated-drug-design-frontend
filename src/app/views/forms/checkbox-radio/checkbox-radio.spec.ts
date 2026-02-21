import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxRadio } from './checkbox-radio';

describe('CheckboxRadio', () => {
  let component: CheckboxRadio;
  let fixture: ComponentFixture<CheckboxRadio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckboxRadio]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckboxRadio);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
