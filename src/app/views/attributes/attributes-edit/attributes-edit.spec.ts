import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributesEdit } from './attributes-edit';

describe('AttributesEdit', () => {
  let component: AttributesEdit;
  let fixture: ComponentFixture<AttributesEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttributesEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttributesEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
