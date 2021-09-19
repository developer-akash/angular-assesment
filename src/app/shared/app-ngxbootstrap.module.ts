import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PopoverModule } from 'ngx-bootstrap/popover';

@NgModule({
    imports: [
        ModalModule.forRoot(),
        PopoverModule.forRoot(),
        BsDropdownModule.forRoot()
    ],
    exports: [
        ModalModule,
        PopoverModule,
        BsDropdownModule
    ]
})
export class NgxBootstrapModule { }
