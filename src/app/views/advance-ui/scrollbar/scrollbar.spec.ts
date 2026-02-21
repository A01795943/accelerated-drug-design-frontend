import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Scrollbar } from './scrollbar';

describe('Scrollbar', () => {
  let component: Scrollbar;
  let fixture: ComponentFixture<Scrollbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Scrollbar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Scrollbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
