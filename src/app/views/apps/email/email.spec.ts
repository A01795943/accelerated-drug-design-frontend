import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Email } from './email';

describe('Email', () => {
  let component: Email;
  let fixture: ComponentFixture<Email>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Email]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Email);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
