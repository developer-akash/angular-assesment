import { NgModule } from '@angular/core';
import { SidebarModule } from 'ng-sidebar';
import { FontAwesomeModule } from 'ngx-icons';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* Common Components Dependency */
import { HeaderComponent } from 'src/app/common/components/header/header.component';
import { FooterComponent } from 'src/app/common/components/footer/footer.component';

import { PostAuthRouteModule } from './post.auth.routes';
import { PostAuthComponent } from './post-auth.component';
import { NgxBootstrapModule } from 'src/app/shared/app-ngxbootstrap.module';
import { ProgressBarModule } from 'src/app/common/modules/progress-bar/progress-bar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PostAuthRouteModule,
    FontAwesomeModule,
    ProgressBarModule,
    NgxBootstrapModule,
    AngularSvgIconModule,
    SidebarModule.forRoot()
  ],
  declarations: [
    PostAuthComponent,
    HeaderComponent,
    FooterComponent
  ]
})
export class PostAuthModule { }

