import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { OfficeserviceService } from '../../services/officeservice.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-new-tender-details',
    templateUrl: './new-tender-details.component.html',
    styleUrls: ['./new-tender-details.component.css']
})
export class NewTenderDetailsComponent implements OnInit {
    DataList1: any[] = [];
    selectedItemIndex: number = -1;
    itemList: { NameOfTheParticipants: string }[] = [];
    minDate: Date;
    maxDate: Date;
    selectTablesub = false;
    startTime: any;
    endTime: any;
    //Tender Details
    ComonentId: any;
    selectTablesubTender = false;
    DataList: any[] = [];
    MaterId: any;
    TenderId: any;
    TenderDate: any;
    TenderNoticeNumber: any;
    NatureofWork: any;
    StartDateandTime: any;
    NameOfTheParticipants: any;
    ClosingDateandTime: any;
    ProcessingModeofPaymentID = '';
    ProcessingPaymentDate: any;
    ProcessingAmount: any;
    EMDModeofPaymentID = '';
    EMDPaymentDate: any;
    EMDAmount: any;
    checkList = [];
    minDate1: any;
    //Commercial Stage Details
    COMPID: any;
    PtidValue = '';
    QuotePrice: any;
    Rating = '';
    CommercialArray = []
    componentListdata: any[] = [];
    //Reverse Details
    StartDate: any;
    EndDate: any;
    FinalPriceDetails: any;
    ReverseNameoftheFirmID = '';
    ReverseQuotePrice: any;
    ReverseRating = '';
    //Tender Sacntioned
    CommericalDataList: any[] = [];
    RefundStatus: any;
    Id: any;
    filteredName: any;
    TenderNameoftheFirmID = ''
    TenderQuotePrice: any;
    TenderRating = '';
    toatlPrice: any;
    // EMD refund details
    filteredNameLevel: any;
    EMDNameoftheFirmID = ''
    PaymentID: any;
    BankName: any;
    CreditAccountNumber: any;
    CreditAccountName: any;
    CreditIFSCCODE: any;
    RefundDate: any;
    RefTransactionID: any;
    Remarks: any;
    ReverseNameOftheList: any[] = [];
    TenderSacntionedNameOftheList: any[] = [];
    EMDNameOftheList: any[] = [];
    Component: any;
    selectfrmdte: any;
    selecttodte: any;
    ModeOfPaymentList: any[] = [];
    RatingLevelList: any[] = [];
    dtOptions: DataTables.Settings = this.utils.dataTableOptions();
    filteredNamePaymentMode: any;
    filteredNameEMDPaymentMode: any;
    dtTrigger: Subject<any> = new Subject();
    pendtTrigger: Subject<any> = new Subject();
    constructor(private toast: ToasterService,
        private utils: UtilsService,
        private session: SessionService,
        private OfficeModuleAPI: OfficeserviceService,
        private spinner: NgxSpinnerService,
        private router: Router) {

        // this.minDate = new Date();
        // this.minDate1 = new Date();

    }
    daysDifference: any;
    ngOnInit(): void {

        if (this.session.uniqueId != "" && this.session.desigId != "") {

            // this.maxDate = new Date();
            // this.minDate = this.TenderDate;
            // this.ReverseNameOfthe();
            // this.TenderSacntionedNameOfthe();
            //this.EMDNameOfthe();
            //this.CommericalGet();
            this.Componentdetails();
            this.ModeOfPayment();
            this.RatingLevel();
        } else {
            this.router.navigate(['/shared/UnAuthorized']);
        }

    }


    onTenderDateChangeOne() {
        debugger;
        if (this.TenderDate) {
            this.minDate = this.TenderDate;
        }
    }



    //dropdown click events
    async ReverseNameOfthe(): Promise<void> {
        try {
            debugger
            const obj = {
                type: "6",
                INPUT_03: this.MaterId
            }
            const res = await this.OfficeModuleAPI.tenderdetails(obj);
            this.spinner.hide();
            if (res.success) {
                this.ReverseNameOftheList = res.result;
                console.log(this.ReverseNameOftheList);
                return;
            } else {
                this.toast.warning(res.message);
                return;
            }
        }
        catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
    }

    async ModeOfPayment(): Promise<void> {
        try {
            debugger
            const obj = {
                type: "23",
            }
            const res = await this.OfficeModuleAPI.tenderdetails(obj);
            this.spinner.hide();
            if (res.success) {
                this.ModeOfPaymentList = res.result;
                console.log(this.ModeOfPaymentList);
                return;
            } else {
                this.toast.warning(res.message);
                return;
            }
        }
        catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
    }

