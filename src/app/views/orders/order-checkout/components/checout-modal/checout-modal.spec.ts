import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecoutModal } from './checout-modal';

describe('ChecoutModal', () => {
  let component: ChecoutModal;
  let fixture: ComponentFixture<ChecoutModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChecoutModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChecoutModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
