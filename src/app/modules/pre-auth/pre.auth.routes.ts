import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PreAuthComponent } from './pre-auth.component';
import { AuthenticatedGuard } from 'src/app/service/guard/authenticated.guard';

const routerConfig: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '',
    component: PreAuthComponent,
    children: [
      {
        path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule), pathMatch: 'full', canActivate: [AuthenticatedGuard]
      }
    ],
  },
  { path: '**', redirectTo: '404', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forChild(routerConfig)
  ],
  exports: [RouterModule],
  declarations: [],
  providers: []
})
export class PreAuthRouteModule { }
