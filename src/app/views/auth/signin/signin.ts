import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, Validators, type UntypedFormGroup } from '@angular/forms';
import { RouterLink } from '@angular/router'
import { LogoBox } from '@component/logo-box'
import { Store } from '@ngrx/store';
import { clearLoginError, login } from '@store/authentication/authentication.actions';
import { getError } from '@store/authentication/authentication.selector';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [AsyncPipe, LogoBox, RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './signin.html',
  styles: ``
})
export class Signin implements OnInit {
  signInForm!: UntypedFormGroup
  submitted: boolean = false
  loginError$: Observable<string | null>

  public fb = inject(UntypedFormBuilder)
  public store = inject(Store)

  constructor() {
    this.loginError$ = this.store.select(getError)
  }

  ngOnInit(): void {
    this.signInForm = this.fb.group({
      username: ['admin', [Validators.required]],
      password: ['admin', [Validators.required]],
    })
  }

  get formValues() {
    return this.signInForm.controls
  }

  login() {
    this.submitted = true
    if (this.signInForm.valid) {
      const username = this.formValues['username'].value
      const password = this.formValues['password'].value
      this.store.dispatch(login({ username, password }))
    }
  }

  clearError() {
    this.store.dispatch(clearLoginError())
  }
}
