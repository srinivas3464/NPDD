import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/components/errorPages/page-not-found/page-not-found.component';
 
const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
        import('./login/login.module').then((m) => m.loginModule),
  },
  {
    path: 'shared',
    loadChildren: () =>
      import('./shared/shared.module').then((m) => m.sharedModule),
  }, 
  {
    path: 'officeModule',
    loadChildren: () =>
      import('./office-module/office-module.module').then(
        (m) => m.OfficeModuleModule
      ),
  }, 
  {
    path: 'DynamicmenuModule',
    loadChildren: () =>
      import('./dynamicmenu-module/dynamicmenu-module.module').then(
        (m) => m.DynamicmenuModuleModule
      ),
  },

  {
    path: 'Accountsmodule',
    loadChildren: () =>
      import('./accounts-module/accounts-module.module').then(
        (m) => m.AccountsModuleModule
      ),
  },

  {
    path: 'ProjectsModule',
    loadChildren: () =>
      import('./projects-module/projects-module.module').then(
        (m) => m.ProjectsModuleModule
      ),
  },
  
  {
    path: 'QualityModule',
    loadChildren: () =>
      import('./quality-module/quality-module.module').then(
        (m) => m.QualityModuleModule
      ),
  },
  

  {
    path: 'CivilModule',
    loadChildren: () =>
      import('./civil-module/civil-module.module').then(
        (m) => m.CivilModuleModule
      ),
  },

  
   
  {
    path: 'MechanicalModule',
    loadChildren: () =>
      import('./mechanical-module/mechanical-module.module').then(
        (m) => m.MechanicalModuleModule
      ),
  },

  {
    path: 'VendorsModule',
    loadChildren: () =>
      import('./vendors-module/vendors-module.module').then(
        (m) => m.VendorsModuleModule
      ),
  },

  {
    path: 'AdminModule',
    loadChildren: () =>
      import('./admin-module/admin-module.module').then(
        (m) => m.AdminModuleModule
      ),
  },
  

  {
    path: 'DistrictInchargeModule',
    loadChildren: () =>
      import('./district-incharge-module/district-incharge-module.module').then(
        (m) => m.DistrictInchargeModuleModule
      ),
  },


  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: '**',
    pathMatch: 'full',
    component: PageNotFoundComponent,
  },
];

@NgModule({
   

  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
 
})
export class AppRoutingModule {}
