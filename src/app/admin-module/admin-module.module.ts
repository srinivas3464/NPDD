import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminModuleRoutingModule } from './admin-module-routing.module';
import { OfficeModuleModule } from '../office-module/office-module.module';
import { CommonComponent } from './components/common/common.component';
import { HomepageComponent } from './components/homepage/homepage.component';


@NgModule({
  declarations: [CommonComponent, HomepageComponent],
  imports: [
    CommonModule,
    AdminModuleRoutingModule,
    OfficeModuleModule
  ]
})
export class AdminModuleModule { }
