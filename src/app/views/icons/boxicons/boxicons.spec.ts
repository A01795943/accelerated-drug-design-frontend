import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Boxicons } from './boxicons';

describe('Boxicons', () => {
  let component: Boxicons;
  let fixture: ComponentFixture<Boxicons>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Boxicons]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Boxicons);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
