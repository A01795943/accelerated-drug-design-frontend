import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Error404Alt } from './error-404-alt';

describe('Error404Alt', () => {
  let component: Error404Alt;
  let fixture: ComponentFixture<Error404Alt>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Error404Alt]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Error404Alt);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
