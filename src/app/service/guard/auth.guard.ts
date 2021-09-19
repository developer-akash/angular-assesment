import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { LocalStorageKeys } from 'src/app/app.localstoragekeys';
import { LocalStorageProvider } from '../localstorage/localstorage.service';

/**
 * @fileOverview This file is responsible checking the user is authenticated or not
 * Check the authentication status before accessing the post authentication screens
 * @author Akash Das
*/
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private user_email: string;

  constructor(
    private router: Router,
    private localStorageService: LocalStorageProvider
  ) {
    this.user_email = this.localStorageService.getItem(LocalStorageKeys.USER_EMAIL);
  }

  canActivate(): boolean {
    this.user_email = this.localStorageService.getItem(LocalStorageKeys.USER_EMAIL);
    if (this.user_email) {
      return true;
    } else {
      this.router.navigate(['/pre-auth/login']);
      return false;
    }
  }
}
