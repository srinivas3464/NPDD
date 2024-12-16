import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { OfficeserviceService } from '../../services/officeservice.service';

@Component({
  selector: 'app-podate-wise-summary',
  templateUrl: './podate-wise-summary.component.html',
  styleUrls: ['./podate-wise-summary.component.css']
})
export class PODateWiseSummaryComponent implements OnInit {
  fromDate: any;
    toDate: any;
    POList: any[] = [];
    POSummaryList: any[] = [];
    selectedPO: any;
    excelData: any[] = [];
    reportTotal = {
        S_NO: "--",
        PODATE: "Total",
        PONO: "--",
        POQUANTITY: 0,
        POAMOUNT: 0,
        INVOICEQUANTITY: 0,
        INVOICEAMOUNT: 0,
        APPROVALQUANTITY: 0,
        APPROVALAMOUNT: 0,
        QUANTITY: 0,
        AMOUNT: 0,
    }

    @ViewChild(DataTableDirective, { static: false })
    dtElement: DataTableDirective;
    dtOptions: DataTables.Settings = this.utils.dataTableOptions();
    dtTrigger: Subject<any> = new Subject();


    constructor(private toast: ToasterService,
        private utils: UtilsService,
        private session: SessionService,
        private OfficeModuleAPI: OfficeserviceService,
        private spinner: NgxSpinnerService,
        private router: Router
    ) { }

    ngOnInit(): void {
        debugger;

        if (this.session.uniqueId != "" && this.session.desigId != "") {
            this.fromDate =  this.session.getTodayDateString(); //"01-02-2020",
                this.toDate = this.session.getTodayDateString();
            this.btnLoadReport()


        }
        else {
            this.router.navigate(['/shared/UnAuthorized']);
        }
    }





    async btnLoadReport(): Promise<void> {
        try {
            if (this.utils.DataValidationNullorEmptyorUndefined(this.fromDate)) {
                this.toast.warning('Please Select From Date ');
                return;
            }
            if (this.utils.DataValidationNullorEmptyorUndefined(this.toDate)) {
                this.toast.warning('Please Select To Date ');
                return;
            }
            else {
                debugger
                const obj = {
                    type: "25",
                    INPUT_01: this.fromDate,
                    INPUT_02: this.toDate
                }
                this.POSummaryList = [];
                this.excelData = [];
                this.reportTotal = {
                    S_NO: "--",
                    PODATE: "Total",
                    PONO: "--",
                    POQUANTITY: 0,
                    POAMOUNT: 0,
                    INVOICEQUANTITY: 0,
                    INVOICEAMOUNT: 0,
                    APPROVALQUANTITY: 0,
                    APPROVALAMOUNT: 0,
                    QUANTITY: 0,
                    AMOUNT: 0,

                }
                this.spinner.show();
                const res = await this.OfficeModuleAPI.office_Budget_Select(obj);
                if (res.success) {
                    this.excelData = [];
                    this.POSummaryList = [];
                    this.reportTotal = {
                        S_NO: "--",
                        PODATE: "Total",
                        PONO: "--",
                        POQUANTITY: 0,
                        POAMOUNT: 0,
                        INVOICEQUANTITY: 0,
                        INVOICEAMOUNT: 0,
                        APPROVALQUANTITY: 0,
                        APPROVALAMOUNT: 0,
                        QUANTITY: 0,
                        AMOUNT: 0,

                    }
                    this.POSummaryList = res.result;
                    for (let i = 0; i < this.POSummaryList.length; i++) {

                        this.reportTotal.POQUANTITY += parseInt(this.POSummaryList[i].UNITS);
                        this.reportTotal.POAMOUNT += parseInt(this.POSummaryList[i].PRICES);
                        this.reportTotal.INVOICEQUANTITY += parseInt(this.POSummaryList[i].INV_UNITS);
                        this.reportTotal.INVOICEAMOUNT += parseInt(this.POSummaryList[i].INV_AMOUNT);
                        this.reportTotal.APPROVALQUANTITY += parseInt(this.POSummaryList[i].APP_QTY);
                        this.reportTotal.APPROVALAMOUNT += parseInt(this.POSummaryList[i].APP_AMOUNT);
                        this.reportTotal.QUANTITY += parseInt(this.POSummaryList[i].QTY);
                        this.reportTotal.AMOUNT += parseInt(this.POSummaryList[i].AMOUNT);

                        let singleRow = {
                            S_NO: i + 1,
                            PODATE: this.POSummaryList[i].PODATE,
                            PONO: this.POSummaryList[i].PONUMBER,
                            POQUANTITY: this.POSummaryList[i].UNITS,
                            POAMOUNT: this.POSummaryList[i].PRICES,
                            INVOICEQUANTITY: this.POSummaryList[i].INV_UNITS,
                            INVOICEAMOUNT: this.POSummaryList[i].INV_AMOUNT,
                            APPROVALQUANTITY: this.POSummaryList[i].APP_QTY,
                            APPROVALAMOUNT: this.POSummaryList[i].APP_AMOUNT,
                            QUANTITY: this.POSummaryList[i].QTY,
                            AMOUNT: this.POSummaryList[i].AMOUNT

                        }
                        this.excelData.push(singleRow);
                    }
                    this.excelData.push(this.reportTotal)
                    this.spinner.hide();
                    this.rerender();
                    //console.log(this.POSummaryList);
                } else {
                    this.spinner.hide();
                    this.toast.warning(res.message);

                }
            }

        }
        catch (error) {
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
            'PO Date Wise Summary',
            true
        );
    }

}
