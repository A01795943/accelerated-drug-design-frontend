import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Flatepicker } from './flatepicker';

describe('Flatepicker', () => {
  let component: Flatepicker;
  let fixture: ComponentFixture<Flatepicker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Flatepicker]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Flatepicker);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
