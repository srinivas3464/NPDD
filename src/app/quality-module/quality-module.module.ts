import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QualityModuleRoutingModule } from './quality-module-routing.module';
import { CommonComponent } from './components/common/common.component';
import { OfficeModuleModule } from '../office-module/office-module.module';
import { HomepageComponent } from './components/homepage/homepage.component';


@NgModule({
  declarations: [CommonComponent, HomepageComponent],
  imports: [
    CommonModule,
    QualityModuleRoutingModule,
    OfficeModuleModule
  ]
})
export class QualityModuleModule { }
