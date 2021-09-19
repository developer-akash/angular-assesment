import { NgModule } from '@angular/core';

import { CompanyDetailsComponent } from './company-details.component';
import { PostAuthSharedModule } from 'src/app/shared/post-auth-shared.module';
import { CompanyDetailsRoutingModule } from './company-details-routing.module';
import { AddEditPersonComponent } from './add-edit-person/add-edit-person.component';

@NgModule({
  declarations: [
    CompanyDetailsComponent,
    AddEditPersonComponent
  ],
  imports: [
    PostAuthSharedModule,
    CompanyDetailsRoutingModule
  ],
  entryComponents: [AddEditPersonComponent]
})
export class CompanyDetailsModule { }
