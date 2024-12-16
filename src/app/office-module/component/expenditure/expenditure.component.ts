import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { OfficeserviceService } from '../../services/officeservice.service';

@Component({
    selector: 'app-expenditure',
    templateUrl: './expenditure.component.html',
    styleUrls: ['./expenditure.component.css']
})
export class ExpenditureComponent implements OnInit {
    FinancialYears: any;
    componentListdata: any[] = [];
    DataList: any;
    isButton: boolean = false;
    Status: any;tot:any; 
    constructor(
        private toast: ToasterService,
        private utils: UtilsService,
        private session: SessionService,
        private spinner: NgxSpinnerService,
        private router: Router,
        private OfficeModuleAPI: OfficeserviceService,) { }

    ngOnInit(): void {
        if (this.session.uniqueId != "" && this.session.desigId != "") {
            this.Financialyeardetails();
        }
        else {
            this.router.navigate(['/shared/UnAuthorized']);
        }
    }

    async Financialyeardetails(): Promise<void> {
        try {
            debugger;
            this.componentListdata = [];
            const reqdistrict = {
                type: "38",
                id:"24"  //only naminations
            }
            const res = await this.OfficeModuleAPI.office_po_select(reqdistrict);
            if (res.success) {
                this.componentListdata = res.result;
                // console.log(this.componentListdata);
            } else {
                this.toast.info(res.message);
            }
            this.spinner.hide();
        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
    }


    async LoadReport(): Promise<void> {
        try {
            this.DataList = [];
            const obj = {
                type: "10",
                FROM_FINANCIAL_YEAR: this.FinancialYears
            }
            this.spinner.show();
            const res = await this.OfficeModuleAPI.office_Budget_Select(obj)
            if (res.success) {
                this.spinner.hide();
                this.DataList = res.result;
                this.isButton = true;
                //console.log(this.DataList);
                return;
            }
            else {
                this.isButton = false;
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
    async btnSubmitDetails(): Promise<void> {

        try { debugger;
            this.Status = 0;
            for (let i = 0; i < this.DataList.length; i++) {

                if (this.DataList[i].PRICE != null && this.DataList[i].QUANTITY != null) {
                    this.Status = 1;
                }
            }
            if (this.Status == 1) {
                debugger;
                let count = 0;
                for (let i = 0; i < this.DataList.length; i++) {

                    const obj = {
                        type: "13",
                        FROM_FINANCIAL_YEAR: this.FinancialYears,
                        COMPONENT_ID: this.DataList[i].COMPONENT_ID,
                        SUB_COMPONENT_ID: this.DataList[i].SUB_COMPONENT_ID,
                        BUDGET_UNITS: this.DataList[i].BUDGET_UNITS,
                        BUDGET_AMOUNT: this.DataList[i].BUDGET_AMOUNT,
                        INPUT_01: this.DataList[i].BUDGET_TOTAL,   //parseInt(this.DataList[i].BUDGET_UNITS) * parseInt(this.DataList[i].BUDGET_AMOUNT),
                        INPUT_02: this.DataList[i].PRICE,
                        INSERTEDBY: this.session.userName,
                        ROLE: this.session.desigId,
                        UNIQUEID: this.session.uniqueId,
                        BUDGET_ID: this.DataList[i].QUANTITY,
                        ProceedingDetails: parseInt(this.DataList[i].QUANTITY) * parseInt(this.DataList[i].PRICE)

                    }
                    const res = await this.OfficeModuleAPI.office_Budget_Sub(obj);
                    if (res.success) {
                        count = 1;
                    } else {
                        count = 0;
                    }
                }
                if (count == 1) {
                    this.toast.info('Data Submitted Successfully');
                    this.DataList = [];
                    this.isButton = false;
                    this.FinancialYears = undefined;
                    return;
                }
                else {
                    this.toast.info('Data Submitted Failed!');
                    this.DataList = [];
                    this.isButton = false;
                    return;
                }
            }
            else {
                this.toast.warning("Please Enter Price and Quantity")
                return;
            }
        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
            return;
        }

    }

    decimalFilter(event: any) {
        
        const reg = /^-?\d*(\.\d{0,2})?$/;
        let input = event.target.value + String.fromCharCode(event.charCode);

        if (!reg.test(input)) {
            event.preventDefault();
        }
    }

    updateResult() {
        debugger;
        for (let i = 0; i < this.DataList.length; i++) {
            const quantity = this.parseNumber(this.DataList[i].QUANTITY);
            const price = this.parseNumber(this.DataList[i].PRICE);
            const total = quantity * price;
            this.DataList[i].TOTAL_PRICE = total;

        }
    }

    parseNumber(value: string): number {
        const parsedValue = parseFloat(value.trim());
        return isNaN(parsedValue) ? 0 : parsedValue;
    }


}
