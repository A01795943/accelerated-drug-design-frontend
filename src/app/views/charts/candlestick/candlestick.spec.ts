import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Candlestick } from './candlestick';

describe('Candlestick', () => {
  let component: Candlestick;
  let fixture: ComponentFixture<Candlestick>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Candlestick]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Candlestick);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
