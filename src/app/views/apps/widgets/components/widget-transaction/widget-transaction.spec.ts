import { ComponentFixture, TestBed } from '@angular/core/testing'

import { WidgetTransaction } from './widget-transaction'

describe('WidgetTransaction', () => {
  let component: WidgetTransaction
  let fixture: ComponentFixture<WidgetTransaction>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WidgetTransaction],
    }).compileComponents()

    fixture = TestBed.createComponent(WidgetTransaction)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
