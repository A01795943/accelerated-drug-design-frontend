import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountChart } from './account-chart';

describe('AccountChart', () => {
  let component: AccountChart;
  let fixture: ComponentFixture<AccountChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountChart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountChart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
