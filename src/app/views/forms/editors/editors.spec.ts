import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Editors } from './editors';

describe('Editors', () => {
  let component: Editors;
  let fixture: ComponentFixture<Editors>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Editors]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Editors);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
