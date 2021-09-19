import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostAuthComponent } from './post-auth.component';
import { AuthGuard } from 'src/app/service/guard/auth.guard';

const routerConfig: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: '',
    component: PostAuthComponent,
    children: [
      { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule), pathMatch: 'full', canActivate: [AuthGuard] },
      { path: 'company-details/:id', loadChildren: () => import('./company-details/company-details.module').then(m => m.CompanyDetailsModule), pathMatch: 'full', canActivate: [AuthGuard] }
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
export class PostAuthRouteModule { }
