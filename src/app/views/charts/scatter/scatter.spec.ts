import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Scatter } from './scatter';

describe('Scatter', () => {
  let component: Scatter;
  let fixture: ComponentFixture<Scatter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Scatter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Scatter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
