import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { OfficeserviceService } from '../../services/officeservice.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';




@Component({
    selector: 'app-financial-year-budget-report',
    templateUrl: './financial-year-budget-report.component.html',
    styleUrls: ['./financial-year-budget-report.component.css']
})
export class FinancialYearBudgetReportComponent implements OnInit, OnDestroy, AfterViewInit {


    DataList: any[] = [];
    excelData: any[] = [];

    @ViewChild(DataTableDirective, { static: false })
    dtElement: DataTableDirective;
    dtOptions: DataTables.Settings = this.utils.dataTableOptions();
    dtTrigger: Subject<any> = new Subject();
    pendtTrigger: Subject<any> = new Subject();

    constructor(
        private toast: ToasterService,
        private utils: UtilsService,
        private session: SessionService,
        private spinner: NgxSpinnerService,
        private router: Router,
        private OfficeModuleAPI: OfficeserviceService,) { }

    ngOnInit(): void {
        if (this.session.uniqueId != "" && this.session.desigId != "") {
            this.Componentdetails();
        }
    }
    async Componentdetails(): Promise<void> {
        try {
            this.excelData = [];
            const reqdistrict = {
                type: "7",
            }
            const res = await this.OfficeModuleAPI.office_Budget_Select(reqdistrict);
            if (res.success) {
                this.excelData = [];
                this.DataList = res.result;
                for (var i = 0; i < this.DataList.length; i++) {
                    let singleRow =
                    {
                        S_NO: i + 1,
                        FROM_FINANCIAL_YEAR: this.DataList[i].FROM_FINANCIAL_YEAR,
                        TO_FINANCIAL_YEAR: this.DataList[i].TO_FINANCIAL_YEAR,
                        COMPONENT_NAME: this.DataList[i].COMPNAME,
                        SUB_COMPONENT_NAME: this.DataList[i].SUB_COMPONENT_NAME,
                        UNITS: this.DataList[i].BUDGET_UNITS,
                        AMOUNT: this.DataList[i].BUDGET_AMOUNT,

                    }
                    this.excelData.push(singleRow);
                }

                this.rerender();
            } else {
                this.toast.info(res.message);
            }
            this.spinner.hide();
        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
    }

    ngOnDestroy(): void {
        //     // Do not forget to unsubscribe the event
        this.dtTrigger.unsubscribe();
    }
    ngAfterViewInit(): void {
        this.dtTrigger.next();
    }
    rerender(): void {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            // Destroy the table first
            dtInstance.destroy();
            // Call the dtTrigger to rerender again
            this.dtTrigger.next();
        });
    }

    btnExcel(): void {
        debugger;
        this.utils.JSONToCSVConvertor(
            this.excelData,
            'Financial Year Budget Report',
            true
        );
    }


}
