import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sweetalert } from './sweetalert';

describe('Sweetalert', () => {
  let component: Sweetalert;
  let fixture: ComponentFixture<Sweetalert>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sweetalert]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Sweetalert);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
