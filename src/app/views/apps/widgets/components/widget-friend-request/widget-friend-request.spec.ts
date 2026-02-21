import { ComponentFixture, TestBed } from '@angular/core/testing'

import { WidgetFriendRequest } from './widget-friend-request'

describe('WidgetFriendRequest', () => {
  let component: WidgetFriendRequest
  let fixture: ComponentFixture<WidgetFriendRequest>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WidgetFriendRequest],
    }).compileComponents()

    fixture = TestBed.createComponent(WidgetFriendRequest)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
