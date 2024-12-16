import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { promise } from 'protractor';
import { Subject } from 'rxjs';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { OfficeserviceService } from '../../services/officeservice.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-payment-details',
    templateUrl: './payment-details.component.html',
    styleUrls: ['./payment-details.component.css']
})
export class PaymentDetailsComponent implements OnInit {
    minDate: Date;
    maxDate: Date;
    Podetailslist = []; PMID: any; invdetailslist = []; INVID: any; InvoiceReportsList = []; invamount: any;
    chequeno: any; chequedate: any; Deductions: any; CGST: any; UTRNO: any; SGST: any; uploadtds = ""; IGST: any; netamount: any; Tds: any;
    dtOptions: DataTables.Settings = this.utils.dataTableOptions(); Paymentdetailslist = [];
    dtTrigger: Subject<any> = new Subject();
    pendtTrigger: Subject<any> = new Subject();
    constructor(private toast: ToasterService,
        private utils: UtilsService,
        private session: SessionService,
        private OfficeModuleAPI: OfficeserviceService,
        private spinner: NgxSpinnerService, private router: Router) { }

    ngOnInit(): void {
        if (this.session.uniqueId != "" && this.session.desigId != "") {
            this.invamount = 0; this.Deductions = 0; this.CGST = 0; this.SGST = 0; this.IGST = 0; this.Tds = 0; this.netamount = 0;
            this.chequedate = this.session.getTodayDateString(); this.PMID = undefined;
            this.podetails();
            this.Paymentdetails();

            this.Deductions = "0"; this.CGST = "0"; this.SGST = "0"; this.IGST = "0"; this.Tds = "0";

        } else {
            this.router.navigate(['/shared/UnAuthorized']);
        }

    }
    async podetails(): Promise<void> {
        try {
            const req = {
                type: "24",//21 //8
            }; debugger;
            this.spinner.show();                    //proc off_tenderrequ_details
            const res = await this.OfficeModuleAPI.tenderdetailsSelect(req);
            this.spinner.hide();
            if (res.success) {
                this.Podetailslist = res.result;
                this.PMID = undefined;
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



    // async Invoicedetails(): Promise<void> {
    //   try { debugger;
    //     const req={
    //       type:"22",//9 
    //      id:this.PMID,
    //    };
    //    this.spinner.show();                   //proc off_tenderrequ_details
    //    const res = await this.OfficeModuleAPI.tenderdetailsSelect(req); 
    //    this.spinner.hide();  
    //     if (res.success) { 
    //       this.invdetailslist = res.result; 
    //       this.Paymentdetails();
    //     } else {
    //       this.toast.info(res.message);
    //     }
    //     this.spinner.hide();
    //   }
    //   catch (error) {
    //     this.spinner.hide();
    //     this.utils.catchResponse(error);
    //   }
    // }

    async btnAllPdf(pdf): Promise<void> {
        try {
            this.spinner.show();
            const res = await this.utils.AdminFileDownload(pdf);
            if (res.success) {
                this.utils.downloadPdf(res.result, pdf);
            } else {
                this.toast.info(res.message);
            }
            this.spinner.hide();
        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
    }

    async Paymentdetails(): Promise<void> {
        try {
            this.Paymentdetailslist = [];
            if (this.utils.isEmpty(this.PMID)) { this.PMID = "0"; }
            const req = {
                type: "10",
                id: this.PMID,
            };
            this.spinner.show();     //off_tenderrequ_details
            const res = await this.OfficeModuleAPI.tenderdetailsSelect(req);
            this.spinner.hide();
            if (res.success) {
                this.Paymentdetailslist = res.result;
            } else {
                // this.toast.info(res.message);
            }
            this.spinner.hide();
        }
        catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
    }



    async DeletePAYID(PAYID): Promise<void> {
        try {
            if (PAYID != "") {
                const str = PAYID.split(',');
                const req = {
                    type: "11",
                    id: PAYID
                }

                this.spinner.show();
                const res = await this.OfficeModuleAPI.tenderdetailsSelect(req);
                this.spinner.hide();
                if (res.success) {
                    if (res.result[0].STATUS == "2")
                        this.toast.info("No Records Found Pls Try Again");
                    if (res.result[0].STATUS == "1")
                        this.toast.info("Record Deleted Successfully");
                    if (res.result[0].STATUS == "0")
                        this.toast.info("please try again");

                    this.Paymentdetails();
                    //  window.location.reload();

                } else {
                    this.toast.info("Record NOT Deleted");
                }


            }
            else {
                this.toast.info("Component is null");
                return;
            }
        }
        catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }

    }


    async InvoiceByID(): Promise<void> {
        try {
            debugger;
            const reqdistrict = {
                type: "9",
                INVID: this.PMID,
            };
            this.spinner.show();                     //OFF_INVOICE_MASTER_SELECT
            const res = await this.OfficeModuleAPI.officeInvoiceReports(reqdistrict);
            this.spinner.hide();
            if (res.success) {
                this.InvoiceReportsList = res.result;

            } else {
                this.toast.info(res.message);
            }
            this.spinner.hide();
        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
    }

    async onbudgetslip(event): Promise<void> {
        try {

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
                    this.uploadtds = res.split('base64,')[1];
                }
            }
        } catch (error) {
            this.toast.warning('Select pdf');
        }
    }

    async btnSubmitDetails(): Promise<void> {
        try {
            debugger;
            if (this.utils.isEmpty(this.PMID)) {
                this.toast.warning('Select PO/WO No  & Date');
                return;
            }

            // if (this.utils.isEmpty(this.INVID)) {
            //   this.toast.warning('Select Invoice No & Date');
            //   return;
            // }

            if (this.utils.isEmpty(this.invamount)) {
                this.toast.warning('Enter Invoice Amount');
                return;
            }



            // if (this.utils.isEmpty(this.Deductions)) {
            //   this.toast.warning('Enter Deductions');
            //   return;
            // }
            if (this.IGST === "0" && this.CGST === "0" && this.Tds === "0") {
                this.toast.warning('Enter any one tax IGST OR TDS OR CGST ');
                return;
            }
            // if (this.utils.isEmpty(this.IGST)  ||  this.IGST==="0" ) {
            //   this.toast.warning('Enter IGST');
            //   return;
            // }

            // if (this.utils.isEmpty(this.CGST)  ||  this.CGST==="0") {
            //   this.toast.warning('Enter CGST');
            //   return;
            // }
            // if (this.utils.isEmpty(this.SGST)  ||  this.SGST==="0") {
            //   this.toast.warning('Enter SGST');
            //   return;
            // }


            // if (this.utils.isEmpty(this.Tds) ||  this.Tds==="0") {
            //   this.toast.warning('Enter Tds');
            //   return;
            // }


            if (this.utils.isEmpty(this.netamount)) {
                this.toast.warning('Enter netamount');
                return;
            }
            if (this.utils.isEmpty(this.chequeno)) {
                this.toast.warning('Enter Cheque No');
                return;
            }
            if (this.utils.isEmpty(this.chequedate)) {
                this.toast.warning('Enter Cheque Date');
                return;
            }
            if (this.utils.isEmpty(this.UTRNO)) {
                this.toast.warning('Enter UTRNO');
                return;
            }
            if (this.utils.isEmpty(this.uploadtds)) {
                this.toast.warning('Enter uploadtds');
                return;
            }

            
            const reqdistrict = {
                TYPE: "1",
                ID: "0",
                PAYID: "0",
                PMID: "0",
                INVID: this.INVID,
                GROSSINVOICEVAL: this.invamount,
                DEDUCTION: this.Deductions,
                TDS: this.Tds,
                CGST: this.CGST,
                SGST: this.SGST,
                IGST: this.IGST,
                NETPAYMENT: this.netamount,
                CHEQUENO: this.chequeno,
                CHEQUEDATE: this.chequedate,
                UTR: this.UTRNO,
                UPLOADTDSDOC: this.uploadtds,
                ROLE: this.session.desigId,
                UNIQUEID: this.session.uniqueId,
                INSERTEDBY: this.session.userName,
                INPUT_05: this.PMID

            };
            this.spinner.show(); debugger;         // PROCNAME OFF_PAYMENT_DTS
            const res = await this.OfficeModuleAPI.paymentDetailsSub(reqdistrict);
            this.spinner.hide();
            if (res.success) {
                // this.InvoiceReportsList = res.result; 
                this.toast.info(res.message);
                this.Paymentdetails();
                window.location.reload();
            } else {
                this.toast.info(res.message);
            }





        } catch (error) {
            this.toast.warning('');
        }
    }

    async calc(): Promise<void> {
        try {
            let totamt = 0;

            if (this.Deductions == "") this.Deductions = "0";
            if (this.CGST == "") this.CGST = "0";
            if (this.SGST == "") this.SGST = "0";
            if (this.IGST == "") this.IGST = "0";
            if (this.Tds == "") this.Tds = "0";


            if (parseInt(this.invamount) >= 0 && parseInt(this.Deductions) >= 0 && parseInt(this.CGST) >= 0 && parseInt(this.SGST) >= 0 && parseInt(this.IGST) >= 0 && parseInt(this.Tds) >= 0) {
                totamt = parseInt(this.invamount) - parseInt(this.Deductions)
                let totamt1 = totamt + parseInt(this.CGST) + parseInt(this.SGST) + parseInt(this.IGST) + parseInt(this.Tds);
                this.netamount = totamt1;
            }

            // if( this.utils.isEmpty(this.invamount)){return;}
            // else if( this.utils.isEmpty(this.Deductions)){return;}
            // else if( this.utils.isEmpty(this.CGST)){return;}
            // else if( this.utils.isEmpty(this.SGST)){return;}
            // else if( this.utils.isEmpty(this.IGST)){return;}
            // else if( this.utils.isEmpty(this.Tds)){return;}
            // else{
            //   totamt= parseInt(this.invamount)-parseInt(this.Deductions)
            // let  totamt1= totamt+ parseInt(this.CGST)+parseInt(this.SGST)+parseInt(this.IGST);
            //   this.netamount=totamt1;
            // } 
        } catch (error) {

        }

    }



}
