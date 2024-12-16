
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { OfficeserviceService } from '../../services/officeservice.service';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';


@Component({
    selector: 'app-podistrct-summary',
    templateUrl: './podistrct-summary.component.html',
    styleUrls: ['./podistrct-summary.component.css']
})
export class PODistrctSummaryComponent implements OnInit {

    POList: any[] = [];
    POSummaryList: any[] = [];
    selectedPO: any;
    excelData: any[] = [];
    reportTotal = {
        S_NO: "--",
        DISTRICT_NAME: "Total",
        PO_ACTUAL_QUANTITY: 0,
        PRESENT_QUANTITY: 0,
        ADDED_QUANTITY: 0,
        MINUS_QUANTITY: 0,
        INVENTORY_QUANTITY: 0,
        BALANCE_QUANTITY: 0

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
                type: "20",
                BUDGET_ID: this.selectedPO
            }
            this.POSummaryList = [];
            this.excelData = [];
            this.reportTotal = {
                S_NO: "--",
                DISTRICT_NAME: "Total",
                PO_ACTUAL_QUANTITY: 0,
                PRESENT_QUANTITY: 0,
                ADDED_QUANTITY: 0,
                MINUS_QUANTITY: 0,
                INVENTORY_QUANTITY: 0,
                BALANCE_QUANTITY: 0

            }
            this.spinner.show();       //off_budget_details
            const res = await this.OfficeModuleAPI.office_Budget_Select(obj);
            if (res.success) {
                this.excelData = [];
                this.POSummaryList = [];
                this.reportTotal = {
                    S_NO: "--",
                    DISTRICT_NAME: "Total",
                    PO_ACTUAL_QUANTITY: 0,
                    PRESENT_QUANTITY: 0,
                    ADDED_QUANTITY: 0,
                    MINUS_QUANTITY: 0,
                    INVENTORY_QUANTITY: 0,
                    BALANCE_QUANTITY: 0

                }
                this.POSummaryList = res.result;
                for (let i = 0; i < this.POSummaryList.length; i++) {

                    this.reportTotal.PO_ACTUAL_QUANTITY += parseInt(this.POSummaryList[i].INITIAL_QUANTITY);
                    this.reportTotal.PRESENT_QUANTITY += parseInt(this.POSummaryList[i].QUANTITY);
                    this.reportTotal.ADDED_QUANTITY += parseInt(this.POSummaryList[i].ADDED_QTY);
                    this.reportTotal.MINUS_QUANTITY += parseInt(this.POSummaryList[i].MINUS_QTY);
                    this.reportTotal.INVENTORY_QUANTITY += parseInt(this.POSummaryList[i].INV_QTY);
                    this.reportTotal.BALANCE_QUANTITY += parseInt(this.POSummaryList[i].BAL_QTY);

                    let singleRow = {
                        S_NO: i + 1,
                        DISTRICT_NAME: this.POSummaryList[i].DISTRICTNAME,
                        PO_ACTUAL_QUANTITY: this.POSummaryList[i].INITIAL_QUANTITY,
                        PRESENT_QUANTITY: this.POSummaryList[i].QUANTITY,
                        ADDED_QUANTITY: this.POSummaryList[i].ADDED_QTY,
                        MINUS_QUANTITY: this.POSummaryList[i].MINUS_QTY,
                        INVENTORY_QUANTITY: this.POSummaryList[i].INV_QTY,
                        BALANCE_QUANTITY: this.POSummaryList[i].BAL_QTY

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
            'PO District Summary Report',
            true
        );
    }

}