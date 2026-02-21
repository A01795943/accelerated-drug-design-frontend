import { ComponentFixture, TestBed } from '@angular/core/testing'

import { WidgetTask } from './widget-task'

describe('WidgetTask', () => {
  let component: WidgetTask
  let fixture: ComponentFixture<WidgetTask>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WidgetTask],
    }).compileComponents()

    fixture = TestBed.createComponent(WidgetTask)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
