import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputMask } from './input-mask';

describe('InputMask', () => {
  let component: InputMask;
  let fixture: ComponentFixture<InputMask>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputMask]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputMask);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
