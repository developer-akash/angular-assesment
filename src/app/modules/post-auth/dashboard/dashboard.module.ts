import { NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { PostAuthSharedModule } from 'src/app/shared/post-auth-shared.module';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    PostAuthSharedModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
