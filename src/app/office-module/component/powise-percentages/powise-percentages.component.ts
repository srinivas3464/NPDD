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
    selector: 'app-powise-percentages',
    templateUrl: './powise-percentages.component.html',
    styleUrls: ['./powise-percentages.component.css']
})
export class POWisePercentagesComponent implements OnInit {
    POList: any[] = [];
    POSummaryList: any[] = [];
    selectedPO: any;
    excelData: any[] = [];
    reportTotal = {
        S_NO: "--", 
        DISTRICT_NAME: "Total",
        INVOICEDATE: "--",
        INVOICENO: "--",
        INV_UNITS: 0,
        INV_PRICES: 0,
        P_ADV_PER: 0,
        P_DELIVERY_PER: 0,
        P_INSTALL_PER: 0,
        P_FINAL_PER: 0,
        A_ADV_PER: 0,
        A_DELIVERY_PER: 0,
        A_INSTALL_PER: 0,
        A_FINAL_PER: 0,
        PR_INV_PER: 0,
        PR_AP_ADV_PER: 0,
        P_UNITS: 0,
        P_PRICES: 0,

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


        if (this.session.uniqueId != "" && this.session.desigId != "") {
            this.PoGet();
        }
        else {
            this.router.navigate(['/shared/UnAuthorized']);
        }
    }

    async PoGet(): Promise<void> {
        try {
            this.POList = [];
            const obj = {
                "type": "23",
                UNIQUEID: this.session.uniqueId, ROLE: this.session.desigId,
            }
            const res = await this.OfficeModuleAPI.office_po_select(obj);
            this.spinner.show();
            if (res.success) {
                this.POList = [];
                this.spinner.hide();
                this.POList = res.result;
                //console.log(this.POList);

            } else {
                this.spinner.hide();
                this.toast.warning(res.message);

            }

        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);

        }
    }


    async POIdchange(): Promise<void> {
        try {
            debugger
            const obj = {
                type: "24",
                BUDGET_ID: this.selectedPO
            }
            this.POSummaryList = [];
            this.excelData = [];
            this.reportTotal = {
                S_NO: "--",
                DISTRICT_NAME: "Total",
                INVOICEDATE: "--",
                INVOICENO: "--",
                INV_UNITS: 0,
                INV_PRICES: 0,
                P_ADV_PER: 0,
                P_DELIVERY_PER: 0,
                P_INSTALL_PER: 0,
                P_FINAL_PER: 0,
                A_ADV_PER: 0,
                A_DELIVERY_PER: 0,
                A_INSTALL_PER: 0,
                A_FINAL_PER: 0,
                PR_INV_PER: 0,
                PR_AP_ADV_PER: 0,
                P_UNITS: 0,
                P_PRICES: 0,

            }

            this.spinner.show();  //off_budget_details
            const res = await this.OfficeModuleAPI.office_Budget_Select(obj);
            if (res.success) {
                this.excelData = [];
                this.POSummaryList = [];
                this.reportTotal = {
                    S_NO: "--",
                    DISTRICT_NAME: "Total",
                    INVOICEDATE: "--",
                    INVOICENO: "--",
                    INV_UNITS: 0,
                    INV_PRICES: 0,
                    P_ADV_PER: 0,
                    P_DELIVERY_PER: 0,
                    P_INSTALL_PER: 0,
                    P_FINAL_PER: 0,
                    A_ADV_PER: 0,
                    A_DELIVERY_PER: 0,
                    A_INSTALL_PER: 0,
                    A_FINAL_PER: 0,
                    PR_INV_PER: 0,
                    PR_AP_ADV_PER: 0,
                    P_UNITS: 0,
                    P_PRICES: 0,

                }

                this.POSummaryList = res.result;
                for (let i = 0; i < this.POSummaryList.length; i++) {
                    this.reportTotal.INV_UNITS += parseInt(this.POSummaryList[i].INV_UNITS);
                    this.reportTotal.INV_PRICES += parseInt(this.POSummaryList[i].INV_PRICES);
                    this.reportTotal.P_ADV_PER += parseInt(this.POSummaryList[i].P_ADV_PER);
                    this.reportTotal.P_DELIVERY_PER += parseInt(this.POSummaryList[i].P_DELIVERY_PER);
                    this.reportTotal.P_INSTALL_PER += parseInt(this.POSummaryList[i].P_INSTALL_PER);
                    this.reportTotal.P_FINAL_PER += parseInt(this.POSummaryList[i].P_FINAL_PER);
                    this.reportTotal.A_ADV_PER += parseInt(this.POSummaryList[i].A_ADV_PER);
                    this.reportTotal.A_DELIVERY_PER += parseInt(this.POSummaryList[i].A_DELIVERY_PER);
                    this.reportTotal.A_INSTALL_PER += parseInt(this.POSummaryList[i].A_INSTALL_PER);
                    this.reportTotal.A_FINAL_PER += parseInt(this.POSummaryList[i].A_FINAL_PER);
                    this.reportTotal.PR_INV_PER += parseInt(this.POSummaryList[i].PR_INV_PER);
                    this.reportTotal.PR_AP_ADV_PER += parseInt(this.POSummaryList[i].PR_AP_ADV_PER);
                    this.reportTotal.P_UNITS += parseInt(this.POSummaryList[i].P_UNITS);
                    this.reportTotal.P_PRICES += parseInt(this.POSummaryList[i].P_PRICES);


                    let singleRow = {
                        S_NO: i + 1,
                        DISTRICT_NAME: this.POSummaryList[i].DISTRICTNAME,
                        INVOICEDATE: this.POSummaryList[i].INVOICEDATE,
                        INVOICENO: this.POSummaryList[i].INVOICENO,
                        INV_UNITS: this.POSummaryList[i].INV_UNITS,
                        INV_PRICES: this.POSummaryList[i].INV_PRICES,
                        P_ADV_PER: this.POSummaryList[i].P_ADV_PER,
                        P_DELIVERY_PER: this.POSummaryList[i].P_DELIVERY_PER,
                        P_INSTALL_PER: this.POSummaryList[i].P_INSTALL_PER,
                        P_FINAL_PER: this.POSummaryList[i].P_FINAL_PER,
                        A_ADV_PER: this.POSummaryList[i].A_ADV_PER,
                        A_DELIVERY_PER: this.POSummaryList[i].A_DELIVERY_PER,
                        A_INSTALL_PER: this.POSummaryList[i].A_INSTALL_PER,
                        A_FINAL_PER: this.POSummaryList[i].A_FINAL_PER,
                        PR_INV_PER: this.POSummaryList[i].PR_INV_PER,
                        PR_AP_ADV_PER: this.POSummaryList[i].PR_AP_ADV_PER,
                        P_UNITS: this.POSummaryList[i].P_UNITS,
                        P_PRICES: this.POSummaryList[i].P_PRICES,


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
            'PO Wise Percentages Report',
            true
        );
    }


}
