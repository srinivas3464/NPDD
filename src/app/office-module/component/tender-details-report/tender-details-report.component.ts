import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { OfficeserviceService } from '../../services/officeservice.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';



@Component({
    selector: 'app-tender-details-report',
    templateUrl: './tender-details-report.component.html',
    styleUrls: ['./tender-details-report.component.css']
})
export class TenderDetailsReportComponent implements OnInit, OnDestroy, AfterViewInit {

    @ViewChild(DataTableDirective, { static: false })
    dtElement: DataTableDirective;
    dtOptions: DataTables.Settings = this.utils.dataTableOptions();
    dtTrigger: Subject<any> = new Subject();
    pendtTrigger: Subject<any> = new Subject();
    excelData: any[] = [];
    excelDatatwo: any[] = [];
    TenderDetailsList: any[] = [];
    CommercialList: any[] = [];
    ReverseList: any[] = [];
    TenderSacntionedList: any[] = [];
    EMDList: any[] = [];
    DropList: any[] = [];
    excelDatathree: any[] = [];
    excelDatafour: any[] = [];
    excelDatafive: any[] = [];
    excelDatasix: any[] = [];
    SLNO: any;
    isContentVisibleTender: boolean = false;
    isContentVisibleCommercial: boolean = false;
    isContentVisibleReverse: boolean = false;
    isContentVisibleTenderSacntioned: boolean = false;
    isContentVisibleEMD: boolean = false;
    isContentVisibleProceeding: boolean = false;
    ngOnInit(): void {
        debugger;

        // this.TenderData();
        // this.CommercialData();
        // this.ReverseData();
        // this.TenderSacntionedData();
        // this.EMDData();
        this.DropdownData();
    }


    constructor(private toast: ToasterService,
        private utils: UtilsService,
        private session: SessionService,
        private OfficeModuleAPI: OfficeserviceService,
        private spinner: NgxSpinnerService) { }



    async TenderData(): Promise<void> {
        try {
            debugger
            this.excelData = [];
            this.excelDatasix = [];
            const obj = {
                type: "9",
            }                           //off_new_tender_dts
            const res = await this.OfficeModuleAPI.tenderdetails(obj);
            this.spinner.hide();
            if (res.success) {
                this.excelData = [];
                this.excelDatasix = [];
                this.TenderDetailsList = res.result;
                console.log(this.TenderDetailsList);

                for (var i = 0; i < this.TenderDetailsList.length; i++) {

                    // if (this.SLNO == '1') {
                    let singleRow =
                    {
                        S_NO: i + 1,
                        TENDER_ID: this.TenderDetailsList[i].TENDER_ID,
                        TENDER_DATE: this.TenderDetailsList[i].TENDER_DATE,
                        TENDER_NOTICE_NUMBER: this.TenderDetailsList[i].TENDER_NOTICE_NO,
                        NATURE_OF_WORK: this.TenderDetailsList[i].NATURE_OF_WORK,
                        NAME_OF_THE_PARTICIPANTS: this.TenderDetailsList[i].NAME_OF_THE_PARTICIPANTS,
                        BID_DOCUMENT_DOWNLOAD_START_DATE: this.TenderDetailsList[i].BID_START_DOC,
                        BID_SUBMISSION_CLOSING_DATE: this.TenderDetailsList[i].BID_CLOSE_DOC,
                        PROCESSING_FEE_PAYMENT: this.TenderDetailsList[i].PROCESSING_PAYMODE,
                        PROCESSING__ONLINE_DD_NO: this.TenderDetailsList[i].PROCESSING_PAYDATE,
                        PROCESSING_DD_AMOUNT: this.TenderDetailsList[i].PROCESSING_AMOUNT,
                        EMD_DETAILS_PAYMENT: this.TenderDetailsList[i].EMD_PAYMODE,
                        EMD_DETAILS_ONLINE_DD_NO: this.TenderDetailsList[i].EMD_PAYDATE,
                        EMD_DEAILS_DD_AMOUNT: this.TenderDetailsList[i].EMD_AMOUNT,

                    }
                    this.excelData.push(singleRow);
                    // }
                    // else {
                    let singletwo =
                    {
                        S_NO: i + 1,
                        PROCEDING_REMARKS: this.TenderDetailsList[i].PROCEDING_REMARKS,
                        PROCEDING_FILE_IMAGE_PATH: this.TenderDetailsList[i].PROCEDING_FILE_IMAGE_PATH
                    }
                    this.excelDatasix.push(singletwo);
                    // }

                }

                this.spinner.hide();
                this.rerender();
                //  console.log(this.TenderDetailsList);
                // return;

            } else {
                this.toast.warning(res.message); this.spinner.hide();
                //  return;
            }
        }
        catch (error) {
            this.spinner.hide();
            // this.utils.catchResponse(error);
        }
    }

