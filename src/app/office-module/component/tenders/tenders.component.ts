import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { OfficeserviceService } from '../../services/officeservice.service';

@Component({
  selector: 'app-tenders',
  templateUrl: './tenders.component.html',
  styleUrls: ['./tenders.component.css']
})
export class TendersComponent implements OnInit {
    ProcedingFile: any;fyID:any;ctype:any;
    Remarksdts: any;
  clickone = false;
  clicktwo = false;
  clickthree = false; 
  clickfour = false;
  clickfive = false;
  clicksix = false;
  ReverseActionList: any[] = []; Financialyeardata: any[] = [];
  TenderSancationList: any[] = [];
  EMDList: any[] = [];
  DataList1: any[] = [];
  TenderDataList: any[] = [];
  COMMERCIALLIST: any[] = [];
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
  daysDifference: any;
  dtTrigger: Subject<any> = new Subject();
  pendtTrigger: Subject<any> = new Subject();
  constructor(
      private toast: ToasterService,
      private utils: UtilsService,
      private session: SessionService,
      private OfficeModuleAPI: OfficeserviceService,
      private spinner: NgxSpinnerService,
      private router: Router
  ) { }

  ngOnInit(): void {
      debugger;
      if (this.session.uniqueId != "" && this.session.desigId != "") {
          this.TenderDetailsClick('1');
          // this.maxDate = new Date();
          // this.minDate = this.TenderDate;
          // this.ReverseNameOfthe();
          // this.TenderSacntionedNameOfthe();
 


          //this.EMDNameOfthe();
          //this.CommericalGet();
         // this.Componentdetails();
          this.ModeOfPayment();
          this.RatingLevel();
          this.Financialyeardetails();
      } else {
          this.router.navigate(['/shared/UnAuthorized']);
      }
  }
  async fyIDChange(): Promise<void> {
    try { 

      if (this.utils.isEmpty(this.fyID)) {
        this.toast.warning('Please select Financial Year');          
        return;
      } 
      this.Componentdetails(); 
      
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  } 

  async TenderDetailsClick(id): Promise<void> {
      try {
          if (id === '1') {
              this.clickone = true;
              this.clicktwo = false;
              this.clickthree = false;
              this.clickfour = false;
              this.clickfive = false;
              
              this.clicksix = false;
              // this.Componentdetails();
          }
          else if (id === '2') {
              this.clickone = false;
              this.clicktwo = true;
              this.clickthree = false;
              this.clickfour = false;
              this.clickfive = false;
              this.clicksix = false;
              this.NameParticipantCommercial();
              this.CommercialGridList()
          }

          else if (id === '3') {
              this.clickone = false;
              this.clicktwo = false;
              this.clickthree = true;
              this.clickfour = false;
              this.clickfive = false;
              this.clicksix = false;
              this.ReverseDropDown()
              this.ReverseGridList();
          }

          else if (id === '4') {
              this.clickone = false;
              this.clicktwo = false;
              this.clickthree = false;
              this.clickfour = true;
              this.clickfive = false;
              this.clicksix = false;
              this.TenderSancationDropdown();
              this.TenderSancationGridList();
          }
          else if (id === '5') {
              this.clickone = false;
              this.clicktwo = false;
              this.clickthree = false;
              this.clickfour = false;
              this.clickfive = true;
              this.clicksix = false;
              this.EMDDropdown();
              this.EMDGridList();
          }

          else if (id === '6') {
            this.clickone = false;
            this.clicktwo = false;
            this.clickthree = false;
            this.clickfour = false;
            this.clickfive = false;
            this.clicksix = true;
            
        }

      } catch (error) {

      }

  }

  async Financialyeardetails(): Promise<void> {  
    try {           
      const reqdistrict={
        type:38, 
        id:22,
      };   this.spinner.show();
      const res = await this.OfficeModuleAPI.office_po_select(reqdistrict); 
      if (res.success) {  this.spinner.hide();
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

  async ProcedingSubmit(): Promise<void> {
    try {

        if (this.utils.DataValidationNullorEmptyorUndefined(this.MaterId)) {
            this.toast.info("Please Select Tender Details Component");
            return;
        }

        if (this.utils.DataValidationNullorEmptyorUndefined(this.Remarksdts)) {
            this.toast.info("Please Enter  Remarksdts");
            return;
        }
        if (this.utils.DataValidationNullorEmptyorUndefined(this.ProcedingFile)) {
            this.toast.info("Please Select Proceding File");
            return;
        }
        else {
            const obj = {
                type: "1",
                ProceedingDetails: this.Remarksdts,
                Proceedingfilepath: this.ProcedingFile,
                INPUT_03: this.MaterId,
                UNIQUEID: this.session.uniqueId,
                ROLE: this.session.desigId,
                INSERTEDBY: this.session.userName,
            }
            debugger;
            this.spinner.show();
            const res = await this.OfficeModuleAPI.office_Budget_Sub(obj)
            if (res.success) {
                this.spinner.hide();
                this.toast.info(res.message);
                this.clearFileds();
                return;
            }
            else {
                this.spinner.hide();
                this.toast.warning(res.message);
                return;
            }
        }
    } catch (error) {
        this.spinner.hide();
        this.utils.catchResponse(error);
        return;
    }


}

async Procedingchange(event): Promise<void> {
    try {
        debugger;

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
                this.utils.fileSize.twoMB   //fiftyMB
            );
            if (!this.utils.isEmpty(res)) {
                this.ProcedingFile = res.split('base64,')[1];
            }
        }
    } catch (error) {
        this.toast.warning('Upload  pdf');
    }
}

clearFileds() {
    this.Remarksdts = ''
    this.ProcedingFile = ''
}

  onTenderDateChangeOne() {
      debugger;
      if (this.TenderDate) {
          this.minDate = this.TenderDate;
      }
  }

  //CTYPEChange
  async CTYPEChange(): Promise<void> {
    try { debugger;
       if(this.ctype==='3')
       {
        document.getElementById('PaymentID').setAttribute("disabled","disabled");
        document.getElementById('BankName').setAttribute("disabled","disabled");
        document.getElementById('CreditIFSCCODE').setAttribute("disabled","disabled");
        document.getElementById('CreditAccountNumber').setAttribute("disabled","disabled");
        document.getElementById('CreditAccountName').setAttribute("disabled","disabled");
        document.getElementById('RefundStatus').setAttribute("disabled","disabled");
        document.getElementById('RefundDate').setAttribute("disabled","disabled");


    //    document.getElementById('PaymentID').style.display = "none";
    //    document.getElementById('bn').style.display = "none";
    //    document.getElementById('cn').style.display = "none";  
       }
       else
       {
        document.getElementById('PaymentID').removeAttribute("disabled");       
        document.getElementById('BankName').removeAttribute("disabled");
        document.getElementById('CreditIFSCCODE').removeAttribute("disabled");
        document.getElementById('CreditAccountNumber').removeAttribute("disabled");
        document.getElementById('CreditAccountName').removeAttribute("disabled");
        document.getElementById('RefundStatus').removeAttribute("disabled");
        document.getElementById('RefundDate').removeAttribute("disabled");
       }
       
    } catch (error) {
        this.spinner.hide();
        this.utils.catchResponse(error);
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
          const res = await this.OfficeModuleAPI.Reverseauction_select(obj);
          this.spinner.hide();
          if (res.success) {
              this.ReverseNameOftheList = res.result;
              //console.log(this.ReverseNameOftheList);
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
          const res = await this.OfficeModuleAPI.Commstage_select(obj);
          this.spinner.hide();
          if (res.success) {
              this.ModeOfPaymentList = res.result;
              //console.log(this.ModeOfPaymentList);
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
          const res = await this.OfficeModuleAPI.TrenderDetails_select(obj);
          this.spinner.hide();
          if (res.success) {
              this.RatingLevelList = res.result;
              //console.log(this.RatingLevelList);
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
          this.CommericalDataList = [];
          const obj = {
              type: "22",
              INPUT_03: this.MaterId
          }; this.spinner.show();
          const res = await this.OfficeModuleAPI.Commstage_select(obj);
          this.spinner.hide();
          if (res.success) {
              this.CommericalDataList = res.result;
              //console.log(this.CommericalDataList);

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
        this.componentListdata =[];
          const reqdistrict = {
              type: 311,//28,  //9
                Id:this.fyID,
                UNIQUEID:this.session.uniqueId,
                ROLE:this.session.desigId,
              //   DISTRICTID:this.RBKDDSelected,

          }
          const res = await this.OfficeModuleAPI.office_po_select(reqdistrict); 
          if (res.success) {
              this.componentListdata = res.result;
              //console.log(this.componentListdata);
              this.COMPID=undefined;
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


  async CommercialGridList(): Promise<void> {

      try {

          const req = {
              type: "28",
              MaterTenderId: this.MaterId
          };

          this.spinner.show();
          const res = await this.OfficeModuleAPI.Commstage_select(req);

          this.spinner.hide();
          this.COMMERCIALLIST = [];
          if (res.success) {
              this.COMMERCIALLIST = res.result;
              console.log(this.COMMERCIALLIST);




          } else {
              // this.toast.info(res.message);
          }

      } catch (error) {
          this.spinner.hide();
          this.utils.catchResponse(error);
      }
  }

  async NameParticipantCommercial(): Promise<void> {

      try {


          const req = {
              type: "27",
              MaterTenderId: this.MaterId
          };

          this.spinner.show();
          const res = await this.OfficeModuleAPI.Commstage_select(req);
          this.spinner.hide();
          this.CommericalDataList = [];
          if (res.success) {
              this.CommericalDataList = res.result;



              //  console.log(this.CommericalDataList)

          } else {
              // this.toast.info(res.message);
          }

      } catch (error) {
          this.spinner.hide();
          this.utils.catchResponse(error);
      }
  }

  async TenderDataNames(): Promise<void> {

      try {

          this.TenderDataList = [];
          const req = {
              type: "26",
              MaterTenderId: this.MaterId
          };

          this.spinner.show();
          const res = await this.OfficeModuleAPI.TrenderDetails_select(req);
          this.spinner.hide();
          this.TenderDataList = [];
          if (res.success) {
              this.TenderDataList = res.result;



          } else {
              // this.toast.info(res.message);
          }

      } catch (error) {
          this.spinner.hide();
          this.utils.catchResponse(error);
      }
  }

  async ReverseDropDown(): Promise<void> {

      try {

          this.ReverseNameOftheList = [];
          const req = {
              type: "29",
              MaterTenderId: this.MaterId
          };

          this.spinner.show();
          const res = await this.OfficeModuleAPI.Reverseauction_select(req);
          this.spinner.hide();

          if (res.success) {
              this.ReverseNameOftheList = res.result;
              // console.log(this.ReverseNameOftheList);


          } else {
              // this.toast.info(res.message);
          }

      } catch (error) {
          this.spinner.hide();
          this.utils.catchResponse(error);
      }
  }

  async ReverseGridList(): Promise<void> {

      try {

          this.ReverseActionList = [];
          const req = {
              type: "30",
              MaterTenderId: this.MaterId
          };
          this.spinner.show();
          const res = await this.OfficeModuleAPI.Reverseauction_select(req);
          this.spinner.hide();
          if (res.success) {

              this.ReverseActionList = res.result;
              //console.log(this.ReverseActionList);




          } else {
              // this.toast.info(res.message);
          }

      } catch (error) {
          this.spinner.hide();
          this.utils.catchResponse(error);
      }
  }

  async TenderData(): Promise<void> {

      try {
          const req = {
              type: "25",
              ComponentID: this.COMPID
          };
          this.spinner.show();
          const res = await this.OfficeModuleAPI.TrenderDetails_select(req);
          this.spinner.hide();

          if (res.success) {
              this.TenderId = res.result[0].TENDER_ID;
              this.TenderDate = res.result[0].TENDER_DATE;
              this.TenderNoticeNumber = res.result[0].TENDER_NOTICE_NO;
              this.NatureofWork = res.result[0].NATURE_OF_WORK;
              this.StartDateandTime = res.result[0].BID_START_DOC;
              this.ClosingDateandTime = res.result[0].BID_CLOSE_DOC;
              this.MaterId = res.result[0].NEWTENDER_ID;
              //this.TenderDataList = res.result;
              //console.log(this.TenderDataList)
              this.TenderDataNames();





          } else {
              //this.toast.info(res.message);
          }
          this.NameParticipantCommercial();

      } catch (error) {
          this.spinner.hide();
          this.utils.catchResponse(error);
      }
  }

  async TenderSancationDropdown(): Promise<void> {

      try {
debugger;

          const req = {
              type: "31",
              MaterTenderId: this.MaterId
          };

          this.spinner.show();
          const res = await this.OfficeModuleAPI.Tendersaction_select(req);
          this.spinner.hide();
          if (res.success) {
              this.TenderSacntionedNameOftheList = res.result;
              //console.log(this.TenderSacntionedNameOftheList);

          } else {
              // this.toast.info(res.message);
          }

      } catch (error) {
          this.spinner.hide();
          this.utils.catchResponse(error);
      }
  }

  async TenderSancationGridList(): Promise<void> {

      try {

          this.TenderSancationList = [];
          const req = {
              type: "32",
              MaterTenderId: this.MaterId
          };

          this.spinner.show();
          const res = await this.OfficeModuleAPI.Tendersaction_select(req);
          this.spinner.hide();

          if (res.success) {
              this.TenderSancationList = res.result;
              // console.log(this.TenderSancationList)



          } else {
              // this.toast.info(res.message);
          }

      } catch (error) {
          this.spinner.hide();
          this.utils.catchResponse(error);
      }
  }
  async EMDDropdown(): Promise<void> {

      try {
          const req = {
              type: "33",
              MaterTenderId: this.MaterId
          };

          this.spinner.show();
          const res = await this.OfficeModuleAPI.Emdrefund_select(req);
          this.spinner.hide();
          if (res.success) {
              this.EMDNameOftheList = res.result;
              //console.log(this.EMDNameOftheList);


          } else {
              // this.toast.info(res.message);
          }

      } catch (error) {
          this.spinner.hide();
          this.utils.catchResponse(error);
      }
  }

  async EMDGridList(): Promise<void> {

      try {
          this.EMDList = [];
          const req = {
              type: "34",
              MaterTenderId: this.MaterId
          };
          this.spinner.show();
          const res = await this.OfficeModuleAPI.Emdrefund_select(req);
          this.spinner.hide();

          if (res.success) {
              this.EMDList = res.result;
              //console.log(this.EMDList);

          } else {
              // this.toast.info(res.message);
          }

      } catch (error) {
          this.spinner.hide();
          this.utils.catchResponse(error);
      }
  }
  async clearcontrols(): Promise<void> {

      try {

          this.TenderId = '';
          this.TenderDate = '';
          this.TenderNoticeNumber = '';
          this.NatureofWork = '';
          this.StartDateandTime = '';
          this.ClosingDateandTime = '';
          this.MaterId = '';
          this.TenderDataList = [];

      } catch (error) {
          this.spinner.hide();
          this.utils.catchResponse(error);
      }
  }



  async componentChange(): Promise<void> {
      try {
          debugger;
          this.NameOfTheParticipants = ''
          this.StartDateandTime = ''
          this.ClosingDateandTime = ''
          this.ProcessingModeofPaymentID = ''
          this.ProcessingPaymentDate = ''
          this.ProcessingAmount = ''
          this.EMDModeofPaymentID = ''
          this.EMDPaymentDate = ''
          this.EMDAmount = ''
          if (this.utils.isEmpty(this.COMPID)) {
              this.toast.warning('Please select Component');
              return;
          }

          this.checkList = [];

          this.clearcontrols();

          const req = {
              type: 14,
              ID: this.COMPID
          };
debugger;
          this.spinner.show();
          const res = await this.OfficeModuleAPI.office_po_select(req);
          this.spinner.hide();
          this.checkList = [];
          if (res.success) {

              this.checkList = res.result;

              //this.cid=this.checkList.length;
          } else {
              // this.toast.info(res.message);
          }

          this.TenderData();

      } catch (error) {
          this.spinner.hide();
          this.utils.catchResponse(error);
      }
  }


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
      //     if (this.selectfrmdte.split('-')[2] <= this.selecttodte.split('-')[2] && this.selectfrmdte.split('-')[1] <= this.selecttodte.split('-')[1] && this.selectfrmdte.split('-')[0] <= this.selecttodte.split('-')[0]) {


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
      //     if (this.selectfrmdte.split('-')[2] <= this.selecttodte.split('-')[2] && this.selectfrmdte.split('-')[1] <= this.selecttodte.split('-')[1] && this.selectfrmdte.split('-')[0] <= this.selecttodte.split('-')[0]) {


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
          if (this.MaterId != "" && this.MaterId != undefined && this.MaterId != null) {
              this.UseMethod();
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
                  INSERTEDBY: this.session.userName,
                  INPUT_01:this.fyID
              }
              console.log(obj);
              this.spinner.show();
              const res = await this.OfficeModuleAPI.tenderdetails(obj);
              this.spinner.hide();
              if (res.success) {
                  //this.TenderDetailsClick('2');
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
                  this.filteredName = obj.NAME_OF_THE_PARTICIPANT;
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
  // CommercialremoveData(index: number): void {
  //     this.CommercialArray.splice(index, 1);

  //     const removedItem = this.CommercialArray[index];
  //     if (removedItem) {
  //         this.CommericalDataList.push(removedItem);
  //     }
  // }
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
                  this.toast.info(res.message);
                  //this.ReverseNameOfthe();
                  this.CommercialGridList();
                  this.ReverseDropDown();
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
          debugger;
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
                  // const selectedIndex = this.ReverseNameOftheList.findIndex(item => item.PT_ID === this.ReverseNameoftheFirmID);
                  // if (selectedIndex !== -1) {
                  //     this.ReverseNameOftheList.splice(selectedIndex, 1);
                  //     // Reset the selected value
                  // }
                  this.toast.info(res.message);
                  //this.TenderSacntionedNameOfthe();
                  this.ReverseGridList();
                  this.TenderSancationDropdown();
                 // this.StartDate = ''
                  this.EndDate = ''
                  this.FinalPriceDetails = ''
                  this.ReverseNameoftheFirmID = ''
                  this.ReverseQuotePrice = ''
                  this.ReverseRating = ''
               //   this.startTime = ''
               //   this.endTime = ''
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
          if (this.TenderQuotePrice != this.toatlPrice && this.checkList.length > 1) {
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
                  // const selectedIndex = this.TenderSacntionedNameOftheList.findIndex(item => item.PT_ID === this.TenderNameoftheFirmID);
                  // if (selectedIndex !== -1) {
                  //     this.TenderSacntionedNameOftheList.splice(selectedIndex, 1);
                  //     // Reset the selected value
                  // }
                  this.TenderSancationGridList();
                  this.EMDDropdown();
                  if (this.checkList.length > 1) {
                      this.UseMethodTwo();
                  }
                  this.toast.info(res.message);
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
          debugger;

          if (this.utils.DataValidationNullorEmptyorUndefined(this.EMDNameoftheFirmID)) {
              this.toast.warning('Please Select Name of The Participant');
              return;
          }
          if(this.ctype!='3')
          {

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
          
        }
        else
        {
            this.PaymentID="0";
            this.BankName="0";
            this.CreditAccountNumber="0";
            this.CreditAccountName="0";
            this.CreditIFSCCODE="0";
            this.RefundStatus="0";
            

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
                  this.toast.info(res.message);
                  // const selectedIndex = this.EMDNameOftheList.findIndex(item => item.PT_ID === this.EMDNameoftheFirmID);
                  // if (selectedIndex !== -1) {
                  //     this.EMDNameOftheList.splice(selectedIndex, 1);
                  //     // Reset the selected value
                  // }
                  this.EMDGridList();
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
      const res = await this.OfficeModuleAPI.TenderNameOftheParticipatesSub(req);
      if (res.success) {debugger;

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
          //this.CommericalGet();
          this.TenderDataNames();
          this.NameParticipantCommercial();
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
          tpid:obj.TPID,
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
          // this.toast.success(res.message);
          // this.EMDNameOfthe();

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


