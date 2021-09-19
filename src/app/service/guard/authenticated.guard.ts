import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { LocalStorageKeys } from 'src/app/app.localstoragekeys';
import { LocalStorageProvider } from '../localstorage/localstorage.service';

/**
 * @fileOverview This file is responsible checking the user is authenticated or not
 * if already authenticated & trying to access the pre authentication screens then redirect the user
 * to the post authentication screens
 * @author Akash Das
*/
@Injectable({
  providedIn: 'root'
})
export class AuthenticatedGuard implements CanActivate {
  user_email: string;

  constructor(
    private localStorageService: LocalStorageProvider,
    private router: Router
  ) {
    this.user_email = this.localStorageService.getItem(LocalStorageKeys.USER_EMAIL);
  }

  /**
   * This function used for checking whether the user is authenticated or not
   * @param next
   * @param state
   */
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    this.user_email = this.localStorageService.getItem(LocalStorageKeys.USER_EMAIL);

    if (this.user_email) {
      this.router.navigate(['/post-auth/dashboard']);
      return false;
    } else {
      return true;
    }
  }
}
