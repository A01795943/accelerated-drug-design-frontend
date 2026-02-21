import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetaOption } from './meta-option';

describe('MetaOption', () => {
  let component: MetaOption;
  let fixture: ComponentFixture<MetaOption>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MetaOption]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MetaOption);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
