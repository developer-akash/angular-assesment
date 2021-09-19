import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { AppConst } from 'src/app/app.constant';
import { CompanyModel } from 'src/app/model/company.model';
import { ContactsModel } from 'src/app/model/contacts.model';

@Injectable({
    providedIn: 'root'
})
export class CompanyService {

    constructor(
        private httpClient: HttpClient
    ) { }

    /**
    * Method is responsible for fetching Company details from the API endpoint
    *
    * @returns {Observable<Array<CompanyModel>>}
    * @memberof CompanyService
    */
    getCompanyDetails(): Observable<Array<CompanyModel>> {
        const request = { 'url': AppConst.API_BASE_URL + 'companies' };
        return this.httpClient.get<Array<CompanyModel>>(request.url);
    }

    /**
    * Method is responsible for fetching Contacts details from the API endpoint
    *
    * @returns {Observable<Array<ContactsModel>>}
    * @memberof CompanyService
    */
    getContactsDetails(): Observable<Array<ContactsModel>> {
        const request = { 'url': AppConst.API_BASE_URL + 'contacts' };
        return this.httpClient.get<Array<ContactsModel>>(request.url);
    }

}
