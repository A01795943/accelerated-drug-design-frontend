import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitiStrem } from './activiti-strem';

describe('ActivitiStrem', () => {
  let component: ActivitiStrem;
  let fixture: ComponentFixture<ActivitiStrem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivitiStrem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivitiStrem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
