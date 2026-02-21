import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolarArea } from './polar-area';

describe('PolarArea', () => {
  let component: PolarArea;
  let fixture: ComponentFixture<PolarArea>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PolarArea]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PolarArea);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
