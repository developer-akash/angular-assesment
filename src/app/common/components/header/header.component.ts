import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { UserModel } from 'src/app/model/user.model';
import { LocalStorageKeys } from 'src/app/app.localstoragekeys';
import { LocalStorageProvider } from 'src/app/service/localstorage/localstorage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  userDetails: UserModel;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private localStorageService: LocalStorageProvider
  ) {
    this.userDetails = this.localStorageService.getItem(LocalStorageKeys.USER_DETAILS) || '';
  }

  /**
   * Method is responsible for logging out the user from the app
   * @memberof HeaderComponent
   */
  logout() {
    this.router.navigateByUrl('/pre-auth/login');
    this.localStorageService.clearAll();
    this.toastr.success('User has been logged out successfully', 'Success');
  }

}
