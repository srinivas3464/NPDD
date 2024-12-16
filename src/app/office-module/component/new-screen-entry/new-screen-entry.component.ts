import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { OfficeserviceService } from '../../services/officeservice.service';

@Component({
    selector: 'app-new-screen-entry',
    templateUrl: './new-screen-entry.component.html',
    styleUrls: ['./new-screen-entry.component.css']
})
export class NewScreenEntryComponent implements OnInit {


    ComponentName: any;
    ScreenName: any;
    DisplayName: any;
    ScreenType = '';
    DataList: any = [];

    constructor
        (
            private toast: ToasterService,
            private utils: UtilsService,
            private session: SessionService,
            private spinner: NgxSpinnerService,
            private router: Router,
            private OfficeModuleAPI: OfficeserviceService
        ) { }

    ngOnInit(): void {
        if (this.session.uniqueId != "" && this.session.desigId != "") {
this.LoadReport();
        }
        else
        {
          this.router.navigate(['/shared/UnAuthorized']);
        }
    }

    async ScreenAdd(): Promise<void> {

        try {
            if (this.utils.DataValidationNullorEmptyorUndefined(this.ComponentName)) {

                this.toast.info("Please Enter Component Name");
                return;
            }
            if (this.utils.DataValidationNullorEmptyorUndefined(this.ScreenName)) {

                this.toast.info("Please Enter Screen Name");
                return;
            }
            if (this.utils.DataValidationNullorEmptyorUndefined(this.DisplayName)) {

                this.toast.info("Please Enter Display Name");
                return;
            }
            if (this.utils.DataValidationNullorEmptyorUndefined(this.ScreenType)) {

                this.toast.info("Please Select Screen Type");
                return;
            }
            else {
                const obj = {
                    type: "8",
                    INPUT_01: this.ComponentName,
                    INPUT_02: this.ScreenName,
                    INPUT_03: this.DisplayName,
                    BUDGET_AMOUNT: this.ScreenType,//screen Id store
                    INSERTEDBY: this.session.userName,

                }
                this.spinner.show();
                const res = await this.OfficeModuleAPI.office_Budget_Sub(obj)
                if (res.result) {
                    this.spinner.hide();
                    this.toast.info("Screen Details Submitted Successfully");
                    this.clear();
                    this.LoadReport();
                    return;
                }
                else {
                    this.spinner.hide();
                    this.toast.info("Screen Details Submitted  Failed");
                    return;
                }
            }


        } catch (error) {

            this.spinner.hide();
            this.utils.catchResponse(error);
            return;
        }

    }
    clear() {
        this.ComponentName = ''
        this.ScreenName = ''
        this.DisplayName = ''
        this.ScreenType = ''
    }
    async LoadReport(): Promise<void> {
        try {debugger;
            const obj = {
                type: "9"
            }
            this.spinner.show();
            const res = await this.OfficeModuleAPI.office_Budget_Select(obj)
            if (res.success) {
               
                this.DataList = res.result;
                this.spinner.hide();
                 
            }
            else {

                this.spinner.hide();
                this.toast.warning(res.message);
                return;

            }

        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
            return;

        }

    }

}