    async RatingLevel(): Promise<void> {
        try {
            debugger
            const obj = {
                type: "24",
            }
            const res = await this.OfficeModuleAPI.tenderdetails(obj);
            this.spinner.hide();
            if (res.success) {
                this.RatingLevelList = res.result;
                console.log(this.RatingLevelList);
                return;
            } else {
                this.toast.warning(res.message);
                return;
            }
        }
        catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
    }

    async CommericalGet(): Promise<void> {
        try {
            debugger
            const obj = {
                type: "22",
                INPUT_03: this.MaterId
            }
            const res = await this.OfficeModuleAPI.tenderdetails(obj);
            this.spinner.hide();
            if (res.success) {
                this.CommericalDataList = res.result;
                console.log(this.CommericalDataList);

                return;
            } else {
                this.toast.warning(res.message);
                return;
            }
        }
        catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
    }


    async Componentdetails(): Promise<void> {
        try {
            debugger;
            const reqdistrict = {
                type: 28,  //9
                //   DISTRICTID:this.RBKDDSelected,
            }
            const res = await this.OfficeModuleAPI.office_po_select(reqdistrict);
            if (res.success) {
                this.componentListdata = res.result;
                console.log(this.componentListdata);
                return;

            } else {
                this.toast.info(res.message);
            }
            this.spinner.hide();
        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
    }

    async componentChange(): Promise<void> {
        try {
            debugger;

            if (this.utils.isEmpty(this.COMPID)) {
                this.toast.warning('Please select Component');
                return;
            }

           // this.TenderdetailsGet();
            this.checkList = [];

            const req = {
                type: 14,
                ID: this.COMPID
            };

            this.spinner.show();
            const res = await this.OfficeModuleAPI.office_po_select(req);
            this.spinner.hide();
            this.checkList = [];
            if (res.success) {

                this.checkList = res.result;


                //this.cid=this.checkList.length;
            } else {
                this.toast.info(res.message);
            }


        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
    }

//itemList


// async TenderdetailsGet(): Promise<void> {
//     try {
//         debugger
//         const obj = {
//             type: "26",
//            // ComponentID:this.COMPID,
//              MaterTenderId:'207'// this.MaterId
//         }
//         const res = await this.OfficeModuleAPI.tenderdetails(obj);
//         this.spinner.hide();
//         if (res.success) {debugger;
//             this.itemList = res.result;
//           //  this.MaterId=res.result[0].NEWTENDER_ID;
//            // console.log(this.CommericalDataList);

//             return;
//         } else {
//             this.toast.warning(res.message);
//             return;
//         }
//     }
//     catch (error) {
//         this.spinner.hide();
//         this.utils.catchResponse(error);
//     }
// }



    async TenderSacntionedNameOfthe(): Promise<void> {
        try {
            const obj = {
                type: "7",
                INPUT_03: this.MaterId
            }
            const res = await this.OfficeModuleAPI.tenderdetails(obj);
            if (res.success) {
                this.TenderSacntionedNameOftheList = res.result;
                console.log(this.TenderSacntionedNameOftheList);
                return;

            } else {
                this.toast.warning(res.message);
                return;
            }
        }
        catch (error) {

            this.spinner.hide();
            this.utils.catchResponse(error);

        }

    }
    async EMDNameOfthe(): Promise<void> {
        try {
            const obj = {
                type: "8",
                INPUT_03: this.MaterId
            }
            const res = await this.OfficeModuleAPI.tenderdetails(obj);
            if (res.success) {
                this.EMDNameOftheList = res.result;
                console.log(this.EMDNameOftheList)
                return;
            } else {
                this.toast.warning(res.message);
                return;
            }
        }
        catch (error) {

            this.spinner.hide();
            this.utils.catchResponse(error);

        }

    }


    Validation(): boolean {
        debugger;
        const condition = false;
        if (this.utils.DataValidationNullorEmptyorUndefined(this.COMPID)) {
            this.toast.warning('Please Select Component ');
            return false;
        }
        if (this.utils.DataValidationNullorEmptyorUndefined(this.TenderId)) {
            this.toast.warning('Please Enter Tender ID');
            return false;
        }

        if (this.utils.DataValidationNullorEmptyorUndefined(this.TenderDate)) {
            this.toast.warning('Please Select Tender Date');
            return false;
        }
        if (this.utils.DataValidationNullorEmptyorUndefined(this.TenderNoticeNumber)) {
            this.toast.warning('Please Enter Tender Notice Number');
            return false;
        }

        if (this.utils.DataValidationNullorEmptyorUndefined(this.NatureofWork)) {
            this.toast.warning('Please Enter Nature of Work');
            return false;
        }
        if (this.utils.DataValidationNullorEmptyorUndefined(this.StartDateandTime)) {
            this.toast.warning('Please Select Bid Document Download Start Date');
            return false;
        }
        if (this.utils.DataValidationNullorEmptyorUndefined(this.ClosingDateandTime)) {
            this.toast.warning('Please Select Bid Submission Closing Date');
            return false;
        }
        // if (this.TenderDate && this.StartDateandTime) {
        //     var from = this.TenderDate;
        //     var to = this.StartDateandTime;
        //     this.selectfrmdte = from; //formatDate(this.fromDate, 'dd-MM-yyyy', 'en-US', '+0530');     
        //     this.selecttodte = to; //formatDate(this.toDate, 'dd-MM-yyyy', 'en-US', '+0530');
        //     if (this.selectfrmdte.split('-')[2] >= this.selecttodte.split('-')[2] && this.selectfrmdte.split('-')[1] >= this.selecttodte.split('-')[1] && this.selectfrmdte.split('-')[0] >= this.selecttodte.split('-')[0]) {


        //     }
        //     else {
        //         this.toast.warning("Please Select Bid Document Download Start Date  Grater  Than Tender Date");
        //         return false;
        //     }



        // }
        // if (this.TenderDate && this.ClosingDateandTime) {
        //     var from = this.TenderDate;
        //     var to = this.ClosingDateandTime;
        //     this.selectfrmdte = from; //formatDate(this.fromDate, 'dd-MM-yyyy', 'en-US', '+0530');     
        //     this.selecttodte = to; //formatDate(this.toDate, 'dd-MM-yyyy', 'en-US', '+0530');
        //     if (this.selectfrmdte.split('-')[2] >= this.selecttodte.split('-')[2] && this.selectfrmdte.split('-')[1] >= this.selecttodte.split('-')[1] && this.selectfrmdte.split('-')[0] >= this.selecttodte.split('-')[0]) {


        //     }
        //     else {
        //         this.toast.warning("Please Select Bid Submission Closing Date   Grater  Than Tender Date");
        //         return false;
        //     }



        // }
        // if (this.StartDateandTime && this.ProcessingPaymentDate) {
        //     var from = this.StartDateandTime;
        //     var to = this.ProcessingPaymentDate;
        //     this.selectfrmdte = from; //formatDate(this.fromDate, 'dd-MM-yyyy', 'en-US', '+0530');     
        //     this.selecttodte = to; //formatDate(this.toDate, 'dd-MM-yyyy', 'en-US', '+0530');
        //     if (this.selectfrmdte.split('-')[2] <= this.selecttodte.split('-')[2] && this.selectfrmdte.split('-')[1] <= this.selecttodte.split('-')[1] && this.selectfrmdte.split('-')[0] <= this.selecttodte.split('-')[0]) {


        //     }
        //     else {
        //         this.toast.warning("Please Select Processing Fee Details  Payment Date  Grater  Than Bid Document Download Start Date ");
        //         return false;
        //     }



        // }
        // if (this.StartDateandTime && this.EMDPaymentDate) {
        //     var from = this.StartDateandTime;
        //     var to = this.EMDPaymentDate;
        //     this.selectfrmdte = from; //formatDate(this.fromDate, 'dd-MM-yyyy', 'en-US', '+0530');     
        //     this.selecttodte = to; //formatDate(this.toDate, 'dd-MM-yyyy', 'en-US', '+0530');
        //     if (this.selectfrmdte.split('-')[2] <= this.selecttodte.split('-')[2] && this.selectfrmdte.split('-')[1] <= this.selecttodte.split('-')[1] && this.selectfrmdte.split('-')[0] <= this.selecttodte.split('-')[0]) {


        //     }
        //     else {
        //         this.toast.warning("Please Select EMD Details  Payment Date  Grater  Than Bid Document Download Start Date ");
        //         return false;
        //     }



        // }

        if (condition) {

        }
        if (this.utils.DataValidationNullorEmptyorUndefined(this.NameOfTheParticipants)) {
            this.toast.warning('Please Enter Name Of The Participants');
            return;
        }

        if (this.utils.DataValidationNullorEmptyorUndefined(this.ProcessingModeofPaymentID)) {
            this.toast.warning('Please Select Processing  Fee Details Mode of Payment');
            return false;
        }
        if (this.utils.DataValidationNullorEmptyorUndefined(this.ProcessingPaymentDate)) {
            this.toast.warning('Please Select Processing  Fee Details Payment Date');
            return false;
        }
        if (this.utils.DataValidationNullorEmptyorUndefined(this.ProcessingAmount)) {
            this.toast.warning('Please Enter Processing  Fee Details Amount ');
            return false;
        }
        if (this.utils.DataValidationNullorEmptyorUndefined(this.EMDModeofPaymentID)) {
            this.toast.warning('Please Select EMD Details Mode of Payment');
            return false;
        }
        if (this.utils.DataValidationNullorEmptyorUndefined(this.EMDPaymentDate)) {
            this.toast.warning('Please Select EMD Details Payment Date');
            return false;
        }
        if (this.utils.DataValidationNullorEmptyorUndefined(this.EMDAmount)) {
            this.toast.warning('Please Enter EMD Details Amount');
            return false;
        }


        return true;

    }
    //click events
    async TenderDetails(): Promise<void> {
        debugger;
        try {
            const condition = false;
            if (this.utils.DataValidationNullorEmptyorUndefined(this.COMPID)) {
                this.toast.warning('Please Select Component ');
                return;
            }
            if (this.utils.DataValidationNullorEmptyorUndefined(this.TenderId)) {
                this.toast.warning('Please Enter Tender ID');
                return;
            }
            if (this.utils.DataValidationNullorEmptyorUndefined(this.TenderDate)) {
                this.toast.warning('Please Select Tender Date');
                return;
            }
            if (this.utils.DataValidationNullorEmptyorUndefined(this.TenderNoticeNumber)) {
                this.toast.warning('Please Enter Tender Notice Number');
                return;
            }
            if (this.utils.DataValidationNullorEmptyorUndefined(this.NatureofWork)) {
                this.toast.warning('Please Enter Nature of Work');
                return;
            }

            if (this.utils.DataValidationNullorEmptyorUndefined(this.StartDateandTime)) {
                this.toast.warning('Please Select Bid Document Download Start Date');
                return;
            }
            if (this.utils.DataValidationNullorEmptyorUndefined(this.ClosingDateandTime)) {
                this.toast.warning('Please Select Bid Submission Closing Date');
                return;
            }
            if (this.itemList === null || this.itemList.length === 0) {
                this.toast.warning('Table Records Data Should not be Empty');
                return;
            }
            // if (this.TenderDate && this.StartDateandTime) {
            //     var from = this.TenderDate;
            //     var to = this.StartDateandTime;
            //     this.selectfrmdte = from; //formatDate(this.fromDate, 'dd-MM-yyyy', 'en-US', '+0530');     
            //     this.selecttodte = to; //formatDate(this.toDate, 'dd-MM-yyyy', 'en-US', '+0530');
            //     if (this.selectfrmdte.split('-')[2] <= this.selecttodte.split('-')[2] && this.selectfrmdte.split('-')[1] <= this.selecttodte.split('-')[1] && this.selectfrmdte.split('-')[0] <= this.selecttodte.split('-')[0]) {


            //     }
            //     else {
            //         this.toast.warning("Please Select Bid Document Download Start Date  Grater  Than Tender Date");
            //         return;
            //     }
            // }
            // if (this.TenderDate && this.ClosingDateandTime) {
            //     var from = this.TenderDate;
            //     var to = this.ClosingDateandTime;
            //     this.selectfrmdte = from; //formatDate(this.fromDate, 'dd-MM-yyyy', 'en-US', '+0530');     
            //     this.selecttodte = to; //formatDate(this.toDate, 'dd-MM-yyyy', 'en-US', '+0530');
            //     if (this.selectfrmdte.split('-')[2] <= this.selecttodte.split('-')[2] && this.selectfrmdte.split('-')[1] <= this.selecttodte.split('-')[1] && this.selectfrmdte.split('-')[0] <= this.selecttodte.split('-')[0]) {


            //     }
            //     else {
            //         this.toast.warning("Please Select Bid Submission Closing Date   Grater  Than Tender Date");
            //         return;
            //     }
            // }
            if (condition) {

            }
            else {
                const obj = {
                    type: "1",
                    ComponentID: this.COMPID,
                    TenderID: this.TenderId,
                    TenderDate: this.TenderDate,
                    TenderNoticenumber: this.TenderNoticeNumber,
                    NatureofWork: this.NatureofWork,
                    BidStartDate: this.StartDateandTime,
                    BidClosingDate: this.ClosingDateandTime,
                    UNIQUEID: this.session.uniqueId,
                    ROLE: this.session.desigId,
                    INSERTEDBY: this.session.userName
                }
                console.log(obj);
                this.spinner.show();
                const res = await this.OfficeModuleAPI.tenderdetails(obj);
                this.spinner.hide();
                if (res.success) {
                    this.DataList = res.result;
                    this.MaterId = this.DataList[0][':B2'];
                    this.ComonentId = this.DataList[0][':B1'];
                    this.UseMethod();
                    return;

                } else {
                    this.spinner.hide();
                    this.toast.warning(res.message);
                    return;
                }

            }

        }
        catch (error) {

            this.spinner.hide();
            this.utils.catchResponse(error);
        }
    }
    //CommercialAdd
    CommercialAdd() {
        debugger;
        if (this.utils.DataValidationNullorEmptyorUndefined(this.PtidValue)) {
            this.toast.warning('Please Select Name of The Participant');
            return;
        }
        if (this.utils.DataValidationNullorEmptyorUndefined(this.QuotePrice)) {
            this.toast.warning('Please Enter Quote Price');
            return;
        }
        if (this.utils.DataValidationNullorEmptyorUndefined(this.Rating)) {
            this.toast.warning('Please Select Rating');
            return;
        }
        else {


            for (const obj of this.CommericalDataList) {
                if (obj.PT_ID === this.PtidValue) {
                    this.filteredName = obj.PARTICIPANT_NAME;
                    break;
                }
            }
            for (const obj of this.RatingLevelList) {
                if (obj.ID === this.Rating) {
                    this.filteredNameLevel = obj.PAYMODE;
                    break;
                }
            }
            const obj = {
                Name: this.filteredName,
                NameoftheFirm: this.PtidValue,
                QuotePrice: this.QuotePrice,
                Rating: this.Rating,
                RatingLevel: this.filteredNameLevel
            }
            console.log(obj);
            this.selectTablesub = true;
            this.CommercialArray.push(obj);
            console.log(this.CommercialArray);
            const selectedIndex = this.CommericalDataList.findIndex(item => item.PT_ID === this.PtidValue);
            if (selectedIndex !== -1) {
                this.CommericalDataList.splice(selectedIndex, 1);
                // Reset the selected value
            }
            this.PtidValue = '';
            this.QuotePrice = '';
            this.Rating = '';
        }
    }
    CommercialremoveData(index: number): void {
        this.CommercialArray.splice(index, 1);

        const removedItem = this.CommercialArray[index];
        if (removedItem) {
            this.CommericalDataList.push(removedItem);
        }
    }
    async CommercialSubmit(): Promise<void> {
        debugger;
        try {
            if (this.CommercialArray === null || this.CommercialArray.length === 0) {
                this.toast.warning('Table Records Data Should not be Empty');
                return;
            }
            else {
                debugger;
                const obj = {
                    type: "2",
                    UNIQUEID: this.session.uniqueId,
                    ROLE: this.session.desigId,
                    INSERTEDBY: this.session.userName,
                    MaterTenderId: this.MaterId,
                    CommercialStageList: this.CommercialArray

                }
                console.log(obj);
                const res = await this.OfficeModuleAPI.Commercialdetails(obj);
                this.spinner.show();
                if (res.success) {
                    this.spinner.hide();
                    this.toast.success(res.message);
                    this.ReverseNameOfthe();
                    this.CommercialArray = [];
                    return;
                } else {
                    this.spinner.hide();
                    this.toast.warning(res.message);
                    return;
                }
            }
        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }


    }

    //reverse submit

    async ReverseSubmit(): Promise<void> {
        try {

            if (this.utils.DataValidationNullorEmptyorUndefined(this.StartDate)) {
                this.toast.warning('Please Select Reverse Auction Date Start Date ');
                return;
            }
            // if (this.utils.DataValidationNullorEmptyorUndefined(this.EndDate)) {
            //     this.toast.warning('Please Select Reverse  Auction Date End Date');
            //     return;
            // }
            if (this.utils.DataValidationNullorEmptyorUndefined(this.startTime)) {
                this.toast.warning('Please Select Start Time');
                return;
            }
            if (this.utils.DataValidationNullorEmptyorUndefined(this.endTime)) {
                this.toast.warning('Please Select End Time');
                return;
            }
            if (this.utils.DataValidationNullorEmptyorUndefined(this.ReverseNameoftheFirmID)) {
                this.toast.warning('Please Select Name of The Participant');
                return;
            }
            if (this.utils.DataValidationNullorEmptyorUndefined(this.FinalPriceDetails)) {
                this.toast.warning('Please Enter Final Price Details');
                return;
            }

            if (this.utils.DataValidationNullorEmptyorUndefined(this.ReverseQuotePrice)) {
                this.toast.warning('Please Enter Quote Price');
                return;
            }
            if (this.utils.DataValidationNullorEmptyorUndefined(this.ReverseRating)) {
                this.toast.warning('Please Select Rating');
                return;
            }
            else {

                const obj = {
                    type: "3",
                    ReverseStartDate: this.StartDate,
                    // ReverseClosingDate: this.EndDate,
                    INPUT_01: this.startTime,
                    INPUT_02: this.endTime,
                    Finalpricedetails: this.FinalPriceDetails,
                    NameoftheFirm: this.ReverseNameoftheFirmID,
                    QuotePrice: this.ReverseQuotePrice,
                    Rating: this.ReverseRating,
                    UNIQUEID: this.session.uniqueId,
                    ROLE: this.session.desigId,
                    INSERTEDBY: this.session.userName,
                    MaterTenderId: this.MaterId,

                }
                console.log(obj);

                this.spinner.show();
                const res = await this.OfficeModuleAPI.tenderdetails(obj);
                if (res.success) {
                    this.spinner.hide();
                    const selectedIndex = this.ReverseNameOftheList.findIndex(item => item.PT_ID === this.ReverseNameoftheFirmID);
                    if (selectedIndex !== -1) {
                        this.ReverseNameOftheList.splice(selectedIndex, 1);
                        // Reset the selected value
                    }
                    this.toast.success(res.message);
                    this.TenderSacntionedNameOfthe();
                    this.StartDate = ''
                    this.EndDate = ''
                    this.FinalPriceDetails = ''
                    this.ReverseNameoftheFirmID = ''
                    this.ReverseQuotePrice = ''
                    this.ReverseRating = ''
                    this.startTime = ''
                    this.endTime = ''
                    return;

                } else {
                    this.spinner.hide();
                    this.toast.warning(res.message);
                    return;
                }



            }
        }
        catch (error) {

            this.spinner.hide();
            this.utils.catchResponse(error);

        }
    }

    //Tende rSacntioned submit


    async TenderSacntioned(): Promise<void> {
        try {
            const condition = false;
            this.toatlPrice = 0;
            debugger;
            if (this.utils.DataValidationNullorEmptyorUndefined(this.TenderNameoftheFirmID)) {
                this.toast.warning('Please Select Name of The Participant');

                return;
            }
            if (this.utils.DataValidationNullorEmptyorUndefined(this.TenderQuotePrice)) {
                this.toast.warning('Please Enter Quote Price');
                return;
            }
            if (this.utils.DataValidationNullorEmptyorUndefined(this.TenderRating)) {
                this.toast.warning('Please Select Rating');
                return;
            }
            if (!this.checkList === null || this.checkList.length > 1) {

                for (let i = 0; i < this.checkList.length; i++) {
                    this.toatlPrice += parseInt((document.getElementById(`txtprice_${i + 1}`) as HTMLInputElement)?.value || '', 10);
                    const inputElement = (document.getElementById(`txtprice_${i + 1}`) as HTMLInputElement)?.value || ''
                    if (this.utils.DataValidationNullorEmptyorUndefined(inputElement)) {
                        this.toast.warning('Please Enter Price');
                        return;
                    }

                }
                console.log(this.toatlPrice);

            }
            if (this.TenderQuotePrice != this.toatlPrice &&  this.checkList.length > 1 ) {
                this.toast.warning('Quote Price value is Not equal to Price of Total');
                return;
            }
            if (condition) {

            }
            else {

                const obj = {
                    type: "4",
                    NameoftheFirm: this.TenderNameoftheFirmID,
                    INPUT_01: this.Id,
                    ComponentID: this.COMPID,
                    QuotePrice: this.TenderQuotePrice,
                    Rating: this.TenderRating,
                    UNIQUEID: this.session.uniqueId,
                    ROLE: this.session.desigId,
                    INSERTEDBY: this.session.userName,
                    MaterTenderId: this.MaterId,
                }
                console.log(obj);
                this.spinner.show();
                const res = await this.OfficeModuleAPI.tenderdetails(obj);
                if (res.success) {
                    const selectedIndex = this.TenderSacntionedNameOftheList.findIndex(item => item.PT_ID === this.TenderNameoftheFirmID);
                    if (selectedIndex !== -1) {
                        this.TenderSacntionedNameOftheList.splice(selectedIndex, 1);
                        // Reset the selected value
                    }
                    this.UseMethodTwo();
                    return;

                } else {
                    this.spinner.hide();
                    this.toast.warning(res.message);
                    return;
                }
            }
        }
        catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);

        }

    }

