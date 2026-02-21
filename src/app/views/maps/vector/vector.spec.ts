import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Vector } from './vector';

describe('Vector', () => {
  let component: Vector;
  let fixture: ComponentFixture<Vector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Vector]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Vector);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
