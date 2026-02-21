import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionState } from './permission-state';

describe('PermissionState', () => {
  let component: PermissionState;
  let fixture: ComponentFixture<PermissionState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PermissionState]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PermissionState);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
