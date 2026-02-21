import { ComponentFixture, TestBed } from '@angular/core/testing'

import { RecentProject } from './recent-project'

describe('RecentProject', () => {
  let component: RecentProject
  let fixture: ComponentFixture<RecentProject>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentProject],
    }).compileComponents()

    fixture = TestBed.createComponent(RecentProject)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
