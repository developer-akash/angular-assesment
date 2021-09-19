import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PreAuthRouteModule } from './pre.auth.routes';
import { PreAuthComponent } from './pre-auth.component';
import { ProgressBarModule } from 'src/app/common/modules/progress-bar/progress-bar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PreAuthRouteModule,
    ProgressBarModule
  ],
  declarations: [
    PreAuthComponent
  ],
  providers: []
})
export class PreAuthModule { }
