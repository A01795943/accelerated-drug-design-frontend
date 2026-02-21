import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Starter } from './starter';

describe('Starter', () => {
  let component: Starter;
  let fixture: ComponentFixture<Starter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Starter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Starter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
