import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './components/errorPages/page-not-found/page-not-found.component';
import { PasswordUpdateComponent } from './components/password-update/password-update.component';
import { ServerUnavailableComponent } from './components/errorPages/server-unavailable/server-unavailable.component';
import { UnAuthorizedComponent } from './components/errorPages/un-authorized/un-authorized.component';
import { ViewPhotoComponent } from './components/view-photo/view-photo.component';
import { ViewPDFComponent } from './components/view-pdf/view-pdf.component';

const routes: Routes = [
  {
    path: 'PageNotFound',
    component: PageNotFoundComponent
  },
  {
    path: 'ServerUnavailable',
    component: ServerUnavailableComponent
  },
  {
    path: 'UnAuthorized',
    component: UnAuthorizedComponent
  },
  {
     
    path: 'PasswordUpdate',
    component: PasswordUpdateComponent
  },
  {
    path: 'viewPhoto',
    component: ViewPhotoComponent
  },
  {
    path: 'viewPDF',
    component: ViewPDFComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
