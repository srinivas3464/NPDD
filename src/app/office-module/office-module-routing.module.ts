 
import { NgModule } from '@angular/core'; 
import { Routes, RouterModule } from '@angular/router'; 
import { BudgetslipReportComponent } from './component/budgetslip-report/budgetslip-report.component';
import { BudgetstatementComponent } from './component/budgetstatement/budgetstatement.component';
import { CommonComponent } from './component/common/common.component'; 
import { ComponentDetailsComponent } from './component/component-details/component-details.component';
import { ComponentTenderPriceComponent } from './component/component-tender-price/component-tender-price.component';
import { FirmDetailsReportsComponent } from './component/firm-details-reports/firm-details-reports.component';
import { FirmRegistrationDetailsComponent } from './component/firm-registration-details/firm-registration-details.component';
import { FirmSecurityDepositeComponent } from './component/firm-security-deposite/firm-security-deposite.component';
import { FirmSecurityDepositsReportsComponent } from './component/firm-security-deposits-reports/firm-security-deposits-reports.component';
import { FirmSecurityDepositsfromtodateReportsComponent } from './component/firm-security-depositsfromtodate-reports/firm-security-depositsfromtodate-reports.component';
import { HomepageComponent } from './component/homepage/homepage.component';
import { InvoiceDetailsComponent } from './component/invoice-details/invoice-details.component';
import { InvoiceDocumentReportComponent } from './component/invoice-document-report/invoice-document-report.component';
import { InvoiceReportComponent } from './component/invoice-report/invoice-report.component';
import { PaymentDetailsComponent } from './component/payment-details/payment-details.component';
import { PodetailsReportsComponent } from './component/podetails-reports/podetails-reports.component';
import { PodetailsComponent } from './component/podetails/podetails.component';
import { ProceedingDetailsReportComponent } from './component/proceeding-details-report/proceeding-details-report.component';
import { ProceedingDetailsComponent } from './component/proceeding-details/proceeding-details.component';
import { SchedulemeetingReportComponent } from './component/schedulemeeting-report/schedulemeeting-report.component';
import { SchedulemeetingComponent } from './component/schedulemeeting/schedulemeeting.component';
import { StockentrydetailsComponent } from './component/stockentrydetails/stockentrydetails.component';
import { TenderDetailsTodayReportComponent } from './component/tender-details-today-report/tender-details-today-report.component';
import { TenderPriceReportComponent } from './component/tender-price-report/tender-price-report.component';
import { PaymentDetailsReportComponent } from './component/payment-details-report/payment-details-report.component';
import { OfficemenumoduleComponent } from './component/officemenumodule/officemenumodule.component';
import { OfficemenuReportComponent } from './component/officemenu-report/officemenu-report.component';
import { CommonDynamicMenuComponent } from './component/common-dynamic-menu/common-dynamic-menu.component';
import { ScreenmenuUpdateComponent } from './component/screenmenu-update/screenmenu-update.component';
import { TenderDetailsEntryComponent } from './component/tender-details-entry/tender-details-entry.component';
import { NewTenderDetailsComponent } from './component/new-tender-details/new-tender-details.component';
import { PoDistrictWiseDetailsComponent } from './component/po-district-wise-details/po-district-wise-details.component';
import { TenderDetailsReportComponent } from './component/tender-details-report/tender-details-report.component';
import { ProformaInvoiceComponent } from './component/proforma-invoice/proforma-invoice.component';
import { TendersComponent } from './component/tenders/tenders.component';
import { BudgetFinancialyearsComponent } from './component/budget-financialyears/budget-financialyears.component';
import { ComponentMasterComponent } from './component/component-master/component-master.component';
import { ComponentMasterReportComponent } from './component/component-master-report/component-master-report.component';
import { FinancialYearBudgetReportComponent } from './component/financial-year-budget-report/financial-year-budget-report.component';
import { NominationDetailsComponent } from './component/nomination-details/nomination-details.component';
import { NewScreenEntryComponent } from './component/new-screen-entry/new-screen-entry.component';
import { ExpenditureComponent } from './component/expenditure/expenditure.component';
import { QuotationsComponent } from './component/quotations/quotations.component';
import { ExpenditureReportComponent } from './component/expenditure-report/expenditure-report.component';
import { NominationReportComponent } from './component/nomination-report/nomination-report.component';
import { InvoiceApprovalsDetailsComponent } from './component/invoice-approvals-details/invoice-approvals-details.component';
import { ApprovalsDetailsComponent } from './component/approvals-details/approvals-details.component';
import { ApprovalsReportsComponent } from './component/approvals-reports/approvals-reports.component';
import { PoDistrcitQtyChangesComponent } from './component/po-distrcit-qty-changes/po-distrcit-qty-changes.component';
import { PoDistrcitQtyChangesReportComponent } from './component/po-distrcit-qty-changes-report/po-distrcit-qty-changes-report.component';
import { BMCUApprovalsComponent } from './component/bmcuapprovals/bmcuapprovals.component';
import { LoginComponent } from '../login/components/login/login.component';
import { StockDistrictwisereportComponent } from './component/stock-districtwisereport/stock-districtwisereport.component';
import { LoginWiseComponentsComponent } from './component/login-wise-components/login-wise-components.component';
import { FinancialBudgetAmountsComponent } from './component/financial-budget-amounts/financial-budget-amounts.component';
import { BmcuEquipmentReportComponent } from './component/bmcu-equipment-report/bmcu-equipment-report.component';
import { FarmerDataPushStatusComponent } from './component/farmer-data-push-status/farmer-data-push-status.component';
import { PoDistrictQtyAdditionComponent } from './component/po-district-qty-addition/po-district-qty-addition.component';
import { DistrictQtyAdditionReportComponent } from './component/district-qty-addition-report/district-qty-addition-report.component';
import { PODistrctSummaryComponent } from './component/podistrct-summary/podistrct-summary.component';
import { PodistrictpercentagesummaryComponent } from './component/podistrictpercentagesummary/podistrictpercentagesummary.component';
import { POWisePercentagesComponent } from './component/powise-percentages/powise-percentages.component';
import { PODateWiseSummaryComponent } from './component/podate-wise-summary/podate-wise-summary.component';
import { TenderWiseSummaryComponent } from './component/tender-wise-summary/tender-wise-summary.component';
import { VendormonthlyprocessComponent } from './component/vendormonthlyprocess/vendormonthlyprocess.component';
import { VenderMonthlyProcessReportComponent } from './component/vender-monthly-process-report/vender-monthly-process-report.component';

 
//const roles = ['10','20','30','40','50','60','70'];
 //const roles = ['10'];
 //if(roles==='10'){}
