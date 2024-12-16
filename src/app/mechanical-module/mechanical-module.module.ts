import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MechanicalModuleRoutingModule } from './mechanical-module-routing.module';
import { CommonComponent } from './components/common/common.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { OfficeModuleModule } from '../office-module/office-module.module';


@NgModule({
  declarations: [CommonComponent, HomepageComponent],
  imports: [
    CommonModule,
    MechanicalModuleRoutingModule,
    OfficeModuleModule
  ]
})
export class MechanicalModuleModule { }
