import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsModuleRoutingModule } from './projects-module-routing.module';
import { CommonComponent } from './components/common/common.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { OfficeModuleModule } from '../office-module/office-module.module';


@NgModule({
  declarations: [CommonComponent, HomepageComponent],
  imports: [
    CommonModule,
    ProjectsModuleRoutingModule,
    OfficeModuleModule
  ]
})
export class ProjectsModuleModule { }
