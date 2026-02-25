import { inject } from '@angular/core';
import { Router, type UrlTree } from '@angular/router';
import { AuthenticationService } from '@/app/core/services/auth.service';

export function adminGuard(): boolean | UrlTree {
  const router = inject(Router);
  const auth = inject(AuthenticationService);
  const isAdmin = auth.user?.role === 'admin';
  if (!isAdmin) {
    return router.createUrlTree(['/projects/list']);
  }
  return true;
}
