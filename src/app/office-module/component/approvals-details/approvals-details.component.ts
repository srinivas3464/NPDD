import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { OfficeserviceService } from '../../services/officeservice.service';

@Component({
    selector: 'app-approvals-details',
    templateUrl: './approvals-details.component.html',
    styleUrls: ['./approvals-details.component.css']
})
export class ApprovalsDetailsComponent implements OnInit {
    //variables
    fromfyID: any; PMID: any; INVID: any; SLNO: any; PRID: any; type_id: any; Stamp: any;
    BankGuarantee: any; WayBill: any; Calibration: any; invoicepath: any; stockslip: any;
    PRICE: any; ADV_PER_amt: any; DELIVERY_PER_amt: any; FINAL_PER: any;
    TOTAL_PER_amt: any; TOTAL_PER: any; FINAL_PER_amt: any; FINAL_STATUS: any;
    INSTALL_PER_amt: any; INSTALL_PER: any; Qty: any; orgqty: any; INSTALL_STATUS: any;
    DELIVERY_STATUS: any; DELIVERY_PER: any; ADV_PER: any; ADV_STATUS: any;
    QUANTITY: any; tot: any; StampReceiptUpload: any; allotmentAlienationUpload: any; typeID: any;
    PR_INVID: any; invoiceNo: any; invoicedate: any; totalamt1: any; comments: any; PAYMODEID: any;
    STAMPRECEIPTPATH: any; BANKGUARANTEEPATH: any; WAYBILLPATH: any; CALIBRATIONPATH: any;
    Invoice_path: any; INVOICEPATH: any; strcompid: any; replacestr: any;

    //list  
    invdetailslist = []; GridDataold = [];
    Financialyeardata = []; Podetailslist = []; GridData = []; GridData1 = []; purchasedetailsList = []; TyeGridData = [];
    budgetdetailslist: [];
    Totalobj = { AMOUNT: 0, QUANTITY: 0 } 


    //boolean
    PAYMODEID1 = false; PAYMODEID2 = false; PAYMODEID3 = false; adv = true;

    constructor(private toast: ToasterService,
        private utils: UtilsService,
        private session: SessionService,
        private OfficeModuleAPI: OfficeserviceService,
        private spinner: NgxSpinnerService,
        private router: Router) { }

    ngOnInit(): void {
        if (this.session.uniqueId != "" && this.session.desigId != '') {
            this.Financialyeardetails();  this.TyeGridData = [];
        }
        else {
            this.router.navigate(['/shared/UnAuthorized']);
        }
    } 

    async podetails(): Promise<void> { 
        try { debugger;
            const req = {
                type: "16",
                id: this.fromfyID,
                UNIQUEID: this.session.uniqueId,
                ROLE: this.session.desigId,
                INSERTEDBY: this.session.userName,
            };
            this.Podetailslist = []; this.GridData1 = []; this.GridDataold = []; this.orgqty = "0"; this.Qty = "0"; this.PRICE = "0";
            this.spinner.show();                  //off_tenderrequ_details
            const res = await this.OfficeModuleAPI.tenderdetailsSelect(req);
            this.spinner.hide();
            if (res.success) {
                this.Podetailslist = res.result;
               
            } else {
                this.toast.warning(res.message);
            }
            this.spinner.hide();
        }
        catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
    }


    async GridtypeData(): Promise<void> {
        try { debugger;
            const req = {
                type: "26",
                id: this.PMID,
                UNIQUEID: this.session.uniqueId,
                ROLE: this.session.desigId,
                INSERTEDBY: this.session.userName,
            };
            this.TyeGridData = [];  
            this.spinner.show();
            const res = await this.OfficeModuleAPI.tenderdetailsSelect(req);
            this.spinner.hide();
            if (res.success) {
                this.TyeGridData = res.result;
               
            } else {
                this.toast.warning(res.message);
            }
            this.spinner.hide();
        }
        catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
    }