const routes: Routes = [{ 
  path: '',
  component: CommonComponent,
  // //CommonComponent, CommonDynamicMenuComponent
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
      path: 'CommonDynamicMenu',  
      component: CommonDynamicMenuComponent,
    },
     
    {
      path: 'DistrictQtyAddition',
      component: PoDistrictQtyAdditionComponent
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
      path: 'FirmSecurityDeposites',
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
      path: 'loginwisecomponents',
      component: LoginWiseComponentsComponent,
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
        path: 'PODistrictSummary',
        component: PODistrctSummaryComponent
    },

    
    {
      path: 'PODistrictPercentageSummary',
      component: PodistrictpercentagesummaryComponent
  },

    {
      path: 'ProformaInvoice',
      component: ProformaInvoiceComponent,
    },

    {
      path: 'InvoiceReports',
      component: InvoiceReportComponent,
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
      path: 'FinancialBudgetAmounts',
      component:FinancialBudgetAmountsComponent  ,
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
      path: 'StockDistrictwiseReport',  
      component: StockDistrictwisereportComponent,
    },

    {
      path: 'TenderDetailsEntry',  
      component: TenderDetailsEntryComponent, 
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
      path: 'Tenders',  
      component: TendersComponent,
    },

    {
      path: 'TenderDetailsReport',  
      component: TenderDetailsReportComponent,
    },

    {
      path: 'Budgetfinancialyear',  
      component: BudgetFinancialyearsComponent,
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
    path: 'Nomination',
    component: NominationDetailsComponent
},

{
  path: 'NewScreenEntry',
  component: NewScreenEntryComponent
},

{
  path: 'Expenditure',
  component: ExpenditureComponent
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
  path: 'InvoiceDetailsApprovals',
  component: InvoiceApprovalsDetailsComponent 
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
  path: 'podistrictqtyAdditionreport',
  component: DistrictQtyAdditionReportComponent
},



{
  path: 'BMCUApproval',
  component: BMCUApprovalsComponent
}, 
{
  path: 'BmcuequipmentReport',
  component: BmcuEquipmentReportComponent
}, 
{
  path: 'FarmerDataPush',
  component: FarmerDataPushStatusComponent
},

{
  path: 'PoWisePercentages',
  component: POWisePercentagesComponent
},
{
  path: 'PODateWiseSummary',
  component: PODateWiseSummaryComponent
},
{
  path: 'TenderWiseSummary',
  component: TenderWiseSummaryComponent
},
{
  path: 'VenderMonthlyProcessReport',
  component: VenderMonthlyProcessReportComponent
},

{
  path: 'VendorMonthlyProccess',
  component: VendormonthlyprocessComponent
},


  {
    path: 'FinancialYearBudgetReport',
    component: FinancialYearBudgetReportComponent
},
  ],
}];

@NgModule({
  imports: [
    
     RouterModule.forChild(routes)
   ],    
   
  exports: [RouterModule]
})
export class OfficeModuleRoutingModule { }
