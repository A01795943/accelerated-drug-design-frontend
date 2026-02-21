import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Choices } from './choices';

describe('Choices', () => {
  let component: Choices;
  let fixture: ComponentFixture<Choices>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Choices]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Choices);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
