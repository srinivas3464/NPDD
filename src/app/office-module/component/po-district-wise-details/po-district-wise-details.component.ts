import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { OfficeserviceService } from '../../services/officeservice.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-po-district-wise-details',
  templateUrl: './po-district-wise-details.component.html',
  styleUrls: ['./po-district-wise-details.component.css']
})
export class PoDistrictWiseDetailsComponent implements OnInit {
// dtOptions: DataTables.Settings = {};
    // dtTrigger: Subject<any> = new Subject();


    Balanceqty:any;Balanceamount:any; 

    POList: [];
    StateList: [];
    GridData: any[] = []; 
    Component: any;
    Firmname: any;
    Qty: any;
    Amount: any;
    DitsData: [];
    InputAmount: any;
    InputQuantity: any;
    Dist: any;
    State: any;
    selectedPO: any;
    isElementsHide: boolean = false;
    Totalobj = {
        AMOUNT: 0,
        QUANTITY: 0
    }



    constructor(private toast: ToasterService,
        private utils: UtilsService,
        private session: SessionService,
        private OfficeModuleAPI: OfficeserviceService,
        private spinner: NgxSpinnerService) { }


    ngOnInit(): void {debugger;
        this.PoGet();
        this.StateGet();

    }
      


    async PoGet(): Promise<void> {
        try {
            const obj = {
                "type": "23",
                UNIQUEID:this.session.uniqueId,ROLE:this.session.desigId,
            }
            const res = await this.OfficeModuleAPI.office_po_select(obj);
            this.spinner.hide();
            if (res.success) {
                this.POList = res.result;
                return;
            } else {
                //this.toast.warning(res.message);
                return;
            }
        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
    }

    async StateGet(): Promise<void> {
        try {

            const obj = {
                "type": "25",
                UNIQUEID:this.session.uniqueId,ROLE:this.session.desigId,
            }
            const res = await this.OfficeModuleAPI.office_po_select(obj);
            this.spinner.hide();
            if (res.success) {
                this.StateList = res.result;

                return;
            } else {
                //this.toast.warning(res.message);
                return;
            }

        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);

        }
    }

    async POIdchange(): Promise<void> {

        try {
            this.Totalobj.QUANTITY = 0;
            this.Totalobj.AMOUNT = 0;
            const obj = {
                type: "24",  
                ID: this.selectedPO.PMID
            }
            const res = await this.OfficeModuleAPI.office_po_select(obj);
            this.spinner.hide();
            if (res.success) { 

                this.GridData = res.result;
                this.Component = res.result[0].COMPNAME;
                this.Firmname = res.result[0].FIRMNAME;
                this.Qty = res.result[0].UNITS;
                this.Amount = res.result[0].PRICES;
this.Balanceqty= (this.Qty-res.result[0].BQTY);
this.Balanceamount=(res.result[0].PRICES-res.result[0].BAMT);
                for (let i = 0; i < this.GridData.length; i++) {
                    this.Totalobj.QUANTITY +=
                        parseInt(this.GridData[i].QUANTITY);

                    this.Totalobj.AMOUNT +=
                        parseInt(this.GridData[i].AMOUNT);

                } 
                this.isElementsHide = true

                // console.log(this.GridData);
                return;
            } else {
                //this.toast.warning(res.message);
                return;
            }

        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);

        }
    }

    async   Calamount(): Promise<void> {
        try {

            if(parseInt(this.InputQuantity)>0) {                 
this.InputAmount=(Math.round(parseInt(this.Amount)/parseInt(this.Qty))*parseInt(this.InputQuantity)).toFixed(0);
            }            
            else this.InputAmount=0;  
            
        }
        catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
        return;
    }

    async DistGet(): Promise<void> {

        try {
            debugger;
            const obj = {

                type: 26,
                ID: this.selectedPO.PMID,
                POID: this.State

            }
            console.log(obj);
            const res = await this.OfficeModuleAPI.office_po_select(obj);
            this.spinner.hide();
            if (res.success) {
                this.DitsData = res.result;
                return;
            } else {
                //this.toast.warning(res.message);
                return;
            }
        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
    }



    async DataSub(): Promise<void> {

        try {

            if( parseInt(this.InputQuantity)>   parseInt(this.Balanceqty) )
            { this.toast.warning('You have Enter Below Puchase Order Quantity');
                return;
            }

            if( parseInt(this.InputAmount)>   parseInt(this.Balanceamount) )
            { this.toast.warning('You have Enter Below Puchase Order Amount');
                return;
            }


            if (this.utils.DataValidationNullorEmptyorUndefined(this.selectedPO)) {
                this.toast.warning('Please Select PO');
                return;
            }
            if (this.utils.DataValidationNullorEmptyorUndefined(this.State)) {
                this.toast.warning('Please Select State');
                return;
            }
            if (this.utils.DataValidationNullorEmptyorUndefined(this.Dist)) {
                this.toast.warning('Please Select District');
                return;
            }
            if (this.utils.DataValidationNullorEmptyorUndefined(this.InputQuantity)) {
                this.toast.warning('Please Enter Quantity');
                return;
            }
            else{debugger;
                 this.Totalobj.QUANTITY+= parseInt(this.InputQuantity);
                 if(  parseInt(this.Qty) < this.Totalobj.QUANTITY) { this.toast.warning('Please Enter Below PO Quantity'); return;}
            }
            if (this.utils.DataValidationNullorEmptyorUndefined(this.InputAmount)) {
                this.toast.warning('Please Enter Amount');
                return;
            }
           



            else {
                const obj = {
                    type: '4',
                    id: this.selectedPO.PMID,
                    PONUMBER: this.selectedPO.PONUMBER,
                    POID: this.State,
                    DISTRICTID: this.Dist,
                    UNITS: this.InputQuantity,
                    PRICES: this.InputAmount,
                    UNIQUEID: this.session.uniqueId,
                    ROLE: this.session.desigId,
                    INSERTEDBY: this.session.userName,
                    PODATE:this.session.getTodayDateString(),
                }
                //console.log(obj);
                const res = await this.OfficeModuleAPI.officePomasterSub(obj);
                this.spinner.hide();
                if (res.success) {
                    this.State = ''
                    this.InputQuantity = ''
                    this.InputAmount = ''
                    this.DitsData = [];
                    this.toast.success(res.message);
                    // this.StateGet();
                    // this.DistGet();
                    this.POIdchange();
                    return;
                } else {
                    this.toast.warning(res.message);
                    return;
                }

            }


        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
    }


    keyPressNumbers(event: any) {
        var charCode = (event.which) ? event.which : event.keyCode;
        // Only Numbers 0-9
        if ((charCode < 48 || charCode > 57)) {
            event.preventDefault();
            return false;
        } else {
            return true;
        }
    }
}


