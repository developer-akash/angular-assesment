import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AppConst } from 'src/app/app.constant';
import { UserModel } from 'src/app/model/user.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(
        private httpClient: HttpClient
    ) { }

    /**
    * Method is responsible for fetching users list from the API endpoint
    *
    * @returns {Observable<Array<UserModel>>}
    * @memberof LoginService
    */
    fetchUsersList(): Observable<Array<UserModel>> {
        const request = { 'url': AppConst.API_BASE_URL + 'users' };
        return this.httpClient.get<Array<UserModel>>(request.url);
    }
}
