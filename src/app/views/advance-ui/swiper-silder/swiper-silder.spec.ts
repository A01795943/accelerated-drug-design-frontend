import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwiperSilder } from './swiper-silder';

describe('SwiperSilder', () => {
  let component: SwiperSilder;
  let fixture: ComponentFixture<SwiperSilder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwiperSilder]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwiperSilder);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
