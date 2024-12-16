import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DynamicmenuModuleRoutingModule } from './dynamicmenu-module-routing.module';
 
import { HomepageComponent } from './component/homepage/homepage.component';
import { CommonComponent } from './component/common/common.component';


@NgModule({
  declarations: [ HomepageComponent, CommonComponent],
  imports: [
    CommonModule,
    DynamicmenuModuleRoutingModule
  ]
})
export class DynamicmenuModuleModule { }
