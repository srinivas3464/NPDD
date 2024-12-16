import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CivilModuleRoutingModule } from './civil-module-routing.module';
import { CommonComponent } from './components/common/common.component';
import { OfficeModuleModule } from '../office-module/office-module.module';
import { HomepageComponent } from './components/homepage/homepage.component';
import { OfficeModuleRoutingModule } from '../office-module/office-module-routing.module';


@NgModule({
  declarations: [CommonComponent, HomepageComponent],
  imports: [
    CommonModule,
     CivilModuleRoutingModule,
   // OfficeModuleRoutingModule,
    OfficeModuleModule
  ]
})
export class CivilModuleModule { }
