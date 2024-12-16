import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonComponent } from './components/common/common.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { BudgetslipReportComponent } from '../office-module/component/budgetslip-report/budgetslip-report.component';
import { BudgetstatementComponent } from '../office-module/component/budgetstatement/budgetstatement.component';
import { ComponentDetailsComponent } from '../office-module/component/component-details/component-details.component';
import { ComponentTenderPriceComponent } from '../office-module/component/component-tender-price/component-tender-price.component';
import { FirmDetailsReportsComponent } from '../office-module/component/firm-details-reports/firm-details-reports.component';
import { FirmRegistrationDetailsComponent } from '../office-module/component/firm-registration-details/firm-registration-details.component';
import { FirmSecurityDepositeComponent } from '../office-module/component/firm-security-deposite/firm-security-deposite.component';
import { FirmSecurityDepositsReportsComponent } from '../office-module/component/firm-security-deposits-reports/firm-security-deposits-reports.component';
import { FirmSecurityDepositsfromtodateReportsComponent } from '../office-module/component/firm-security-depositsfromtodate-reports/firm-security-depositsfromtodate-reports.component';
import { InvoiceDetailsComponent } from '../office-module/component/invoice-details/invoice-details.component';
import { InvoiceDocumentReportComponent } from '../office-module/component/invoice-document-report/invoice-document-report.component';
import { InvoiceReportComponent } from '../office-module/component/invoice-report/invoice-report.component';
import { OfficemenuReportComponent } from '../office-module/component/officemenu-report/officemenu-report.component';
import { OfficemenumoduleComponent } from '../office-module/component/officemenumodule/officemenumodule.component';
import { PaymentDetailsReportComponent } from '../office-module/component/payment-details-report/payment-details-report.component';
import { PaymentDetailsComponent } from '../office-module/component/payment-details/payment-details.component';
import { PodetailsReportsComponent } from '../office-module/component/podetails-reports/podetails-reports.component';
import { PodetailsComponent } from '../office-module/component/podetails/podetails.component';
import { ProceedingDetailsReportComponent } from '../office-module/component/proceeding-details-report/proceeding-details-report.component';
import { ProceedingDetailsComponent } from '../office-module/component/proceeding-details/proceeding-details.component';
import { SchedulemeetingReportComponent } from '../office-module/component/schedulemeeting-report/schedulemeeting-report.component';
import { SchedulemeetingComponent } from '../office-module/component/schedulemeeting/schedulemeeting.component';
import { ScreenmenuUpdateComponent } from '../office-module/component/screenmenu-update/screenmenu-update.component';
import { StockentrydetailsComponent } from '../office-module/component/stockentrydetails/stockentrydetails.component';
import { TenderDetailsTodayReportComponent } from '../office-module/component/tender-details-today-report/tender-details-today-report.component';
import { TenderPriceReportComponent } from '../office-module/component/tender-price-report/tender-price-report.component';
import { NewTenderDetailsComponent } from '../office-module/component/new-tender-details/new-tender-details.component';
import { PoDistrictWiseDetailsComponent } from '../office-module/component/po-district-wise-details/po-district-wise-details.component';
import { TenderDetailsReportComponent } from '../office-module/component/tender-details-report/tender-details-report.component';
import { ProformaInvoiceComponent } from '../office-module/component/proforma-invoice/proforma-invoice.component';
import { BudgetFinancialyearsComponent } from '../office-module/component/budget-financialyears/budget-financialyears.component';
import { ComponentMasterComponent } from '../office-module/component/component-master/component-master.component';
import { ComponentMasterReportComponent } from '../office-module/component/component-master-report/component-master-report.component';
import { FinancialYearBudgetReportComponent } from '../office-module/component/financial-year-budget-report/financial-year-budget-report.component';
import { TendersComponent } from '../office-module/component/tenders/tenders.component';
import { NominationDetailsComponent } from '../office-module/component/nomination-details/nomination-details.component';
import { NewScreenEntryComponent } from '../office-module/component/new-screen-entry/new-screen-entry.component';
import { ExpenditureComponent } from '../office-module/component/expenditure/expenditure.component';
import { QuotationsComponent } from '../office-module/component/quotations/quotations.component';
import { ExpenditureReportComponent } from '../office-module/component/expenditure-report/expenditure-report.component';
import { NominationReportComponent } from '../office-module/component/nomination-report/nomination-report.component';
import { ApprovalsDetailsComponent } from '../office-module/component/approvals-details/approvals-details.component';
import { ApprovalsReportsComponent } from '../office-module/component/approvals-reports/approvals-reports.component';
import { PoDistrcitQtyChangesReportComponent } from '../office-module/component/po-distrcit-qty-changes-report/po-distrcit-qty-changes-report.component';
import { PoDistrcitQtyChangesComponent } from '../office-module/component/po-distrcit-qty-changes/po-distrcit-qty-changes.component';
import { BmcuEquipmentReportComponent } from '../office-module/component/bmcu-equipment-report/bmcu-equipment-report.component';

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
      path: 'podetails',
      component: PodetailsComponent,
    },
    {
      path: 'FirmDetails',
      component: FirmRegistrationDetailsComponent,
    },

    {
      path: 'ComponentDetails',
      component: ComponentDetailsComponent,
    },
    {
      path: 'FirmSecuirtyDeposites',
      component: FirmSecurityDepositeComponent,
    },

    

    {
      path: 'TenderDetailsReports',
      component: TenderDetailsTodayReportComponent,
    },

     
    {
      path: 'PODetailsReport',
      component: PodetailsReportsComponent,
    },
    
    {
      path: 'FirmDetailsReport',
      component: FirmDetailsReportsComponent,
    },
    {
      path: 'FirmSecuDepositReport',
      component: FirmSecurityDepositsReportsComponent,
    },
    
    {
      path: 'FirmSecuDepositFromTodateReport',
      component: FirmSecurityDepositsfromtodateReportsComponent,
    },

    {
      path: 'InvoiceDetails',
      component: InvoiceDetailsComponent,
    },

    {
      path: 'InvoiceReports',
      component: InvoiceReportComponent,
    },
    {
      path: 'ProformaInvoice',
      component: ProformaInvoiceComponent,
    },

    
    {
      path: 'ComponentTenderPrice',
      component: ComponentTenderPriceComponent,
    },

    {
      path: 'TenderPriceReport',
      component: TenderPriceReportComponent,
    },

     
    {
      path: 'Budgetstatement',
      component:BudgetstatementComponent  ,
    },

    {
      path: 'BudgetslipReport',
      component:BudgetslipReportComponent  ,
    },

    {
      path: 'ProceedingDetails',
      component:ProceedingDetailsComponent  ,
    },

    {
      path: 'ProceedingDetailsReport',
      component:ProceedingDetailsReportComponent  ,
    },
    {
      path: 'BmcuequipmentReport',
      component: BmcuEquipmentReportComponent
    },
    
    {
      path: 'PaymentDetails',
      component:PaymentDetailsComponent  ,
    },

    {
      path: 'InvoiceDocumentReport',
      component:InvoiceDocumentReportComponent  ,
    },

    {
      path: 'stockentrydetails',
      component:StockentrydetailsComponent  ,
    },
    
    {
      path: 'schedulemeeting',
      component:SchedulemeetingComponent  ,
    }, 
    {
      path: 'scheduleMeetingReport',
      component:SchedulemeetingReportComponent  ,
    },

    {
      path: 'PaymentDetailsReport',
      component:PaymentDetailsReportComponent  ,
    },


    {
      path: 'ScreenAssignment',
      component:OfficemenumoduleComponent  ,
    },
    
    {
      path: 'officemenuReport',
      component:OfficemenuReportComponent  ,
    },
    {
      path: 'ScreenmenuUpdate',  
      component: ScreenmenuUpdateComponent,
    },
    {
      path: 'TenderDetails',  
      component: NewTenderDetailsComponent,
    },

    {
      path: 'PODistrictwiseDetails',  
      component: PoDistrictWiseDetailsComponent,
    },

    
{
  path: 'ApprovalsDetails',
  component: ApprovalsDetailsComponent
},

