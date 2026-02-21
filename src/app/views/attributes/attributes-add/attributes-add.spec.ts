import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributesAdd } from './attributes-add';

describe('AttributesAdd', () => {
  let component: AttributesAdd;
  let fixture: ComponentFixture<AttributesAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttributesAdd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttributesAdd);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
