import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DistrictInchargeModuleRoutingModule } from './district-incharge-module-routing.module';
import { CommonComponent } from './components/common/common.component';
import { HomeComponent } from './components/home/home.component';


@NgModule({
  declarations: [CommonComponent, HomeComponent],
  imports: [
    CommonModule,
    DistrictInchargeModuleRoutingModule
  ]
})
export class DistrictInchargeModuleModule { }
