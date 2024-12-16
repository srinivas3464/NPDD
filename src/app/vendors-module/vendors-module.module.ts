import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorsModuleRoutingModule } from './vendors-module-routing.module';
import { CommonComponent } from './components/common/common.component';
import { OfficeModuleModule } from '../office-module/office-module.module';
import { HomepageComponent } from './components/homepage/homepage.component';


@NgModule({
  declarations: [CommonComponent, HomepageComponent],
  imports: [
    CommonModule,
    VendorsModuleRoutingModule,
    OfficeModuleModule
  ]
})
export class VendorsModuleModule { }
