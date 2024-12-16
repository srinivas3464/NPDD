import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { PageNotFoundComponent } from './components/errorPages/page-not-found/page-not-found.component';
import { UnAuthorizedComponent } from './components/errorPages/un-authorized/un-authorized.component';
import { ServerUnavailableComponent } from './components/errorPages/server-unavailable/server-unavailable.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordUpdateComponent } from './components/password-update/password-update.component';
import { IssueTrackingRegComponent } from './components/issueTracking/issue-tracking-reg/issue-tracking-reg.component';
import { RegisteredIssuesComponent } from './components/issueTracking/registered-issues/registered-issues.component';
import { DataTablesModule } from 'angular-datatables';
import { ViewIssueDetailsComponent } from './components/issueTracking/view-issue-details/view-issue-details.component';
import { FarmerDetailsComponent } from './components/farmerApproval/farmer-details/farmer-details.component';
import { VolunteerSubmittedFarmerListComponent } from './components/farmerApproval/volunteer-submitted-farmer-list/volunteer-submitted-farmer-list.component';
import { NumbersOnlyDirective } from './directives/numbers-only.directive';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { IndianNumberPipe } from './pipes/indian-number.pipe';
import { MonthPickerComponent } from './components/month-picker/month-picker.component';
import { ViewPhotoComponent } from './components/view-photo/view-photo.component';
import { ViewPDFComponent } from './components/view-pdf/view-pdf.component';
@NgModule({
  declarations: [
    PageNotFoundComponent,
    UnAuthorizedComponent,
    ServerUnavailableComponent,
    PasswordUpdateComponent,
    IssueTrackingRegComponent,
    RegisteredIssuesComponent,
    ViewIssueDetailsComponent,
    FarmerDetailsComponent,
    VolunteerSubmittedFarmerListComponent,
    NumbersOnlyDirective,
    DatePickerComponent,
    IndianNumberPipe,
    MonthPickerComponent,
    ViewPhotoComponent,
    ViewPDFComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    BsDatepickerModule.forRoot(),
  ],
  exports: [
    IssueTrackingRegComponent,
    RegisteredIssuesComponent,
    ViewIssueDetailsComponent,
    FarmerDetailsComponent,
    VolunteerSubmittedFarmerListComponent,
    NumbersOnlyDirective,
    DatePickerComponent,
    IndianNumberPipe,
    MonthPickerComponent
  ]
})
// tslint:disable-next-line: class-name
export class sharedModule {}
