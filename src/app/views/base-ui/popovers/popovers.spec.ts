import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Popovers } from './popovers';

describe('Popovers', () => {
  let component: Popovers;
  let fixture: ComponentFixture<Popovers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Popovers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Popovers);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
