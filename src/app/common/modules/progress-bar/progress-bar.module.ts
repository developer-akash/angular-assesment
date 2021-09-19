import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressBarComponent } from './progress-bar.component';
import { NgProgressModule } from '@ngx-progressbar/core';
import { ProgressBarService } from './progress-bar.service';

@NgModule({
  imports: [
    CommonModule,
    NgProgressModule
  ],
  declarations: [ProgressBarComponent],
  exports: [ProgressBarComponent],
  providers: [ProgressBarService]
})
export class ProgressBarModule { }
