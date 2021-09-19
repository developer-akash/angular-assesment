import { NgModule } from '@angular/core';

import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { PreAuthSharedModule } from 'src/app/shared/pre-auth-shared.nodule';

@NgModule({
    imports: [
        PreAuthSharedModule,
        LoginRoutingModule
    ],
    declarations: [
        LoginComponent
    ]
})
export class LoginModule { }