    async GridtypeData_1(): Promise<void> {
        try { debugger;
            const req = {
                type: "3",
                UNIQUEID: this.session.uniqueId,
                ROLE: this.session.desigId,
                INSERTEDBY: this.session.userName,
            };
            this.TyeGridData = [];
            this.spinner.show();
            const res = await this.OfficeModuleAPI.ApprovalDetails_Select(req);
            this.spinner.hide();
            if (res.success) {
                this.TyeGridData = res.result;
            } else {
                this.toast.info(res.message);
            }
        }
        catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
    }

    async Financialyeardetails(): Promise<void> {
        try {
            const reqdistrict = {
                type: 32,
            };
            this.Financialyeardata = [];
            this.spinner.show();
            const res = await this.OfficeModuleAPI.office_po_select(reqdistrict);
            if (res.success) { 
                this.Financialyeardata = res.result;
            } else {
                this.toast.info(res.message);
            }
            this.spinner.hide();
        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
    }



    async Invoicedetails(): Promise<void> {
        try {

            this.GridData1 = []; this.GridDataold = []; this.orgqty = "";
            if (this.PRID != undefined && this.PRID != null && this.PRID != "") {
                if (this.PRID === "1") this.type_id = "7"; else if (this.PRID === "2") this.type_id = "10"; //1
            }
            debugger;
            const req = {
                type: this.type_id,
                PMID: this.PMID,
                UNIQUEID: this.session.uniqueId, 
                ROLE: this.session.desigId,
            };
            this.spinner.show();
            this.invdetailslist = [];
            const res = await this.OfficeModuleAPI.officeInvoiceReports(req);
            this.spinner.hide();
            if (res.success) { this.invdetailslist = res.result; }
            else { this.toast.info(res.message); }
            this.spinner.hide();
        }
        catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
    }

    async btnVIEWPdf(id): Promise<void> {
        try {
            this.spinner.show();
            //   //   this.utils.downloadPdf(this.Stamp,'Stampcopy'); 
            //   //  this.utils.viewPDF(this.Stamp); 
            //   this.utils.DMSFileDownload(pdf);
            if (id == 1) { this.utils.pdfpageDownload(this.GridData1[0].ADVANCE_STAMP_RECEIPT); }
            if (id == 2) { this.utils.pdfpageDownload(this.BankGuarantee); }
            if (id == 3) { this.utils.pdfpageDownload(this.WayBill); }
            if (id == 4) { this.utils.pdfpageDownload(this.Calibration); }
            if (id == 5) { this.utils.pdfpageDownload(this.invoicepath); }
            if (id == 6) { this.utils.pdfpageDownload(this.stockslip); }
            // window.open('https://apiapddcf.ap.gov.in/jpv/'+this.WayBill, '_blank');  
            this.spinner.hide();
        } catch (error) {
            this.utils.catchResponse(error + "btnVIEWPdf");
        }

    }

    async onDistrictwiseqtyChange(): Promise<void> {
        try {

            if (this.fromfyID === '' || this.fromfyID === null || this.fromfyID === undefined) { this.toast.warning('Please Select Financial year'); }
            if (this.PMID === '' || this.PMID === null || this.PMID === undefined) { this.toast.warning('Please Select Po/Wo No Date'); }
            if (this.PRID === '' || this.PRID === null || this.PRID === undefined) { this.toast.warning('Please Select Inv Type'); }
            if (this.INVID === '' || this.INVID === null || this.INVID === undefined) { this.toast.warning('Please Select Invoice & Date'); }
            if (this.SLNO === '' || this.SLNO === null || this.SLNO === undefined) { this.toast.warning('Please Select District'); }

            this.GridData1 = [];
            this.tot = 0;
            this.Totalobj.QUANTITY = 0;
            this.Totalobj.AMOUNT = 0; debugger;
            const obj = {
                type: "19", //16   //24
                BUDGET_ID: this.SLNO,
                INPUT_01: this.INVID,
                INPUT_02: this.PRID
            } //off_budget_details 
            const res = await this.OfficeModuleAPI.office_Budget_Select(obj);
            this.spinner.hide();
            if (res.success) {

                this.PAYMODEID3 = false;
                this.GridData1 = res.result;//[this.SLNO]; 

                this.Stamp = res.result[0].ADVANCE_STAMP_RECEIPT;
                this.BankGuarantee = res.result[0].ADVANCE_BANK_GUARANTEE;
                this.WayBill = res.result[0].WAYBILL;
                this.Calibration = res.result[0].CALIBRATION_REPORT
                this.invoicepath = res.result[0].INV_PATH;
                this.stockslip = res.result[0].ST_PATH;
                this.budgetdetails();
            }
            else {
                this.spinner.hide();
                this.GridData1 = [];
            }
            this.podistrictwisedetails();
        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error + "onDistrictwiseqtyChange");
        }
    }

