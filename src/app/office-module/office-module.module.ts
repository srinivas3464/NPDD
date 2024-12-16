import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfficeModuleRoutingModule } from './office-module-routing.module';
import { CommonComponent } from './component/common/common.component';
import { HomepageComponent } from './component/homepage/homepage.component';
import { PodetailsComponent } from './component/podetails/podetails.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
 
//import { sharedModule } from '../shared/shared.module';
import { FirmRegistrationDetailsComponent } from './component/firm-registration-details/firm-registration-details.component';
import { ComponentDetailsComponent } from './component/component-details/component-details.component';
import { FirmSecurityDepositeComponent } from './component/firm-security-deposite/firm-security-deposite.component';
import { TenderDetailsTodayReportComponent } from './component/tender-details-today-report/tender-details-today-report.component';
import { PodetailsReportsComponent } from './component/podetails-reports/podetails-reports.component';
import { FirmDetailsReportsComponent } from './component/firm-details-reports/firm-details-reports.component';
import { FirmSecurityDepositsReportsComponent } from './component/firm-security-deposits-reports/firm-security-deposits-reports.component';
import { FirmSecurityDepositsfromtodateReportsComponent } from './component/firm-security-depositsfromtodate-reports/firm-security-depositsfromtodate-reports.component';
import { InvoiceDetailsComponent } from './component/invoice-details/invoice-details.component';
import { sharedModule } from "../shared/shared.module";
import { InvoiceReportComponent } from './component/invoice-report/invoice-report.component';
import { ComponentTenderPriceComponent } from './component/component-tender-price/component-tender-price.component';
import { TenderPriceReportComponent } from './component/tender-price-report/tender-price-report.component';
import { BudgetstatementComponent } from './component/budgetstatement/budgetstatement.component';
import { BudgetslipReportComponent } from './component/budgetslip-report/budgetslip-report.component';
import { ProceedingDetailsComponent } from './component/proceeding-details/proceeding-details.component';
import { ProceedingDetailsReportComponent } from './component/proceeding-details-report/proceeding-details-report.component';
import { PaymentDetailsComponent } from './component/payment-details/payment-details.component';
import { InvoiceDocumentReportComponent } from './component/invoice-document-report/invoice-document-report.component';
import { StockentrydetailsComponent } from './component/stockentrydetails/stockentrydetails.component';
import { SchedulemeetingComponent } from './component/schedulemeeting/schedulemeeting.component';
import { SchedulemeetingReportComponent } from './component/schedulemeeting-report/schedulemeeting-report.component';
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
import { TenderWiseSummaryComponent } from './component/tender-wise-summary/tender-wise-summary.component';
import { PODateWiseSummaryComponent } from './component/podate-wise-summary/podate-wise-summary.component';
import { VendormonthlyprocessComponent } from './component/vendormonthlyprocess/vendormonthlyprocess.component';
import { VenderMonthlyProcessReportComponent } from './component/vender-monthly-process-report/vender-monthly-process-report.component';
 


@NgModule({
    declarations: [CommonComponent, HomepageComponent, PodetailsComponent, FirmRegistrationDetailsComponent, ComponentDetailsComponent, FirmSecurityDepositeComponent, TenderDetailsTodayReportComponent, PodetailsReportsComponent, FirmDetailsReportsComponent, FirmSecurityDepositsReportsComponent, FirmSecurityDepositsfromtodateReportsComponent, InvoiceDetailsComponent, InvoiceReportComponent, ComponentTenderPriceComponent, TenderPriceReportComponent, BudgetstatementComponent, BudgetslipReportComponent, ProceedingDetailsComponent, ProceedingDetailsReportComponent, PaymentDetailsComponent, InvoiceDocumentReportComponent, StockentrydetailsComponent, SchedulemeetingComponent, SchedulemeetingReportComponent, PaymentDetailsReportComponent, OfficemenumoduleComponent, OfficemenuReportComponent, CommonDynamicMenuComponent, ScreenmenuUpdateComponent, TenderDetailsEntryComponent, NewTenderDetailsComponent, PoDistrictWiseDetailsComponent, TenderDetailsReportComponent, ProformaInvoiceComponent, TendersComponent, BudgetFinancialyearsComponent, ComponentMasterComponent, ComponentMasterReportComponent, FinancialYearBudgetReportComponent, NominationDetailsComponent, NewScreenEntryComponent, ExpenditureComponent, QuotationsComponent, ExpenditureReportComponent, NominationReportComponent, InvoiceApprovalsDetailsComponent, ApprovalsDetailsComponent, ApprovalsReportsComponent, PoDistrcitQtyChangesComponent, PoDistrcitQtyChangesReportComponent, BMCUApprovalsComponent, StockDistrictwisereportComponent, LoginWiseComponentsComponent, FinancialBudgetAmountsComponent, BmcuEquipmentReportComponent, FarmerDataPushStatusComponent, PoDistrictQtyAdditionComponent, DistrictQtyAdditionReportComponent, PODistrctSummaryComponent, PodistrictpercentagesummaryComponent, POWisePercentagesComponent, TenderWiseSummaryComponent, PODateWiseSummaryComponent, VendormonthlyprocessComponent, VenderMonthlyProcessReportComponent],
    imports: [
        CommonModule,
        OfficeModuleRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        DataTablesModule,
        sharedModule
    ],
    exports:[
        InvoiceDetailsComponent,
        CommonDynamicMenuComponent,
    ]
})
export class OfficeModuleModule { }
 