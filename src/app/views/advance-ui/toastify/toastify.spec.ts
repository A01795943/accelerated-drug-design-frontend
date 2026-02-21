import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Toastify } from './toastify';

describe('Toastify', () => {
  let component: Toastify;
  let fixture: ComponentFixture<Toastify>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Toastify]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Toastify);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
