import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { FontAwesomeModule } from 'ngx-icons';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        FontAwesomeModule,
        ReactiveFormsModule,
        AngularSvgIconModule.forRoot(),
    ],
    declarations: [],
    exports: [
        CommonModule,
        FormsModule,
        FontAwesomeModule,
        ReactiveFormsModule,
        AngularSvgIconModule
    ],
    providers: []
})
export class PreAuthSharedModule { }
