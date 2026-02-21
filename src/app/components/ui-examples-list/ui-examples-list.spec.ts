import { ComponentFixture, TestBed } from '@angular/core/testing'
import { UIExamplesList } from './ui-examples-list'

describe('UIExamplesList', () => {
  let component: UIExamplesList
  let fixture: ComponentFixture<UIExamplesList>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UIExamplesList],
    }).compileComponents()

    fixture = TestBed.createComponent(UIExamplesList)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
