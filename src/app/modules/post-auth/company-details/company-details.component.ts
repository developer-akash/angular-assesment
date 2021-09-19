import { Component, OnDestroy, OnInit, TemplateRef, ViewChildren } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DataTableDirective } from 'angular-datatables';
import { forkJoin, Subject, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { CompanyModel } from 'src/app/model/company.model';
import { ContactsModel } from 'src/app/model/contacts.model';
import { EventService } from 'src/app/service/event/event.service';
import { CompanyService } from 'src/app/service/api/company.service';
import { AddEditPersonComponent } from './add-edit-person/add-edit-person.component';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss']
})
export class CompanyDetailsComponent implements OnInit, OnDestroy {
  companyId: string;
  infoMessage: string;
  selectedPerson: string;
  dtTrigger = new Subject();
  selectedCompany: CompanyModel;
  selectedPersonItemsIndex: number;
  personDetailsModalRef: BsModalRef;
  contactsList: Array<ContactsModel>;
  contactTemplateModalRef: BsModalRef;
  dtOptions: DataTables.Settings = {};
  private subscriptions: Subscription[] = [];
  @ViewChildren(DataTableDirective) dtElements: any;

  constructor(
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private eventService: EventService,
    public modalService: BsModalService,
    private companyService: CompanyService
  ) {
    this.contactsList = [];
    this.selectedCompany = null;
    this.infoMessage = 'Loading...';
    this.companyId = this.route.snapshot.paramMap.get('id') || '';

    /**
     * This get event is responsible for adding contact details
     * @memberof CompanyDetailsComponent
    */
    this.subscriptions.push(this.eventService.GetEvent('ADD_CONTACT').subscribe((data) => {
      if (data) {
        this.contactsList.push(data);
        this.toastr.success('Contact added successfully', 'Success');
      }
    }));

    /**
     * This get event is responsible for editing contact details
     * @memberof CompanyDetailsComponent
    */
    this.subscriptions.push(this.eventService.GetEvent('EDIT_CONTACT').subscribe((data) => {
      if (data) {
        const personIndex = this.contactsList.findIndex((item) => item.id === data.id);
        if (personIndex !== -1) { this.contactsList[personIndex] = { ...data }; }
        this.toastr.success('Contact updated successfully', 'Success');
      }
    }));
  }

  ngOnInit() {
    /** first data table option */
    this.dtOptions = {
      paging: false,
      info: false,
      searching: false,
      order: [],
      columnDefs: [
        { targets: [0, 1, 2, 3], 'orderable': false }
      ],
      dom: '<<"table-responsive"t>>',
      autoWidth: false
    };
    this.fetCompanyAndContactDetails();
  }

  ngOnDestroy() {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  /**
   * This method is responsible for fetching contact & company details
   * also its responsible for showing selected company details
   * @memberof CompanyDetailsComponent
   */
  fetCompanyAndContactDetails() {
    this.eventService.BroadcastEvent('SHOW_LOADER', true);
    const companyDetails = this.companyService.getCompanyDetails();
    const contactsDetails = this.companyService.getContactsDetails();
    forkJoin([companyDetails, contactsDetails]).subscribe((results: any) => {
      this.eventService.BroadcastEvent('HIDE_LOADER', true);
      if (results[0].length > 0 && results[1].length > 0) {
        this.contactsList = results[1];
        const selectedCompanyIndex = results[0].findIndex((item) => item.id === this.companyId);
        if (selectedCompanyIndex !== -1) {
          this.selectedCompany = results[0][selectedCompanyIndex];
        }
      } else {
        this.infoMessage = 'Sorry! No data found';
      }
    }, () => {
      this.eventService.BroadcastEvent('HIDE_LOADER', true);
      this.infoMessage = 'Something went wrong';
      this.toastr.error('Something went wrong', 'Oops!');
    });
  }

  /**
   * This method is responsible for showing the Person details modal component
   * @memberof CompanyDetailsComponent
   */
  showPersonDetailsModal(modalType, item = '') {
    const initialState = { modalType: modalType, companyId: this.companyId, selectedItem: item };
    this.personDetailsModalRef = this.modalService.show(AddEditPersonComponent, {
      class: 'modal-dialog-centered modal-sm',
      initialState,
      backdrop: 'static',
      keyboard: false,
    });
  }

  /**
   * This method is responsible for showing the contact person delete confirmation modal
   * @memberof CompanyDetailsComponent
  */
  showDeleteTemplate(contactTemplate: TemplateRef<any>, name: string, index: number) {
    this.selectedPerson = name;
    this.selectedPersonItemsIndex = index;
    this.contactTemplateModalRef = this.modalService.show(contactTemplate, {
      class: 'modal-dialog-centered',
      backdrop: 'static',
      keyboard: false
    });
  }

  /**
   * This method is responsible for condirmation of contact person delete
   * @memberof CompanyDetailsComponent
  */
  confirm() {
    this.contactsList.splice(this.selectedPersonItemsIndex, 1);
    this.decline();
    this.toastr.success('Contact deleted successfully', 'Success');
  }

  /**
   * This method is responsible for cancellation of contact person delete
   * @memberof CompanyDetailsComponent
  */
  decline() {
    this.contactTemplateModalRef.hide();
  }
}
