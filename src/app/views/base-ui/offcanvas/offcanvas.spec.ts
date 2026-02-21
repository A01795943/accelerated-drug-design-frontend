import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Offcanvas } from './offcanvas';

describe('Offcanvas', () => {
  let component: Offcanvas;
  let fixture: ComponentFixture<Offcanvas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Offcanvas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Offcanvas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
