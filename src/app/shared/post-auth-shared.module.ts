import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { DataTablesModule } from 'angular-datatables';
import { FontAwesomeModule } from 'ngx-icons';

import { NgxBootstrapModule } from './app-ngxbootstrap.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DataTablesModule,
    FontAwesomeModule,
    NgxBootstrapModule,
    AngularSvgIconModule.forRoot()
  ],
  declarations: [],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DataTablesModule,
    FontAwesomeModule,
    NgxBootstrapModule,
    AngularSvgIconModule
  ],
  providers: []
})
export class PostAuthSharedModule { }
