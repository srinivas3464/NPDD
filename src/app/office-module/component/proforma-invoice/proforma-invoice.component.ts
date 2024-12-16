import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { OfficeserviceService } from '../../services/officeservice.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-proforma-invoice',
  templateUrl: './proforma-invoice.component.html',
  styleUrls: ['./proforma-invoice.component.css']
})
export class ProformaInvoiceComponent implements OnInit { 

  
Podetailslist = []; PMID: any; invoicedate: any; invoiceNo: any; FIRMID: any; personList: []; comments: '';
dtOptions: DataTables.Settings = this.utils.dataTableOptions(); Tax: any; purchasedetailsList: []; invtbl = false; Tax1 = ''; Tax2 = ''; Tax3 = '';
faddress1: any; faddress2: any; faddress3: any; paddress1: any; paddress2: any; paddress3: any; FIRMNAME: any; total: any; amt: any; totalamt: any; totalamt1: any;
Invoice_path = ''; payname: any; payamt: any; paymodesist = []; QUANTITY: any; PRICE: any; tot: any;
ADV_PER: any; DELIVERY_PER: any; INSTALL_PER: any; FINAL_PER: any; TOTAL_PER: any;
ADV_PER_amt: any; DELIVERY_PER_amt: any; INSTALL_PER_amt: any; FINAL_PER_amt: any; TOTAL_PER_amt: any;
ADV_STATUS: any;
DELIVERY_STATUS: any;
INSTALL_STATUS: any;
FINAL_STATUS: any;
GridData: any[] = []; GridData1: any[] = [];
SLNO: any;
PAYMODEID1 = true; PAYMODEID2 = false; PAYMODEID3 = false; PAYMODEID: any;
CALIBRATIONPATH = null; WAYBILLPATH = null; BANKGUARANTEEPATH = null; STAMPRECEIPTPATH = null; INVOICEPATH = null;
dtTrigger: Subject<any> = new Subject();
pendtTrigger: Subject<any> = new Subject();

Totalobj = {
    AMOUNT: 0,
    QUANTITY: 0
}
constructor(private toast: ToasterService,
    private utils: UtilsService,
    private session: SessionService,
    private OfficeModuleAPI: OfficeserviceService,
    private spinner: NgxSpinnerService, private router: Router) { }

ngOnInit(): void {debugger;
    if (this.session.uniqueId != "" && this.session.desigId != "") {
        this.invtbl = false; this.totalamt = 0;
        this.PAYMODEID = undefined;
        this.invoicedate = this.session.getTodayDateString();
        this.invoiceNo = '';
        this.podetails();
    } else {
        this.router.navigate(['/shared/UnAuthorized']);
    }

}

async podetails(): Promise<void> {
    try {
        debugger;
        const req = {
            type: "20",
            UNIQUEID: this.session.uniqueId,
            ROLE: this.session.desigId,
            INSERTEDBY: this.session.userName,
        };
        this.spinner.show();
        const res = await this.OfficeModuleAPI.tenderdetailsSelect(req);
        this.spinner.hide();
        if (res.success) {
            this.Podetailslist = res.result;
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




async POIdchange(): Promise<void> {

    try {
        this.Totalobj.QUANTITY = 0;
        this.Totalobj.AMOUNT = 0;
        const obj = {
            type: "24",
            ID: this.PMID, 
            UNIQUEID:this.session.uniqueId,
        }
        const res = await this.OfficeModuleAPI.office_po_select(obj);
        this.spinner.hide();
        if (res.success) {
            debugger;
            this.GridData = res.result;
            return;
        } else {
            return;
        }

    } catch (error) {
        this.spinner.hide();
        this.utils.catchResponse(error);

    }
}

async onALLDistrictChange(): Promise<void> {
    try {
        this.tot = 0;
        this.Totalobj.QUANTITY = 0;
        this.Totalobj.AMOUNT = 0;
        const obj = {
            type: "48",
            ID: this.PMID,
            UNIQUEID:this.session.uniqueId,
        }
        const res = await this.OfficeModuleAPI.office_po_select(obj);
        this.spinner.hide();
        if (res.success) {
            debugger;


            this.GridData1 = res.result;//[this.SLNO]; 


            for (let i = 0; i < this.GridData1.length; i++) {
                this.Totalobj.QUANTITY +=
                    parseInt(this.GridData1[i].QUANTITY);

                this.Totalobj.AMOUNT +=
                    parseInt(this.GridData1[i].AMOUNT);

            }
            this.PRICE=this.GridData1[0].ADV_AMOUNT;
            this.ADV_PER_amt=this.GridData1[0].ADV_AMOUNT;
            return;
        }
        else {
            this.GridData1 = [];
            return;
        }
    } catch (error) {

    }
}


async onDistrictwiseqtyChange(): Promise<void> {
    try {
        this.tot = 0;
        this.Totalobj.QUANTITY = 0;
        this.Totalobj.AMOUNT = 0;
        const obj = {
            type: "29",
            ID: this.SLNO,
            UNIQUEID:this.session.uniqueId,
        }
        const res = await this.OfficeModuleAPI.office_po_select(obj);
        this.spinner.hide();
        if (res.success) {
            debugger;


            this.GridData1 = res.result;//[this.SLNO]; 


            for (let i = 0; i < this.GridData1.length; i++) {
                this.Totalobj.QUANTITY +=
                    parseInt(this.GridData1[i].QUANTITY);

                this.Totalobj.AMOUNT +=
                    parseInt(this.GridData1[i].AMOUNT);

            }
            return;
        }
        else {
            this.GridData1 = [];
            return;
        }
    } catch (error) {

    }
}

async paymodes(): Promise<void> {
    try {
        if (this.utils.isEmpty(this.PMID)) {
            this.toast.warning('Please Enter PONUMBER');
            return;
        }debugger;
        const req = {   
            type: "7",
            id: this.PMID,
            UNIQUEID:this.session.uniqueId,
        };
        this.spinner.show();
        const res = await this.OfficeModuleAPI.tenderdetailsSelect(req);
        this.spinner.hide();
        if (res.success) {
            this.paymodesist = res.result;
            this.PAYMODEID = undefined;
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
strcompid: any; replacestr: any;
onSelectionChange(id, qty, amt, totals): void {

    // this.toast.info(id +"-----" + x);
    this.PRICE = amt;
    var q = qty; debugger;
    var per = parseFloat(q.replace('%', '')) / 100;
    this.QUANTITY = parseFloat(totals) * per;
    //   this.toast.info(id +"---"+ qty +"---" +amt+"---" +totals);
    this.tot = "0";
    this.ADV_PER_amt = 0; this.DELIVERY_PER_amt = 0; this.INSTALL_PER_amt = 0; this.FINAL_PER_amt = 0;
    this.ADV_PER = 0; this.DELIVERY_PER = 0; this.INSTALL_PER = 0; this.FINAL_PER = 0;

    this.ADV_STATUS = 0; this.DELIVERY_STATUS = 0; this.INSTALL_STATUS = 0; this.FINAL_STATUS = 0;


    this.PAYMODEID1 = true; this.PAYMODEID2 = false;//this.PAYMODEID3=false;
    var element = <HTMLInputElement>document.getElementById("rbtn1");
    if (element != null) {
        if (element.checked === true) {
            var element0 = <HTMLInputElement>document.getElementById("advamt");

            this.ADV_PER_amt = element0.value;
            this.PAYMODEID1 = true;
            var element00 = <HTMLInputElement>document.getElementById("ADV_PER");
            this.ADV_PER = element00.value; this.ADV_STATUS = 1;

        } else { this.PAYMODEID1 = true; this.ADV_PER_amt = 0; this.ADV_PER = 0; this.ADV_STATUS = 0; }
    } else { this.PAYMODEID1 = true; this.ADV_PER_amt = 0; this.ADV_PER = 0; this.ADV_STATUS = 0; }


    // var element2 = <HTMLInputElement>document.getElementById("rbtn2");
    // if (element2 != null) {
    //     if (element2.checked === true) {
    //         var element1 = <HTMLInputElement>document.getElementById("deleamt");

    //         this.DELIVERY_PER_amt = element1.value; this.PAYMODEID2 = true;

    //         var element11 = <HTMLInputElement>document.getElementById("DELIVERY_PER");
    //         this.DELIVERY_PER = element11.value; this.DELIVERY_STATUS = 1;

    //     } else { this.PAYMODEID2 = false; this.DELIVERY_PER_amt = 0; this.DELIVERY_PER = 0; this.DELIVERY_STATUS = 0; }
    // } else { this.PAYMODEID2 = false; this.DELIVERY_PER_amt = 0; this.DELIVERY_PER = 0; this.DELIVERY_STATUS = 0; }

    // var element3 = <HTMLInputElement>document.getElementById("rbtn3");
    // if (element3 != null) {
    //     if (element3.checked === true) {
    //         var element2 = <HTMLInputElement>document.getElementById("insamt");
    //         this.INSTALL_PER_amt = element2.value; this.PAYMODEID3 = true;

    //         var element22 = <HTMLInputElement>document.getElementById("INSTALL_PER");
    //         this.INSTALL_PER = element22.value; this.INSTALL_STATUS = 1;

    //     } else { this.PAYMODEID3 = false; this.INSTALL_PER_amt = 0; this.INSTALL_PER = 0; this.INSTALL_STATUS = 0; }
    // } else { this.PAYMODEID3 = false; this.INSTALL_PER_amt = 0; this.INSTALL_PER = 0; this.INSTALL_STATUS = 0; }


    // var element4 = <HTMLInputElement>document.getElementById("rbtn4");
    // if (element4 != null) {
    //     if (element4.checked === true) {
    //         var element3 = <HTMLInputElement>document.getElementById("finamt");

    //         this.FINAL_PER_amt = element3.value; this.PAYMODEID1 = true;

    //         var element33 = <HTMLInputElement>document.getElementById("FINAL_PER");
    //         this.FINAL_PER = element33.value; this.FINAL_STATUS = 1;

    //     } else { this.PAYMODEID1 = false; this.FINAL_PER_amt = 0; this.FINAL_PER = 0; this.FINAL_STATUS = 0; }
    // } else { this.PAYMODEID1 = false; this.FINAL_PER_amt = 0; this.FINAL_PER = 0; this.FINAL_STATUS = 0; }
debugger;
    this.PRICE = parseInt(this.ADV_PER_amt) ;//+ parseInt(this.DELIVERY_PER_amt) + parseInt(this.INSTALL_PER_amt) + parseInt(this.FINAL_PER_amt);

}


async btnSubmitDetails(): Promise<void> {
    try {

        if (this.utils.isEmpty(this.ADV_PER)|| this.ADV_PER===null||  this.ADV_PER==='0' ) {
            this.toast.warning('Please enter Advance percentage');
            return;
        }
        else if (this.utils.isEmpty(this.ADV_PER_amt)|| this.ADV_PER_amt===null||  this.ADV_PER_amt==='0') {
            this.toast.warning('Please enter Advance amount');
            return;
        } 
        else if (this.utils.isEmpty(this.PMID)) {
            this.toast.warning('Please Enter PONUMBER');
            return;
        }
        else if (this.utils.isEmpty(this.Invoice_path)) {
            this.toast.warning('Please Upload Profarma Inoice');
            return;
        }
        else if (this.utils.isEmpty(this.invoiceNo)) {
            this.toast.warning('Please enter Profarma invoiceNo');
            return;
        }
              

        else {

            if (this.PAYMODEID == 1 || this.PAYMODEID == 4) { this.WAYBILLPATH = null; this.CALIBRATIONPATH = null; }

            const req = {
                type: "2",
                id:this.SLNO,//"0", //alldistrict  1000
                INVID: "0",
                INVOICENO: this.invoiceNo,
                INVOICEDATE: this.invoicedate,
                PMID: this.PMID,
                INSERTEDBY: this.session.userName,
                PONUMBER: "0",
                PODATE: this.invoicedate,
                FIRMID: "0",
                UNITS: "0",
                PRICES: "0",
                COMPID: "0",
                PRICE_UNIT: "0",
                UOMID: "0",
                ROLE: this.session.desigId,
                UNIQUEID: this.session.uniqueId,
                TOTAL: this.totalamt1,
                COMENTS: this.comments,
                DISCOUNT: '0',
                PAYMODEID: this.PAYMODEID,
                INVOICEPATH: this.INVOICEPATH,
                DISTRICTID: this.session.districtId,
                CALIBRATIONPATH: '',//this. CALIBRATIONPATH,
                WAYBILLPATH: '',//this. WAYBILLPATH,
                BANKGUARANTEEPATH: '',//this. BANKGUARANTEEPATH,
                STAMPRECEIPTPATH: '',//this. STAMPRECEIPTPATH,
                ADV_PER: this.ADV_PER,
                DELIVERY_PER: this.DELIVERY_PER,
                INSTALL_PER: this.INSTALL_PER,
                FINAL_PER: this.FINAL_PER,
                TOTAL_PER: this.TOTAL_PER,
                ADV_PER_AMOUNT: this.ADV_PER_amt,
                DELIVERY_PER_AMOUNT: this.DELIVERY_PER_amt,
                INSTALL_PER_AMOUNT: this.INSTALL_PER_amt,
                FINAL_PER_AMOUNT: this.FINAL_PER_amt,
                TOTAL_PER_AMOUNT: this.TOTAL_PER_amt

            };
            this.spinner.show();
            debugger;
            const res = await this.OfficeModuleAPI.officeInvoicedetailsSub(req);

            this.spinner.hide();

            if (res.success) {


                const req1 = {
                    type: "2", id: "0", INVID: "0", INVOICENO: this.invoiceNo,
                    INVOICEDATE: this.invoicedate, PMID: this.PMID, INSERTEDBY: this.session.userName, PONUMBER: "0",
                    PODATE: this.invoicedate, FIRMID: "0", UNITS: "0", PRICES: "0", COMPID: "0", PRICE_UNIT: "0",
                    UOMID: "0", ROLE: this.session.desigId, UNIQUEID: this.session.uniqueId, TOTAL: this.totalamt1, COMENTS: this.comments,
                    DISCOUNT: '0', PAYMODEID: this.PAYMODEID, INVOICEPATH: '',
                    DISTRICTID: this.session.districtId, CALIBRATIONPATH: this.CALIBRATIONPATH, WAYBILLPATH: this.WAYBILLPATH,
                    BANKGUARANTEEPATH: this.BANKGUARANTEEPATH, STAMPRECEIPTPATH: this.STAMPRECEIPTPATH,
                    ADV_PER: this.ADV_PER, DELIVERY_PER: this.DELIVERY_PER, INSTALL_PER: this.INSTALL_PER, FINAL_PER: this.FINAL_PER, TOTAL_PER: this.TOTAL_PER,
                    ADV_PER_AMOUNT: this.ADV_PER_amt, DELIVERY_PER_AMOUNT: this.DELIVERY_PER_amt, INSTALL_PER_AMOUNT: this.INSTALL_PER_amt, FINAL_PER_AMOUNT: this.FINAL_PER_amt,
                    TOTAL_PER_AMOUNT: this.TOTAL_PER_amt,
                    ADV_STATUS: this.ADV_STATUS,
                    DELIVERY_STATUS: this.DELIVERY_STATUS,
                    INSTALL_STATUS: this.INSTALL_STATUS,
                    FINAL_STATUS: this.FINAL_STATUS
                };




                debugger;
                const resdocs = await this.OfficeModuleAPI.officeInvoiceDocumentsSub(req1);
                if (resdocs.success) {
                    this.toast.info(resdocs.message);
                    this.podetails();
                    window.location.reload();
                } else {
                    this.toast.info(res.message);
                }


            } else {
                this.toast.info(res.message);
            }
            this.spinner.hide();

        }

    }
    catch (error) {
        this.spinner.hide();
        this.utils.catchResponse(error);
    }
}


async PayModechange(): Promise<void> {
    try {
        if (this.utils.isEmpty(this.PAYMODEID)) {
            this.toast.warning('Select Paymode');
            return;
        }

        if (this.PAYMODEID === "1" || this.PAYMODEID === "4") { this.PAYMODEID1 = true; this.PAYMODEID2 = false; this.PAYMODEID3 = false; }
        else if (this.PAYMODEID === "2") {
            this.PAYMODEID2 = true; this.PAYMODEID1 = false; this.PAYMODEID3 = false;

        }
        else if (this.PAYMODEID === "3") { this.PAYMODEID3 = true; this.PAYMODEID1 = false; this.PAYMODEID2 = false; }

    } catch (error) {

        this.spinner.hide();
        this.utils.catchResponse(error);
    }
}

async POBYPONUMBER(): Promise<void> {
    try {
        debugger;
        if (this.utils.isEmpty(this.PMID)) {
            this.toast.warning('Please Enter PONUMBER');
            return;
        }
        this.paymodes();
        debugger;
        this.totalamt = 0;
        const reqdistrict = {
            type: "5",
            id: this.PMID,
            UNIQUEID: this.session.uniqueId,
            ROLE: this.session.desigId,
            INSERTEDBY: this.session.userName
        }; this.spinner.show();
        const res = await this.OfficeModuleAPI.tenderdetailsSelect(reqdistrict);
        if (res.success) {
            debugger;
            this.invtbl = true;
            this.purchasedetailsList = res.result;
            for (let j = 0; j < res.result.length; j++) {
                this.amt = ((res.result[j].PRICES));//* ( res.result[j].UNITS));
                this.totalamt = parseInt(this.totalamt) + parseInt(this.amt);
            }

            this.ADV_PER = res.result[0].ADV_PER;
            this.DELIVERY_PER = res.result[0].DELIVERY_PER;
            this.INSTALL_PER = res.result[0].INSTALL_PER;
            this.FINAL_PER = res.result[0].FINAL_PER;

            this.totalamt1 = 0;

            this.Tax1 = (this.totalamt * 0.00).toString();  //0.09
            this.Tax2 = (this.totalamt * 0.00).toString();
            this.Tax3 = (parseInt(this.Tax1) + parseInt(this.Tax2)).toString();
            this.totalamt1 = (parseInt(this.totalamt) + parseInt(this.Tax3))
           // this.POIdchange(); 
        } else {
            this.toast.info(res.message);
        }
         this.POBYPODetails();

        this.onALLDistrictChange();
        this.spinner.hide();
    } catch (error) {
        this.spinner.hide();
        this.utils.catchResponse(error);
    }
}

async POBYPODetails(): Promise<void> {
    try {
        const reqdistrict = {
            type: "6",
            id: this.PMID,
            UNIQUEID: this.session.uniqueId,
        }; this.spinner.hide();
        const res = await this.OfficeModuleAPI.tenderdetailsSelect(reqdistrict);
        if (res.success) {
            this.invtbl = true;

            // this.purchasedetailsList = res.result; 
            this.faddress1 = res.result[0].FADDRESS1;
            this.faddress2 = res.result[0].FADDRESS2;
            this.faddress3 = res.result[0].FADDRESS3;

            this.FIRMID = res.result[0].FIRMID;
            this.FIRMNAME = res.result[0].FIRMNAME;

            this.paddress1 = res.result[0].PLANTADDRESS1;
            this.paddress2 = res.result[0].PLANTCONTACT;


        } else {
            this.toast.info(res.message);
        }
        this.spinner.hide();
    } catch (error) {
        this.spinner.hide();
        this.utils.catchResponse(error);
    }
}

async onInvoiceChange(event): Promise<void> {
    try {
        this.Invoice_path = '';
        const element = event.currentTarget as HTMLInputElement;
        let fileList: FileList | null = element.files;

        if (element.files[0].name.split('.').length.toString() !== '2') {
            this.toast.warning('Please Upload PDF files only');

            event.target.value = '';
            return;
        } else {

            const res: any = await this.utils.encodedString(
                event,
                this.utils.fileType.PDF,
                this.utils.fileSize.fiftyMB
            );
            if (!this.utils.isEmpty(res)) {
                this.Invoice_path = res.split('base64,')[1];
                this.INVOICEPATH = this.Invoice_path;

            }
        }
    } catch (error) {
        this.toast.warning('Please Select pdf');
    }
}
async onStampReceipt(event): Promise<void> {
    try {
        this.STAMPRECEIPTPATH = '';
        const element = event.currentTarget as HTMLInputElement;
        let fileList: FileList | null = element.files;

        if (element.files[0].name.split('.').length.toString() !== '2') {
            this.toast.warning('Please Upload PDF files only');
            event.target.value = '';
            return;
        } else {

            const res: any = await this.utils.encodedString(
                event,
                this.utils.fileType.PDF,
                this.utils.fileSize.fiftyMB
            );
            if (!this.utils.isEmpty(res)) {
                this.STAMPRECEIPTPATH = res.split('base64,')[1];
            }
        }
    } catch (error) {
        this.toast.warning('Please Select pdf');
    }
}
}