import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountsModuleRoutingModule } from './accounts-module-routing.module';
import { CommonComponent } from './components/common/common.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { ActinvoicedetailsComponent } from './components/actinvoicedetails/actinvoicedetails.component';
import { OfficeModuleModule } from '../office-module/office-module.module';


@NgModule({
  declarations: [CommonComponent, HomepageComponent, ActinvoicedetailsComponent],
  imports: [
    CommonModule,
    AccountsModuleRoutingModule,
    OfficeModuleModule,
  ]
})
export class AccountsModuleModule { }