    async podistrictwisedetails(): Promise<void> {
        try {
            this.GridDataold = [];
            const obj = {
                type: "17",//4",// "29",  
                BUDGET_ID: this.SLNO,
                INPUT_01: this.INVID,
                INPUT_02: this.PRID
            }
            // const res = await this.OfficeModuleAPI.office_po_select(obj);
            //const res = await this.OfficeModuleAPI.office_Tenderdetails_select(obj);
            const res = await this.OfficeModuleAPI.office_Budget_nomination_Select(obj);

            this.spinner.hide();
            if (res.success) {
                this.GridDataold = res.result;
                this.orgqty = res.result[0].QUANTITY;
            }
            else {
                this.GridDataold = [];
                this.toast.warning(res.message);
            }
        } catch (error) {
            this.utils.catchResponse(error + "podistrictwisedetails");
        }
    }

    async Powodetails(): Promise<void> {
        try {
            this.typeID = '0';
        } catch (error) {
            this.utils.catchResponse(error);
        }
    }

    async POBYPONUMBER(): Promise<void> {
        try {
            this.GridData = []; this.GridData1 = []; this.GridDataold = []; this.orgqty = "";
            const obj = {
                type: "18",
                BUDGET_ID: this.INVID,
                INPUT_01: this.PRID,
            };
            // const res = await this.OfficeModuleAPI.office_po_select(obj);
            const res = await this.OfficeModuleAPI.office_Budget_nomination_Select(obj);
            this.spinner.hide();
            if (res.success) { this.GridData = res.result; }
            else { this.spinner.hide(); this.toast.warning(res.message); }
        }
        catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
    }

