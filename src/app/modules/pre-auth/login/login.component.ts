import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { UserModel } from 'src/app/model/user.model';
import { UserService } from 'src/app/service/api/user.service';
import { LocalStorageKeys } from 'src/app/app.localstoragekeys';
import { EventService } from 'src/app/service/event/event.service';
import { LocalStorageProvider } from 'src/app/service/localstorage/localstorage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private eventService: EventService,
    private localstorage: LocalStorageProvider
  ) { }

  ngOnInit() {
    /* Setup invoke building login form*/
    this.buildingLoginForm();
  }

  /**
   * Method is responsible for initialize Login Form
   * @memberof LoginComponent
   */
  buildingLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]]
    });
  }

  /**
   * Method is responsible for convenience getter for easy access to form fields
   * @memberof LoginComponent
   */
  get loginF() {
    return this.loginForm.controls;
  }

  /**
   * This method will get invoked after submit of the Login Form.
   * also responsible for Authentication process & store the user information into localstorage.
   * @memberof LoginComponent
   */
  onSubmit(val) {
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    } else {
      this.eventService.BroadcastEvent('SHOW_LOADER', true);
      /**
       * Check whether user is already authenticated or not
       * if authenticated then redirect the user to the dashboard
       * else authenticate the user
       */
      if (this.localstorage.getItem(LocalStorageKeys.USER_EMAIL) === (this.loginForm.value.email).toLowerCase()) {
        this.router.navigate(['/post-auth/dashboard']);
        this.eventService.BroadcastEvent('HIDE_LOADER', true);
      } else {
        this.userService.fetchUsersList().subscribe((res: Array<UserModel>) => {
          this.eventService.BroadcastEvent('HIDE_LOADER', true);
          if (res && res.length > 0) {
            const iseUserExist = res.findIndex((user) => user.email === (this.loginForm.value.email).toLowerCase());
            if (iseUserExist !== -1) {
              this.toastr.success('User authenticated successfully', 'Success');
              this.localstorage.setItem(LocalStorageKeys.USER_EMAIL, val.email);
              this.localstorage.setItem(LocalStorageKeys.USER_DETAILS, res[iseUserExist]);
              this.router.navigate(['/post-auth/dashboard']);
            } else {
              this.toastr.error('User doesn\'t exist', 'Oops!');
            }
          }
        }, () => {
          this.toastr.error('Something went wrong', 'Oops!');
        });
      }
    }
  }
}
