import { Route } from '@angular/router';
import { Signin } from './signin/signin';
import { Signup } from './signup/signup';
import { Password } from './password/password';
import { LockScreen } from './lock-screen/lock-screen';

export const AUTH_ROUTES: Route[] = [
  {
    path: 'signin',
    component: Signin,
    data: { title: 'Sign In' },
  },
  {
    path: 'signup',
    component: Signup,
    data: { title: 'Sign Up' },
  },
  {
    path: 'password',
    component: Password,
    data: { title: 'Reset Password' },
  },
  {
    path: 'lock-screen',
    component: LockScreen,
    data: { title: 'Lock Screen' },
  },
];
