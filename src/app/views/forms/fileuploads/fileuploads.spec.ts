import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fileuploads } from './fileuploads';

describe('Fileuploads', () => {
  let component: Fileuploads;
  let fixture: ComponentFixture<Fileuploads>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Fileuploads]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Fileuploads);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
