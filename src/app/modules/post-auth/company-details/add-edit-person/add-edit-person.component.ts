import { Component, OnInit, OnDestroy } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';

import { AppConst } from 'src/app/app.constant';
import { ContactsModel } from 'src/app/model/contacts.model';
import { EventService } from 'src/app/service/event/event.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-edit-person',
  templateUrl: './add-edit-person.component.html',
  styleUrls: ['./add-edit-person.component.scss']
})
export class AddEditPersonComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  public countryList = AppConst.COUNTRY_LIST;
  public personDetailsForm: FormGroup;
  selectedItem: ContactsModel;
  modalType: string;
  companyId: string;

  constructor(
    private bsModalRef: BsModalRef,
    private formBuilder: FormBuilder,
    public eventService: EventService
  ) { }

  ngOnInit(): void {
    /* Setup invoke building login form*/
    this.buildingPersonDetailsForm();
  }

  ngOnDestroy(): void {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  /**
   * Method is responsible for convenience getter for easy access to form fields
   * @memberof AddEditPersonComponent
   */
    get personDetailsF() {
    return this.personDetailsForm.controls;
  }

  /**
   * Method is responsible for initialize Person Details Form
   * @memberof AddEditPersonComponent
   */
  buildingPersonDetailsForm() {
    const numberRegx = /^[0-9]*$/;
    this.personDetailsForm = this.formBuilder.group({
      name: [(this.selectedItem && this.selectedItem.name) ? this.selectedItem.name : '', Validators.required],
      country: [(this.selectedItem && this.selectedItem.country) ? this.selectedItem.country : '', Validators.required],
      phone: [(this.selectedItem && this.selectedItem.phone) ? this.selectedItem.phone : '', [Validators.required, Validators.minLength(10), Validators.pattern(numberRegx)]],
      id: [(this.selectedItem && this.selectedItem.id) ? this.selectedItem.id : '']
    });
  }

  /**
   * Method is responsible for closing the modal
   * @memberof AddEditPersonComponent
   */
  modalClose(): void {
    this.bsModalRef.hide();
  }

  /**
   * This method will get invoked after submit of the Person Details Form.
   * @memberof AddEditPersonComponent
   */
  onSubmit(val) {
    this.modalClose();
    if (this.modalType === 'add') {
      const addObj = {...val, id: Math.random()};
      this.eventService.BroadcastEvent('ADD_CONTACT', addObj);
    } else {
      this.eventService.BroadcastEvent('EDIT_CONTACT', val);
    }
  }
}
