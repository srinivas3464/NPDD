
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
    selector: 'app-firm-details-reports',
    templateUrl: './firm-details-reports.component.html',
    styleUrls: ['./firm-details-reports.component.css']
})
export class FirmDetailsReportsComponent implements OnInit, OnDestroy, AfterViewInit {

    Podetailslist: []; purchasedetailsList: [];
    excelData: any[] = [];
    FIRMID: any; formdata = []; firmdetailsList = []; 
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
                type: "7",
                UNIQUEID: this.session.uniqueId,
                ROLE: this.session.desigId,
                INSERTEDBY: this.session.userName,
                FORMID: this.FIRMID
            }; this.spinner.show();
            const res = await this.OfficeModuleAPI.office_po_select(reqdistrict);
            this.spinner.hide();
            if (res.success) {
                this.excelData = [];
                this.firmdetailsList = res.result;

                for (var i = 0; i < this.firmdetailsList.length; i++) {
                    let singleRow =
                    {
                        S_NO: i + 1,
                        FIRM_ID: this.firmdetailsList[i].FIRMID,
                        FIRM_NAME: this.firmdetailsList[i].FIRMNAME,
                        FIRM_ADDRESS: this.firmdetailsList[i].FADDRESS1,
                        REGISTRATION_NUMBER: this.firmdetailsList[i].REGNO,
                        PAN_NUMBER: this.firmdetailsList[i].PAN,
                        GST_NUMBER: this.firmdetailsList[i].GST,
                        BANK_NAME: this.firmdetailsList[i].BANKNAME,
                        BANK_IFSC_CODE: this.firmdetailsList[i].BANKIFSC,
                        BANK_ACCOUNTT_NUMBER: this.firmdetailsList[i].BANKACTNO,
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
            'Firm Details Report',
            true
        );
    }

}
