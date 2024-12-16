import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
 
import { HomepageComponent } from './component/homepage/homepage.component';
import { CommonComponent } from './component/common/common.component';
import { CommonDynamicMenuComponent } from '../office-module/component/common-dynamic-menu/common-dynamic-menu.component';

//const roles = ['301'];
const routes: Routes = [{
  path: '',
  component: CommonComponent,
  
  children: [ 
    {
      path: '',
      redirectTo: 'Homepage',
      pathMatch: 'full',
    },
    {
      path: 'Homepage',
      component: HomepageComponent,
    },

    {
      path: 'Common',
      component: CommonComponent,
    },

  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DynamicmenuModuleRoutingModule { }
