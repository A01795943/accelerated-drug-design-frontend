import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalDetail } from './personal-detail';

describe('PersonalDetail', () => {
  let component: PersonalDetail;
  let fixture: ComponentFixture<PersonalDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonalDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
