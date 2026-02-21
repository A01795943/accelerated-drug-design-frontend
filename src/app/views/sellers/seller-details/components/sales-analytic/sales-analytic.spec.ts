import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesAnalytic } from './sales-analytic';

describe('SalesAnalytic', () => {
  let component: SalesAnalytic;
  let fixture: ComponentFixture<SalesAnalytic>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesAnalytic]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesAnalytic);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
