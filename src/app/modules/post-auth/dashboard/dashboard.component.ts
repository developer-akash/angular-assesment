import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { CompanyModel } from 'src/app/model/company.model';
import { EventService } from 'src/app/service/event/event.service';
import { CompanyService } from 'src/app/service/api/company.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  companyList: Array<CompanyModel>;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private eventService: EventService,
    private companyService: CompanyService
  ) {
    this.companyList = [];
  }

  ngOnInit() {
    this.fetCompanyList();
  }

  /**
   * This method is responsible for redirecting the user to the company-details screen
   * @memberof DashboardComponent
   */
   goToCompanyDetails(company) {
    this.router.navigateByUrl('/post-auth/company-details/' + company.id);
   }

  /**
   * This method is responsible for fetching company details
   * @memberof DashboardComponent
   */
  fetCompanyList() {
    this.eventService.BroadcastEvent('SHOW_LOADER', true);
    this.companyService.getCompanyDetails().subscribe((res: Array<CompanyModel>) => {
      this.eventService.BroadcastEvent('HIDE_LOADER', true);
      if (res && res.length > 0) {
        this.companyList = res;
      }
    }, () => {
      this.eventService.BroadcastEvent('HIDE_LOADER', true);
      this.toastr.error('Something went wrong', 'Oops!');
    });
  }

}
