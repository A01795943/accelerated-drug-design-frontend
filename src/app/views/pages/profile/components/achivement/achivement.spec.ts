import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Achivement } from './achivement';

describe('Achivement', () => {
  let component: Achivement;
  let fixture: ComponentFixture<Achivement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Achivement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Achivement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