{
  path: 'ApprovalReports',
  component: ApprovalsReportsComponent
},
{
  path: 'PoDistrictQtyChanges',
  component: PoDistrcitQtyChangesComponent
},
{
  path: 'podistrictqtychangesreport',
  component: PoDistrcitQtyChangesReportComponent
},

    {
      path: 'TenderDetailsReport',  
      component: TenderDetailsReportComponent,
    },
    {
      path: 'Quotations',
      component: QuotationsComponent
    },
    {
      path: 'ExpenditureReport',
      component: ExpenditureReportComponent
    },
    
    {
      path: 'NominationReport',
      component: NominationReportComponent
    },
    {
      path: 'Budgetfinancialyear',  
      component: BudgetFinancialyearsComponent,
    },
    {
      path: 'Expenditure',
      component: ExpenditureComponent
    },
    {
      path: 'Nomination',
      component: NominationDetailsComponent
  },
  {
    path: 'NewScreenEntry',
    component: NewScreenEntryComponent
  },
    {
      path: 'Tenders',  
      component: TendersComponent,
    },
    {
      path: 'ComponentMaster',  
      component: ComponentMasterComponent,
    },
    
    {
      path: 'ComponentMasterReport',
      component: ComponentMasterReportComponent
  },

  {
    path: 'FinancialYearBudgetReport',
    component: FinancialYearBudgetReportComponent
}
  ],

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MechanicalModuleRoutingModule { }
