import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributesList } from './attributes-list';

describe('AttributesList', () => {
  let component: AttributesList;
  let fixture: ComponentFixture<AttributesList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttributesList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttributesList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
