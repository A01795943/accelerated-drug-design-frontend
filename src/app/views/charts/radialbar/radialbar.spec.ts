import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Radialbar } from './radialbar';

describe('Radialbar', () => {
  let component: Radialbar;
  let fixture: ComponentFixture<Radialbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Radialbar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Radialbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
