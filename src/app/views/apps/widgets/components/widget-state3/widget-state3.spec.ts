import { ComponentFixture, TestBed } from '@angular/core/testing'

import { WidgetState3 } from './widget-state3'

describe('WidgetState3', () => {
  let component: WidgetState3
  let fixture: ComponentFixture<WidgetState3>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WidgetState3],
    }).compileComponents()

    fixture = TestBed.createComponent(WidgetState3)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
