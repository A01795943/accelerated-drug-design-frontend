import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tooltips } from './tooltips';

describe('Tooltips', () => {
  let component: Tooltips;
  let fixture: ComponentFixture<Tooltips>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tooltips]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Tooltips);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
