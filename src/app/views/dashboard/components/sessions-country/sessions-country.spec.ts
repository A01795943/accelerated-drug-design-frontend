import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionsCountry } from './sessions-country';

describe('SessionsCountry', () => {
  let component: SessionsCountry;
  let fixture: ComponentFixture<SessionsCountry>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionsCountry]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionsCountry);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