    //EMD Submit

    async EMDSubmit(): Promise<void> {
        try {


            if (this.utils.DataValidationNullorEmptyorUndefined(this.EMDNameoftheFirmID)) {
                this.toast.warning('Please Select Name of The Participant');
                return;
            }
            if (this.utils.DataValidationNullorEmptyorUndefined(this.PaymentID)) {
                this.toast.warning('Please Enter Payment ID');
                return;
            }
            if (this.utils.DataValidationNullorEmptyorUndefined(this.BankName)) {
                this.toast.warning('Please Enter Bank Name');
                return;
            }
            if (this.utils.DataValidationNullorEmptyorUndefined(this.CreditAccountNumber)) {
                this.toast.warning('Please Enter Credit Account Number');
                return;
            }
            if (this.utils.DataValidationNullorEmptyorUndefined(this.CreditAccountName)) {
                this.toast.warning('Please Enter Credit Account Name');
                return;
            }
            if (this.utils.DataValidationNullorEmptyorUndefined(this.CreditIFSCCODE)) {
                this.toast.warning('Please Enter Credit IFSC CODE');
                return;
            }
            if (this.utils.DataValidationNullorEmptyorUndefined(this.RefundStatus)) {
                this.toast.warning('Please Enter  Refund Status');
                return;
            }
            if (this.utils.DataValidationNullorEmptyorUndefined(this.RefundDate)) {
                this.toast.warning('Please Select Refund Date');
                return;
            }
            if (this.utils.DataValidationNullorEmptyorUndefined(this.RefTransactionID)) {
                this.toast.warning('Please Enter Ref Transaction ID');
                return;
            }
            else {

                const obj = {
                    type: "5",
                    NameoftheFirm: this.EMDNameoftheFirmID,
                    PaymentID: this.PaymentID,
                    BankName: this.BankName,
                    CreditAccountNumber: this.CreditAccountNumber,
                    CreditAccountName: this.CreditAccountName,
                    CreditIFSCCODE: this.CreditIFSCCODE,
                    RefundStatus: this.RefundStatus,
                    RefundDate: this.RefundDate,
                    RefTransactionID: this.RefTransactionID,
                    Remarks: this.Remarks,
                    UNIQUEID: this.session.uniqueId,
                    ROLE: this.session.desigId,
                    INSERTEDBY: this.session.userName,
                    MaterTenderId: this.MaterId,
                }
                console.log(obj);
                this.spinner.show();
                const res = await this.OfficeModuleAPI.tenderdetails(obj);
                if (res.success) {
                    this.spinner.hide();
                    this.toast.success(res.message);
                    const selectedIndex = this.EMDNameOftheList.findIndex(item => item.PT_ID === this.EMDNameoftheFirmID);
                    if (selectedIndex !== -1) {
                        this.EMDNameOftheList.splice(selectedIndex, 1);
                        // Reset the selected value
                    }
                    this.PaymentID = ''
                    this.EMDNameoftheFirmID = ''
                    this.BankName = ''
                    this.CreditAccountNumber = ''
                    this.CreditAccountName = ''
                    this.CreditIFSCCODE = ''
                    this.RefundDate = ''
                    this.RefTransactionID = ''
                    this.Remarks = ''
                    this.RefundStatus = ''
                    return;
                } else {
                    this.spinner.hide();
                    this.toast.warning(res.message);
                    return;
                }
            }
        }
        catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }

    }




    //Event validations

    keyPressAlphaNumericWithCharacters(event: any) {

        var inp = String.fromCharCode(event.keyCode);
        // Allow numbers, alpahbets
        if (/[a-zA-Z0-9]/.test(inp)) {
            return true;
        } else {
            event.preventDefault();
            return false;
        }
    }

    keyPressCharacters(event: any) {
        var inp = String.fromCharCode(event.keyCode);
        if (/[a-zA-Z]/.test(inp)) {
            return true;
        } else {
            event.preventDefault();
            return false;
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

    decimalFilter(event: any) {
        const reg = /^-?\d*(\.\d{0,2})?$/;
        let input = event.target.value + String.fromCharCode(event.charCode);

        if (!reg.test(input)) {
            event.preventDefault();
        }
    }


    addItem() {
        try {
            debugger;

            if (this.Validation()) {

                for (const obj of this.ModeOfPaymentList) {
                    if (obj.ID === this.ProcessingModeofPaymentID) {
                        this.filteredNamePaymentMode = obj.PAYMODE;
                        break;
                    }

                }
                for (const obj of this.ModeOfPaymentList) {
                    if (obj.ID === this.EMDModeofPaymentID) {
                        this.filteredNameEMDPaymentMode = obj.PAYMODE;
                        break;
                    }

                }

                const participant = {
                    NameOfTheParticipants: this.NameOfTheParticipants,
                    ComponentID: this.COMPID,
                    ProcessingPayment: this.ProcessingModeofPaymentID,
                    ProcessingDate: this.ProcessingPaymentDate,
                    ProcessingAmount: this.ProcessingAmount,
                    EMDPayment: this.EMDModeofPaymentID,
                    EMDDate: this.EMDPaymentDate,
                    EMDAmount: this.EMDAmount,
                    UNIQUEID: this.session.uniqueId,
                    ROLE: this.session.desigId,
                    INSERTEDBY: this.session.userName,
                    EmdPaymentName: this.filteredNameEMDPaymentMode,
                    ProcessPayment: this.filteredNamePaymentMode // Replace 'thisComid' with the actual value you want to use
                };
                console.log(participant);
                this.itemList.push(participant);
                this.ProcessingModeofPaymentID = ''
                this.NameOfTheParticipants = ''
                this.ProcessingPaymentDate = ''
                this.ProcessingAmount = ''
                this.EMDModeofPaymentID = ''
                this.EMDPaymentDate = ''
                this.EMDAmount = ''
                this.selectTablesubTender = true;
                //console.log(this.itemList);

            }

        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
            return;
        }

    }



    removeItem(index: number): void {
        this.itemList.splice(index, 1);
    }

    async UseMethod(): Promise<void> {
debugger;
        const req = {
            type: "17",
            UNIQUEID: this.session.uniqueId,
            ROLE: this.session.desigId,
            INSERTEDBY: this.session.userName,
            MaterTenderId: this.MaterId,
            TenderSubNamesList: this.itemList
        }
        console.log(req);
        const res = await this.OfficeModuleAPI.TenderSubNames(req);
        if (res.success) {
            // this.DataList1 = res.result;
            // this.Id = this.DataList1[0][':B1'];
            // console.log(this.Id);
            // console.log(res.result)
            this.spinner.hide();
            this.NameOfTheParticipants = ''
            this.toast.success(res.message);
            this.TenderId = ''
            this.TenderDate = ''
            this.TenderNoticeNumber = ''
            this.NatureofWork = ''
            this.itemList = []
            this.StartDateandTime = ''
            this.ClosingDateandTime = ''
            this.ProcessingModeofPaymentID = ''
            this.ProcessingPaymentDate = ''
            this.ProcessingAmount = ''
            this.EMDModeofPaymentID = ''
            this.EMDPaymentDate = ''
            this.EMDAmount = ''
            this.CommericalGet();
            return;
        }
        else {
            this.spinner.hide();
            this.toast.warning(res.message);
            return;
        }

    }

    async UseMethodTwo(): Promise<void> {

        const dataToSend = this.checkList.map((obj, i) => ({
            ComponentID: this.COMPID,
            SubComponentID: obj.COMPID,
            Price: (document.getElementById(`txtprice_${i + 1}`) as HTMLInputElement)?.value || '', // Get the input value by ID
        }));
        const req =
        {
            type: "15",
            MaterTenderId: this.MaterId,
            UNIQUEID: this.session.uniqueId,
            ROLE: this.session.desigId,
            INSERTEDBY: this.session.userName,
            TenderSubComponentList: dataToSend
        }
        console.log(req);
        const res = await this.OfficeModuleAPI.TenderSubComponent(req);
        if (res.success) {
            this.spinner.hide();
            this.toast.success(res.message);
            this.EMDNameOfthe();
            this.TenderNameoftheFirmID = ''
            this.TenderQuotePrice = ''
            this.TenderRating = '';
            const dataToSend = this.checkList.map((obj, i) => ({
                Price: (document.getElementById(`txtprice_${i + 1}`) as HTMLInputElement).value = ''
            }));


            return;
        }
        else this.spinner.hide();
        this.toast.warning(res.message);
        return;
    }

}




