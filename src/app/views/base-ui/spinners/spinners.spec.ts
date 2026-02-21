import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Spinners } from './spinners';

describe('Spinners', () => {
  let component: Spinners;
  let fixture: ComponentFixture<Spinners>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Spinners]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Spinners);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
