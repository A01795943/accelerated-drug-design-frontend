import { ComponentFixture, TestBed } from '@angular/core/testing'

import { EmailTopbar } from './email-topbar'

describe('EmailTopbar', () => {
  let component: EmailTopbar
  let fixture: ComponentFixture<EmailTopbar>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailTopbar],
    }).compileComponents()

    fixture = TestBed.createComponent(EmailTopbar)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
