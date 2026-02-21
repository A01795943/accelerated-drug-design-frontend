import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Rightsidebar } from './rightsidebar';

describe('Rightsidebar', () => {
  let component: Rightsidebar;
  let fixture: ComponentFixture<Rightsidebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Rightsidebar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Rightsidebar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
