import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreSetting } from './store-setting';

describe('StoreSetting', () => {
  let component: StoreSetting;
  let fixture: ComponentFixture<StoreSetting>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreSetting]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreSetting);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
