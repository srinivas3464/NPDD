import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { OfficeserviceService } from '../../services/officeservice.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-expenditure-report',
    templateUrl: './expenditure-report.component.html',
    styleUrls: ['./expenditure-report.component.css']
})
export class ExpenditureReportComponent implements OnInit, OnDestroy, AfterViewInit {
    DataList: any[] = [];
    excelData: any[] = [];


    @ViewChild(DataTableDirective, { static: false })
    dtElement: DataTableDirective;
    dtOptions: DataTables.Settings = this.utils.dataTableOptions();
    dtTrigger: Subject<any> = new Subject();
    pendtTrigger: Subject<any> = new Subject();

    constructor(private spinner: NgxSpinnerService,
        private utils: UtilsService,
        private router: Router,
        private toast: ToasterService,
        private session: SessionService,
        private OfficeModuleAPI: OfficeserviceService,
    ) {

    }


    ngOnInit(): void {
        if (this.session.uniqueId != "" && this.session.desigId != "") {
            this.LoadReport();
        }
        else {
            this.router.navigate(['/shared/UnAuthorized']);
        }
    }

    async LoadReport(): Promise<void> {
        try {
            debugger;
            this.excelData = [];
            this.DataList = [];
            const obj = {
                type: "15",
            }
            this.spinner.show();
            const res = await this.OfficeModuleAPI.office_Budget_Select(obj)
            if (res.success) {
                this.excelData = [];

                this.spinner.hide();
                this.DataList = res.result;
                for (var i = 0; i < this.DataList.length; i++) {
                    let singleRow =
                    {
                        S_NO: i + 1,
                        COMPONENT_NAME: this.DataList[i].COMPNAME,
                        SUB_COMPONENT_NAME: this.DataList[i].SUB_COMPONENT,
                        BUDGET_UNITS: this.DataList[i].UNITS,
                        BUDGET_AMOUNT: this.DataList[i].AMOUNT,
                        BUDGET_TOTAL: this.DataList[i].TOTAL,
                        PRICE: this.DataList[i].BUDGET_PRICE,
                        QUANTITY: this.DataList[i].QUANTITY,
                        TOTAL: this.DataList[i].TOTAL_PRICE,
                    }
                    this.excelData.push(singleRow);
                }
                //console.log(this.DataList);
                return;
            }
            else {
                this.spinner.hide();
                this.toast.info(res.message);
                return;

            }

        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
            return;

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
            'Expenditure Details',
            true
        );
    }
}