    onSelectionChange(id, qty, amt, totals): void {

        if (this.PRID == "1") {
            var element = <HTMLInputElement>document.getElementById("rbtn1");
            if (element != null) {
                if (element.checked === true) {
                    var advamtelement = <HTMLInputElement>document.getElementById("advamt");
                    this.ADV_PER_amt = advamtelement.value;
                    this.PAYMODEID1 = true;
                    var ADV_PERelement = <HTMLInputElement>document.getElementById("ADV_PER");
                    this.ADV_PER = ADV_PERelement.value; this.ADV_STATUS = 1;
                    var q1 = qty;
                    var per1 = parseFloat(q1.replace('%', '')) / 100;
                    this.QUANTITY = parseFloat(totals) * per1;

                    this.PRICE = parseInt(this.ADV_PER_amt);
                    this.Qty = totals;
                    ((parseInt(this.ADV_PER)) / 100);//   parseInt(this.orgqty)*
                }
                else { this.PAYMODEID1 = false; this.ADV_PER_amt = 0; this.ADV_PER = 0; this.ADV_STATUS = 0; this.Qty = 0; this.PRICE = 0; }
            }
            else { this.PAYMODEID1 = false; this.ADV_PER_amt = 0; this.ADV_PER = 0; this.ADV_STATUS = 0; }
        }
        else {

            this.PRICE = amt;
            var q = qty; debugger;
            var per = parseFloat(q.replace('%', '')) / 100;
            this.QUANTITY = parseFloat(totals) * per;
            //   this.toast.info(id +"---"+ qty +"---" +amt+"---" +totals);
            this.tot = "0";
            this.ADV_PER_amt = 0; this.DELIVERY_PER_amt = 0; this.INSTALL_PER_amt = 0; this.FINAL_PER_amt = 0;
            this.ADV_PER = 0; this.DELIVERY_PER = 0; this.INSTALL_PER = 0; this.FINAL_PER = 0;

            this.ADV_STATUS = 0; this.DELIVERY_STATUS = 0; this.INSTALL_STATUS = 0; this.FINAL_STATUS = 0;


            this.PAYMODEID1 = false; this.PAYMODEID2 = false;//this.PAYMODEID3=false;
            var element = <HTMLInputElement>document.getElementById("rbtn1");
            if (element != null) {
                if (element.checked === true) {
                    var element0 = <HTMLInputElement>document.getElementById("advamt");

                    this.ADV_PER_amt = element0.value;
                    this.PAYMODEID1 = true;
                    var element00 = <HTMLInputElement>document.getElementById("ADV_PER");
                    this.ADV_PER = element00.value; this.ADV_STATUS = 1;

                } else { this.PAYMODEID1 = false; this.ADV_PER_amt = 0; this.ADV_PER = 0; this.ADV_STATUS = 0; }
            } else { this.PAYMODEID1 = false; this.ADV_PER_amt = 0; this.ADV_PER = 0; this.ADV_STATUS = 0; }


            var element2 = <HTMLInputElement>document.getElementById("rbtn2");
            if (element2 != null) {
                if (element2.checked === true) {
                    var element1 = <HTMLInputElement>document.getElementById("deleamt");

                    this.DELIVERY_PER_amt = element1.value; this.PAYMODEID2 = true;

                    var element11 = <HTMLInputElement>document.getElementById("DELIVERY_PER");
                    this.DELIVERY_PER = element11.value; this.DELIVERY_STATUS = 1;

                } else { this.PAYMODEID2 = false; this.DELIVERY_PER_amt = 0; this.DELIVERY_PER = 0; this.DELIVERY_STATUS = 0; }
            } else { this.PAYMODEID2 = false; this.DELIVERY_PER_amt = 0; this.DELIVERY_PER = 0; this.DELIVERY_STATUS = 0; }

            var element3 = <HTMLInputElement>document.getElementById("rbtn3");
            if (element3 != null) {
                if (element3.checked === true) {
                    var element2 = <HTMLInputElement>document.getElementById("insamt");
                    this.INSTALL_PER_amt = element2.value; this.PAYMODEID3 = true;

                    var element22 = <HTMLInputElement>document.getElementById("INSTALL_PER");
                    this.INSTALL_PER = element22.value; this.INSTALL_STATUS = 1;

                } else { this.PAYMODEID3 = false; this.INSTALL_PER_amt = 0; this.INSTALL_PER = 0; this.INSTALL_STATUS = 0; }
            } else { this.PAYMODEID3 = false; this.INSTALL_PER_amt = 0; this.INSTALL_PER = 0; this.INSTALL_STATUS = 0; }


            var element4 = <HTMLInputElement>document.getElementById("rbtn4");
            if (element4 != null) {
                if (element4.checked === true) {
                    var element3 = <HTMLInputElement>document.getElementById("finamt");

                    this.FINAL_PER_amt = element3.value; this.PAYMODEID1 = true;

                    var element33 = <HTMLInputElement>document.getElementById("FINAL_PER");
                    this.FINAL_PER = element33.value; this.FINAL_STATUS = 1;

                } else { this.PAYMODEID1 = false; this.FINAL_PER_amt = 0; this.FINAL_PER = 0; this.FINAL_STATUS = 0; }
            } else { this.PAYMODEID1 = false; this.FINAL_PER_amt = 0; this.FINAL_PER = 0; this.FINAL_STATUS = 0; }


            this.PRICE = parseInt(this.ADV_PER_amt) + parseInt(this.DELIVERY_PER_amt) + parseInt(this.INSTALL_PER_amt) + parseInt(this.FINAL_PER_amt);
            this.Qty = totals;//   parseInt(this.orgqty)*
            ((
                parseInt(this.ADV_PER) + parseInt(this.DELIVERY_PER) + parseInt(this.INSTALL_PER) + parseInt(this.FINAL_PER)
            ) / 100)
                ;
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
            }
            else {
                const res: any = await this.utils.encodedString(event, this.utils.fileType.PDF, this.utils.fileSize.fiftyMB);
                if (!this.utils.isEmpty(res)) { this.STAMPRECEIPTPATH = res.split('base64,')[1]; }
            }
        }
        catch (error) { this.toast.warning('Please Select pdf'); }
    }

    async onbankguarantee(event): Promise<void> {
        try {
            this.BANKGUARANTEEPATH = '';
            const element = event.currentTarget as HTMLInputElement;
            let fileList: FileList | null = element.files;

            if (element.files[0].name.split('.').length.toString() !== '2') {
                this.toast.warning('Please Upload PDF files only');
                event.target.value = '';
                return;
            }
            else {
                const res: any = await this.utils.encodedString(
                    event,
                    this.utils.fileType.PDF,
                    this.utils.fileSize.fiftyMB
                );
                if (!this.utils.isEmpty(res)) { this.BANKGUARANTEEPATH = res.split('base64,')[1]; }
            }
        }
        catch (error) {
            this.toast.warning('Please Select pdf');
        }
    }

    async onWayBill(event): Promise<void> {
        try {
            this.WAYBILLPATH = '';
            const element = event.currentTarget as HTMLInputElement;
            let fileList: FileList | null = element.files;

            if (element.files[0].name.split('.').length.toString() !== '2') {
                this.toast.warning('Please Upload PDF files only');
                event.target.value = '';
                return;
            }
            else {
                const res: any = await this.utils.encodedString(
                    event,
                    this.utils.fileType.PDF,
                    this.utils.fileSize.fiftyMB
                );
                if (!this.utils.isEmpty(res)) {
                    this.WAYBILLPATH = res.split('base64,')[1];
                }
            }
        }
        catch (error) {
            this.toast.warning('Please Select pdf');
        }
    }
    async onCalibration(event): Promise<void> {
        try {
            this.CALIBRATIONPATH = '';
            const element = event.currentTarget as HTMLInputElement;
            let fileList: FileList | null = element.files;

            if (element.files[0].name.split('.').length.toString() !== '2') {
                this.toast.warning('Please Upload PDF files only');
                event.target.value = '';
                return;
            }
            else {
                const res: any = await this.utils.encodedString(
                    event,
                    this.utils.fileType.PDF,
                    this.utils.fileSize.fiftyMB
                );
                if (!this.utils.isEmpty(res)) {
                    this.CALIBRATIONPATH = res.split('base64,')[1];
                }
            }
        }
        catch (error) { this.toast.warning('Please Select pdf'); }
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
            }
            else {
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
        }
        catch (error) { this.toast.warning('Please Select pdf'); }
    }

    validate(): boolean {

        if (this.fromfyID === '' || this.fromfyID === null || this.fromfyID === undefined) { this.toast.warning('Please Select Financial year'); this.fromfyID = this.fromfyID.focus; return false; }
        else if (this.PMID === '' || this.PMID === null || this.PMID === undefined) { this.toast.warning('Please Select Purchase Order'); this.PMID = this.PMID.focus; return false; }
        else if (this.INVID === '' || this.INVID === null || this.INVID === undefined) { this.toast.warning('Please Select Invoice'); this.INVID = this.INVID.focus; return false; }
        else if (this.SLNO === '' || this.SLNO === null || this.SLNO === undefined) { this.toast.warning('Please Select District'); this.SLNO = this.SLNO.focus; return false; }
        else if (this.Qty === '' || this.Qty === null || this.Qty === undefined || this.Qty === '0') { this.toast.warning('Please Select above any one checkbox Enter Qty'); this.Qty = this.Qty.focus; return false; }
        else if (this.PRICE === '' || this.PRICE === null || this.PRICE === undefined || this.PRICE === '0') { this.toast.warning('Please  Select above any one checkbox Enter Price'); this.PRICE = this.PRICE.focus; return false; }
        else if (this.PRID == "1") { if (this.ADV_PER === '' || this.ADV_PER === '0') { this.toast.warning('Please  Select above any one Advance Percentage  Checkbox'); return false; } }
        else if (this.PRID == "2") {
            if ((this.DELIVERY_PER === '' && this.INSTALL_PER === '' && this.FINAL_PER === '') || (this.DELIVERY_PER === '0' && this.INSTALL_PER === '0' && this.FINAL_PER === '0')) { this.toast.warning('Please  Select above any one checkbox Enter Price'); return false; }
        }
        return true;
    }
    async btnSubmitDetails(): Promise<void> {
        try {debugger;
            if (this.validate()) {debugger;

                if (this.PAYMODEID == 1 || this.PAYMODEID == 4) { this.WAYBILLPATH = null; this.CALIBRATIONPATH = null; }
                else if (this.PAYMODEID == 2) { this.BANKGUARANTEEPATH = null; this.CALIBRATIONPATH = null; }
                else if (this.PAYMODEID == 3) { this.BANKGUARANTEEPATH = null; this.WAYBILLPATH = null; }

                if (this.PAYMODEID == 1) { this.DELIVERY_PER = 0; this.INSTALL_PER = 0; this.FINAL_PER = 0; }
                else if (this.PAYMODEID == 2) { this.ADV_PER = 0; this.INSTALL_PER = 0; this.FINAL_PER = 0; }
                else if (this.PAYMODEID == 3) { this.ADV_PER = 0; this.DELIVERY_PER = 0; this.FINAL_PER = 0; }
                else if (this.PAYMODEID == 4) { this.ADV_PER = 0; this.DELIVERY_PER = 0; this.INSTALL_PER = 0; }
                const req1 = {
                    TYPE: "1",
                    DISCOUNT: this.fromfyID,
                    PR_INVID: this.INVID,
                    SLNO: this.SLNO,
                    PMID: this.PMID,
                    ADV_PER: this.ADV_PER,
                    DELIVERY_PER: this.DELIVERY_PER,
                    INSTALL_PER: this.INSTALL_PER,
                    FINAL_PER: this.FINAL_PER,
                    ADV_PER_AMOUNT: this.ADV_PER_amt,
                    DELIVERY_PER_AMOUNT: this.DELIVERY_PER_amt,
                    INSTALL_PER_AMOUNT: this.INSTALL_PER_amt,
                    FINAL_PER_AMOUNT: this.FINAL_PER_amt,
                    QTY: this.Qty,
                    AMOUNT: this.PRICE,
                    UNIQUEID: this.session.uniqueId,
                    ROLE: this.session.desigId,
                    INSERTEDBY: this.session.userName
                }; debugger;
                this.spinner.show();
                debugger;
                const res = await this.OfficeModuleAPI.ApprovalDetailsSub(req1);
                this.spinner.hide();
                if (res.success) {
                    const req2 = {
                        TYPE: "1", DOCID: this.INVID, PROID: "", PAYMODEID: this.typeID, ADVANCE_BANK_GUARANTEE: this.BANKGUARANTEEPATH,
                        ADVANCE_STAMP_RECEIPT: this.STAMPRECEIPTPATH, PROFORMA_INVOICE: this.INVOICEPATH, PWAYBILL: this.WAYBILLPATH,
                        CALIBRATION_REPORT: this.CALIBRATIONPATH, INSERTEDBY: this.session.userName, ROLE: this.session.desigId,
                        UNIQUEID: this.session.uniqueId, INTPUT_01: this.INVID, INTPUT_02: this.SLNO, PMID: this.PMID,
                    };

                    debugger;
                    this.spinner.show();
                    const resdocs = await this.OfficeModuleAPI.ApprovalDocumentSub(req2);
                    if (resdocs.success) {
                        this.toast.success(res.message);
                        this.spinner.hide();
                        window.location.reload();
                    }
                    else {
                        this.spinner.hide();
                        this.toast.warning(res.message);
                    }
                    this.spinner.hide();

                }
                else {
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

    async budgetdetails(): Promise<void> {
        try {
            const req = {
                type: "23",
                UNIQUEID: this.session.uniqueId,
                ROLE: this.session.desigId,
                INSERTEDBY: this.session.userName
            };
            this.spinner.show();    ///off_tenderrequ_details
            const res = await this.OfficeModuleAPI.tenderdetailsSelect(req);
            this.spinner.hide();
            if (res.success) { this.budgetdetailslist = res.result; }
            else { this.toast.warning(res.message); }
            this.spinner.hide();
        }
        catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
    }

}
