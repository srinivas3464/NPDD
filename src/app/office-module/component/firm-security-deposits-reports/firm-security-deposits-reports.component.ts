import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { OfficeserviceService } from '../../services/officeservice.service';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';

@Component({
    selector: 'app-firm-security-deposits-reports',
    templateUrl: './firm-security-deposits-reports.component.html',
    styleUrls: ['./firm-security-deposits-reports.component.css']
})
export class FirmSecurityDepositsReportsComponent implements OnInit, OnDestroy, AfterViewInit {

    Podetailslist: []; purchasedetailsList: [];
    FIRMID: any; formdata = []; firmdetailsList = [];
    excelData: any[] = [];
    @ViewChild(DataTableDirective, { static: false })
    dtElement: DataTableDirective;
    dtOptions: DataTables.Settings = this.utils.dataTableOptions();
    dtTrigger: Subject<any> = new Subject();
    pendtTrigger: Subject<any> = new Subject();

    constructor(private toast: ToasterService,
        private utils: UtilsService,
        private session: SessionService,
        private OfficeModuleAPI: OfficeserviceService,
        private spinner: NgxSpinnerService,
        private router: Router
    ) { }

    ngOnInit(): void {
        if (this.session.uniqueId != "" && this.session.desigId != "") {
            this.podetails();
        }
        else {
            this.router.navigate(['/shared/UnAuthorized']);
        }
    }

    async podetails(): Promise<void> {
        try {
            debugger;
            const reqdistrict = {
                type: "2",
                UNIQUEID: this.session.uniqueId,
                ROLE: this.session.desigId,
                INSERTEDBY: this.session.userName
            };
            this.spinner.show();
            const res = await this.OfficeModuleAPI.office_po_select(reqdistrict);
            this.spinner.hide();
            if (res.success) {
                this.formdata = res.result;
            } else {
                this.toast.info(res.message);
            }
            this.spinner.hide();
        }
        catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
    }

    async FIRMBYFIRMID(): Promise<void> {

        try {
            if (this.utils.isEmpty(this.FIRMID)) {
                this.toast.warning('Please select FIRM');
                return;
            }
            this.excelData = [];
            const reqdistrict = {
                type: "2",
                FIRMID: this.FIRMID
            };
            this.spinner.show();
            this.firmdetailsList =[];
            const res = await this.OfficeModuleAPI.officeSecuDepositSub(reqdistrict);
            this.spinner.hide();
            if (res.success) { this.firmdetailsList =[];
                this.excelData = [];
                this.firmdetailsList = res.result;
                for (var i = 0; i < this.firmdetailsList.length; i++) {
                    let singleRow =
                    {
                        S_NO: i + 1,
                        DEPOSITE_DATE: this.firmdetailsList[i].SDDATE,
                        TYPE: this.firmdetailsList[i].CTYPE,
                        TRANSACTION_NO: this.firmdetailsList[i].TXNCHQNO,
                        TRANSACTION_DATE: this.firmdetailsList[i].TXNCHQDATE,
                        AMOUNT: this.firmdetailsList[i].DEPTAMOUNT,

                    }
                    this.excelData.push(singleRow);
                }

                this.rerender();
            } else {this.firmdetailsList =[];
                this.toast.info("No Data Found");
            }
            this.spinner.hide();
        } catch (error) {
            this.spinner.hide();
            // this.utils.catchResponse(error);
            this.toast.info("No Data Found");
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
            'Firm Security Deposite Report',
            true
        );
    }

}
