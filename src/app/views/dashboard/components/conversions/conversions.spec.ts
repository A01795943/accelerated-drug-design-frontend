import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Conversions } from './conversions';

describe('Conversions', () => {
  let component: Conversions;
  let fixture: ComponentFixture<Conversions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Conversions]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Conversions);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
