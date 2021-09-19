import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routeConfig: Routes = [
  { path: '', redirectTo: 'pre-auth', pathMatch: 'full' },
  { path: 'pre-auth', loadChildren: () => import('./modules/pre-auth/pre-auth.module').then(m => m.PreAuthModule) },
  { path: 'post-auth', loadChildren: () => import('./modules/post-auth/post-auth.module').then(m => m.PostAuthModule) }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routeConfig
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
