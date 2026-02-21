import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EarnPoint } from './earn-point';

describe('EarnPoint', () => {
  let component: EarnPoint;
  let fixture: ComponentFixture<EarnPoint>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EarnPoint]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EarnPoint);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