    async CommercialData(): Promise<void> {
        try {
            debugger
            this.excelDatatwo = [];
            const obj = {
                type: "10",
            }                               //off_new_tender_dts
            const res = await this.OfficeModuleAPI.tenderdetails(obj);
            this.spinner.hide();
            if (res.success) {
                this.excelDatatwo = [];
                this.CommercialList = res.result;
                for (var i = 0; i < this.CommercialList.length; i++) {
                    let singleRow =
                    {
                        S_NO: i + 1,
                        NAME_OF_THE_FIRM: this.CommercialList[i].NAME_OF_THE_FIRM,
                        QUOTE_PRICE: this.CommercialList[i].QUOTE_PRICE,
                        RATING: this.CommercialList[i].RATING,
                    }
                    this.excelDatatwo.push(singleRow);
                }
                this.rerender();
                this.spinner.hide();
                //  console.log(this.CommercialList);
                //  return;
            } else {
                this.toast.warning(res.message); this.spinner.hide();
                //  return;
            }
        }
        catch (error) {
            this.spinner.hide();
            // this.utils.catchResponse(error);
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
    async ReverseData(): Promise<void> {
        try {
            debugger
            this.excelDatathree = [];
            const obj = {
                type: "11",
            }
            const res = await this.OfficeModuleAPI.tenderdetails(obj);
            this.spinner.hide();
            if (res.success) {
                this.excelDatathree = [];
                this.ReverseList = res.result;
                for (var i = 0; i < this.ReverseList.length; i++) {
                    let singleRow =
                    {
                        S_NO: i + 1,
                        REVERSE_STARTING_TIME: this.ReverseList[i].REVERSE_STARTING_TIME,
                        REVERSE_AUCTION_DATE_END_DATE: this.ReverseList[i].REVERSE_END_TIME,
                        FINAL_PRICE_DETAILS: this.ReverseList[i].FINAL_PRICE_DETAILS,
                        NAME_OF_THE_FIRM: this.ReverseList[i].NAME_OF_THE_FIRM,
                        QUOTE_PRICE: this.ReverseList[i].QUOTE_PRICE,
                        RATING: this.ReverseList[i].RATING,

                    }
                    this.excelDatathree.push(singleRow);
                }
                this.rerender();
                // console.log(this.ReverseList);
                //return;
                this.spinner.hide();
            } else {
                this.toast.warning(res.message); this.spinner.hide();
                //  return;
            }
        }
        catch (error) {
            //  this.spinner.hide();
            // this.utils.catchResponse(error);
        }
    }

    async TenderSacntionedData(): Promise<void> {
        try {
            debugger
            this.excelDatafour = [];
            const obj = {
                type: "12",
            }
            const res = await this.OfficeModuleAPI.tenderdetails(obj);
            this.spinner.hide();
            if (res.success) {
                this.excelDatafour = [];
                this.TenderSacntionedList = res.result;
                for (var i = 0; i < this.TenderSacntionedList.length; i++) {
                    let singleRow =
                    {
                        S_NO: i + 1,
                        NAME_OF_THE_FIRM: this.TenderSacntionedList[i].NAME_OF_THE_FIRM,
                        QUOTE_PRICE: this.TenderSacntionedList[i].QUOTE_PRICE,
                        RATING: this.TenderSacntionedList[i].RATING,
                    }
                    this.excelDatafour.push(singleRow);
                }
                this.spinner.hide();
                this.rerender();
                //   console.log(this.TenderSacntionedList);
                //  return;
            } else {
                this.spinner.hide();
                this.toast.warning(res.message);
                //  return;
            }
        }
        catch (error) {
            this.spinner.hide();
            // this.utils.catchResponse(error);
        }
    }

    async EMDData(): Promise<void> {
        try {
            debugger
            this.excelDatafive = [];
            const obj = {
                type: "13",
            }; this.spinner.show();
            const res = await this.OfficeModuleAPI.tenderdetails(obj);
            this.spinner.hide();
            if (res.success) {
                this.excelDatafive = [];
                this.EMDList = res.result;
                for (var i = 0; i < this.EMDList.length; i++) {
                    let singleRow =
                    {
                        S_NO: i + 1,
                        NAME_OF_THE_FIRM: this.EMDList[i].NAME_OF_THE_FIRM,
                        PAYMENT_ID: this.EMDList[i].PAYMENTID,
                        BANK_NAME: this.EMDList[i].BANK_NAME,
                        CREDIT_ACCOUNT_NUMBER: this.EMDList[i].CREDIT_ACCOUNT_NUMBER,
                        CREDIT_ACCOUNT_NAME: this.EMDList[i].CREDIT_ACCOUNT_NAME,
                        CREDIT_IFSCCODE: this.EMDList[i].CREDIT_IFSCCODE,
                        REFUND_STATUS: this.EMDList[i].REFUND_STATUS,
                        REFUND_DATE: this.EMDList[i].REFUND_DATE,
                        REF_TRANSACTION_ID: this.EMDList[i].REF_TRANSACTION_ID,
                        REMARKS: this.EMDList[i].REMARKS,

                    }
                    this.excelDatafive.push(singleRow);
                }
                this.rerender();
                // console.log(this.EMDList);
                // return;
            } else {
                this.spinner.hide();
                this.toast.warning(res.message);
                //   return;
            }
        }
        catch (error) {
            this.spinner.hide();
            // this.utils.catchResponse(error);
        }
    }

    async DropdownData(): Promise<void> {
        try {
            debugger
            const obj = {
                type: "14",
            }
            this.spinner.show();

            const res = await this.OfficeModuleAPI.tenderdetails(obj);
            this.spinner.hide();
            if (res.success) {
                this.DropList = res.result; //this.rerender();
                //   console.log(this.DropList);
                //   return;
            } else {
                this.toast.warning(res.message);
                // return;
            }
        }
        catch (error) {
            this.spinner.hide();
            // this.utils.catchResponse(error);
        }
    }



    changeTable() {

        debugger;
        if (this.SLNO == '1') {
            this.isContentVisibleTender = true
            this.isContentVisibleCommercial = false
            this.isContentVisibleEMD = false;
            this.isContentVisibleTenderSacntioned = false;
            this.isContentVisibleReverse = false;
            this.isContentVisibleProceeding = false;
            this.TenderData();
            return;
        }
        else if (this.SLNO == '2') {
            this.isContentVisibleCommercial = true
            this.isContentVisibleTender = false
            this.isContentVisibleEMD = false;
            this.isContentVisibleTenderSacntioned = false;
            this.isContentVisibleReverse = false;
            this.isContentVisibleProceeding = false;
            this.CommercialData();
            return;
        }
        else if (this.SLNO == '3') {
            this.isContentVisibleReverse = true;
            this.isContentVisibleCommercial = false
            this.isContentVisibleTender = false
            this.isContentVisibleEMD = false;
            this.isContentVisibleTenderSacntioned = false;
            this.isContentVisibleProceeding = false;
            this.ReverseData();
            return;
        }
        else if (this.SLNO == '4') {
            this.isContentVisibleCommercial = false
            this.isContentVisibleTender = false
            this.isContentVisibleEMD = false;
            this.isContentVisibleTenderSacntioned = true;
            this.isContentVisibleReverse = false;
            this.isContentVisibleProceeding = false;
            this.TenderSacntionedData();
            return;
        }
        else if (this.SLNO == '5') {
            this.isContentVisibleCommercial = false
            this.isContentVisibleTender = false
            this.isContentVisibleEMD = true;
            this.isContentVisibleTenderSacntioned = false;
            this.isContentVisibleReverse = false;
            this.isContentVisibleProceeding = false;
            this.EMDData();
            return;
        }

        else if (this.SLNO == '6') {
            this.isContentVisibleCommercial = false
            this.isContentVisibleTender = false
            this.isContentVisibleEMD = false;
            this.isContentVisibleTenderSacntioned = false;
            this.isContentVisibleReverse = false;
            this.isContentVisibleProceeding = true;
            this.TenderData();
            return;
        }


    }
    async btnPdfView(pdf): Promise<void> {
        try {
            this.spinner.show();
            const res = await this.utils.DMSFileDownload(pdf);
            // const res = await this.utils.downloadPdfFile(pdf,"Proceedingfile");
            if (res.success) {
                this.utils.viewPDF(res.result);
                // let signedByPdf = 'data:application/pdf, ' + res.result;
                // window.open(signedByPdf, '_blank');
            } else {
                this.toast.info(res.message);
            }
            this.spinner.hide();
        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
    }

    btnExcel(): void {
        debugger;

        this.utils.JSONToCSVConvertor(
            this.excelData,
            'Tender Details',
            true
        );
    }

    btnExceltwo(): void {
        debugger;

        this.utils.JSONToCSVConvertor(
            this.excelDatatwo,
            'Commercial Stage Details',
            true
        );
    }
    btnExcelthree(): void {
        debugger;

        this.utils.JSONToCSVConvertor(
            this.excelDatathree,
            'Reverse Auction Details',
            true
        );
    }
    btnExcelfour(): void {
        debugger;

        this.utils.JSONToCSVConvertor(
            this.excelDatafour,
            'Tender Sanctioned Details',
            true
        );
    }
    btnExcelfive(): void {
        debugger;

        this.utils.JSONToCSVConvertor(
            this.excelDatafive,
            'EMD Refund Details',
            true
        );
    }

    btnExcelsix(): void {
        debugger;

        this.utils.JSONToCSVConvertor(
            this.excelDatasix,
            'Proceeding Details',
            true
        );
    }
}
