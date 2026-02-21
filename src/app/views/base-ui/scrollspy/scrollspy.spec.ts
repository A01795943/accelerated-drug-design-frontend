import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Scrollspy } from './scrollspy';

describe('Scrollspy', () => {
  let component: Scrollspy;
  let fixture: ComponentFixture<Scrollspy>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Scrollspy]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Scrollspy);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
