import { ComponentFixture, TestBed } from '@angular/core/testing'

import { StateCard } from './state-card'

describe('StateCard', () => {
  let component: StateCard
  let fixture: ComponentFixture<StateCard>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StateCard],
    }).compileComponents()

    fixture = TestBed.createComponent(StateCard)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
