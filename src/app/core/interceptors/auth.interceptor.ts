import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthenticationService } from '@/app/core/services/auth.service';
import { environment } from '@environment/environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthenticationService);
  const token = auth.session;
  // No enviar Authorization en el login
  const isLoginRequest = req.url.startsWith(`${environment.apiUrl}/api/auth/login`);

  if (token && req.url.startsWith(environment.apiUrl) && !isLoginRequest) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
  }
  return next(req);
};
