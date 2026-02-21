import { ComponentFixture, TestBed } from '@angular/core/testing'

import { LeftTimeline } from './left-timeline'

describe('LeftTimeline', () => {
  let component: LeftTimeline
  let fixture: ComponentFixture<LeftTimeline>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeftTimeline],
    }).compileComponents()

    fixture = TestBed.createComponent(LeftTimeline)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
