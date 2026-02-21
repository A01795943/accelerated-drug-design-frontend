import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Boxplot } from './boxplot';

describe('Boxplot', () => {
  let component: Boxplot;
  let fixture: ComponentFixture<Boxplot>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Boxplot]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Boxplot);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
