import { ComponentFixture, TestBed } from '@angular/core/testing'

import { WidgetState2 } from './widget-state2'

describe('WidgetState2', () => {
  let component: WidgetState2
  let fixture: ComponentFixture<WidgetState2>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WidgetState2],
    }).compileComponents()

    fixture = TestBed.createComponent(WidgetState2)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
