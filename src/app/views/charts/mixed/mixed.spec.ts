import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Mixed } from './mixed';

describe('Mixed', () => {
  let component: Mixed;
  let fixture: ComponentFixture<Mixed>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Mixed]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Mixed);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
