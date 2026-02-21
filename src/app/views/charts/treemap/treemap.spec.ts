import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Treemap } from './treemap';

describe('Treemap', () => {
  let component: Treemap;
  let fixture: ComponentFixture<Treemap>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Treemap]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Treemap);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
