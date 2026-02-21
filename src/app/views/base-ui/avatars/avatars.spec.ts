import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Avatars } from './avatars';

describe('Avatars', () => {
  let component: Avatars;
  let fixture: ComponentFixture<Avatars>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Avatars]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Avatars);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
