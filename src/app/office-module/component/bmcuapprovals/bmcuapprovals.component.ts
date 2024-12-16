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
    selector: 'app-bmcuapprovals',
    templateUrl: './bmcuapprovals.component.html',
    styleUrls: ['./bmcuapprovals.component.css']
})
export class BMCUApprovalsComponent implements OnInit {
    GridList: any[] = [];
    DistrictList: any = [];
    MandalList: any = [];
    BMCUList: any = [];
    InvoiceList: any = [];
    Ditsrictid: any;
    Mandalid: any;
    BMCUid: any;
    Invoiceid: any;
    Remarks: any;
    constructor(private spinner: NgxSpinnerService,
        private utils: UtilsService,
        private router: Router,
        private toast: ToasterService,
        private session: SessionService,
        private OfficeModuleAPI: OfficeserviceService,
    ) { }

    // @ViewChild(DataTableDirective, { static: false })
    // dtElement!: DataTableDirective;
    // dtOptions: DataTables.Settings = this.utils.dataTableOptions();
    // dtTrigger: Subject<any> = new Subject();

    ngOnInit(): void {
        if (this.session.uniqueId != "" && this.session.desigId != "") {
            this.LoadDistrict();
        }
        else {
            this.router.navigate(['/shared/UnAuthorized']);
        }
    }

    async LoadDistrict(): Promise<void> {
        try {
            debugger;
            this.GridList = [];
            this.DistrictList = [];
            const obj = {
                type: "2",
            }
            this.spinner.show();
            const res = await this.OfficeModuleAPI.DistrictSelect(obj);
            if (res.success) {
                this.spinner.hide();
                this.DistrictList = res.result;
                //console.log(this.DistrictList);

            }
            else {
                this.spinner.hide();
                this.toast.warning(res.message);

            }
        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);

        }

    }

    async LoadMandal(): Promise<void> {
        try {
            debugger;
            this.GridList = [];
            this.MandalList = [];
            const obj = {
                type: "3",
                DISTRICT_ID: this.Ditsrictid
            }
            this.spinner.show();
            const res = await this.OfficeModuleAPI.MandalSelect(obj);
            if (res.success) {
                this.spinner.hide();
                this.MandalList = res.result;
                //console.log(this.MandalList);

            }
            else {
                this.spinner.hide();
                this.toast.warning(res.message);

            }
        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);

        }

    }

    async LoadBMCU(): Promise<void> {
        try {
            this.GridList = [];
            this.BMCUList = [];
            const obj = {
                type: "4",
                DISTRICT_ID: this.Ditsrictid,
                MANDAL_ID: this.Mandalid
            }
            this.spinner.show();
            const res = await this.OfficeModuleAPI.BMCUSelect(obj);
            if (res.success) {
                this.spinner.hide();
                this.BMCUList = res.result;
                //console.log(this.BMCUList);

            }
            else {
                this.spinner.hide();
                this.toast.warning(res.message);

            }
        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);

        }

    }

    async LoadInvoice(): Promise<void> {
        try {
            this.GridList = [];
            this.InvoiceList = [];
            const obj = {
                type: "5",
                DISTRICT_ID: this.Ditsrictid,
                MANDAL_ID: this.Mandalid,
                BMCU_ID: this.BMCUid
            }
            this.spinner.show();
            const res = await this.OfficeModuleAPI.InvoiceSelect(obj);
            if (res.success) {
                this.spinner.hide();
                this.InvoiceList = res.result;
                //console.log(this.InvoiceList);

            }
            else {
                this.spinner.hide();
                this.toast.warning(res.message);

            }
        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);

        }

    }

    async ApprovalSubData(): Promise<void> {
        try {

            const obj = {
                type: "1",
                DISTRICT_ID: this.Ditsrictid,
                MANDAL_ID: this.Mandalid,
                BMCU_ID: this.BMCUid,
                INVID: this.Invoiceid,
                RESULT_STATUS: "1",
                UNIQUEID: this.session.uniqueId,
                ROLE: this.session.desigId,
                INSERTEDBY: this.session.userName,
            }
            this.spinner.show();
            const res = await this.OfficeModuleAPI.ApprovalSub(obj);
            if (res.success) {
                this.spinner.hide();
                this.toast.info("Approved Successfully");
            }
            else {
                this.spinner.hide();
                this.toast.warning("Failed Approved");

            }

        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);

        }

    }
    async RejectSubData(): Promise<void> {
        try {
            if (this.utils.DataValidationNullorEmptyorUndefined(this.Remarks)) {
                this.toast.warning("Please Enter Remarks");
                return;
            }
            else {
                const obj = {
                    type: "1",
                    DISTRICT_ID: this.Ditsrictid,
                    MANDAL_ID: this.Mandalid,
                    BMCU_ID: this.BMCUid,
                    INVID: this.Invoiceid,
                    RESULT_STATUS: "0",
                    REMARKS: this.Remarks,
                    UNIQUEID: this.session.uniqueId,
                    ROLE: this.session.desigId,
                    INSERTEDBY: this.session.userName,
                }
                this.spinner.show();
                const res = await this.OfficeModuleAPI.ApprovalSub(obj);
                if (res.success) {
                    this.spinner.hide();
                    this.toast.info("Reject Successfully");
                    this.Remarks = ''
                }
                else {
                    this.spinner.hide();
                    this.toast.warning("Failed Reject");
                    this.Remarks = ''

                }
            }
        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);

        }

    }

    async LoadData(): Promise<void> {
        try {

            this.GridList = [];
            const obj = {
                type: "6",
                DISTRICT_ID: this.Ditsrictid,
                MANDAL_ID: this.Mandalid,
                BMCU_ID: this.BMCUid,
                INVID: this.Invoiceid,
            }
            this.spinner.show();
            const res = await this.OfficeModuleAPI.DistrictSelect(obj);
            if (res.success) {
                this.spinner.hide();
                this.GridList = res.result;
                //console.log(this.GridList);

            }
            else {
                this.spinner.hide();
                this.toast.warning(res.message);

            }
        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);

        }

    }

    async btnViewPhoto(photo): Promise<void> {
        try {
            debugger
            this.spinner.show();
            const response = await this.utils.DMSFileDownload(photo);
            this.spinner.hide();
            if (response.success) {
                await this.utils.viewImage(response.result);
            } else {
                this.toast.info(response.message);
            }
        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
    }
    // ngOnDestroy(): void {
    //     // Do not forget to unsubscribe the event
    //     this.dtTrigger.unsubscribe();
    // }
    // ngAfterViewInit(): void {
    //     this.dtTrigger.next();
    // }
    // rerender(): void {
    //     this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
    //         dtInstance.clear().draw(); // Add this  line to clear all rows..
    //         // Destroy the table first
    //         dtInstance.destroy();
    //         // Call the dtTrigger to rerender again
    //         this.dtTrigger.next();
    //     });
    // }
}
