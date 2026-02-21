import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pie } from './pie';

describe('Pie', () => {
  let component: Pie;
  let fixture: ComponentFixture<Pie>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pie]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Pie);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
