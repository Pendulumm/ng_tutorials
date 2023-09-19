import { inject } from '@angular/core';
import {
  Router,
  NavigationExtras,
  UrlCreationOptions,
} from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard = () => {
  // if returns fault
  // If any guard returns `false`, the `Route` is skipped for matching and other `Route` configurations are processed instead.
  // return false;

  const router = inject(Router);
  const authService = inject(AuthService);

  // console.log('authGuard#canActivate called');
  // authService.login().subscribe(auth => {
  //   console.log('auth is', auth);
  // })
  // console.log('isLoggedIn >>>', authService.isLoggedIn);

  if (authService.isLoggedIn) {
    return true;
  }

  // Create a dummy session id
  const sessionId = 123456789;

  // Set our navigation extras object
  // that contains our global query params and fragment
  const navigationExtras: UrlCreationOptions = {
    queryParams: { session_id: sessionId },
    fragment: 'anchor'
  };

  // Navigate to the login page with extras
  return router.createUrlTree(['/login'], navigationExtras);
};
