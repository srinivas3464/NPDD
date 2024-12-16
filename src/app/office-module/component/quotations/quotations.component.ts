import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { OfficeserviceService } from '../../services/officeservice.service';

@Component({
  selector: 'app-quotations',
  templateUrl: './quotations.component.html',
  styleUrls: ['./quotations.component.css']
})
export class QuotationsComponent implements OnInit {
  t1:any;PAYMODEID1 = true;BANKGUARANTEEPATH:any;docPATH:any;Financialyeardata= [];fyID:any;negotiablestatus:any;
  Firmdata= [];RatingLevelList=[];ReqDesc:any;ReqUpload:any;qutdesc:any;qutdescUpload:any;STAMPRECEIPTPATH=null; ReqUpload_path  =null; 
  clickone=false;clickTwo=false;clickThree=false;clickFour=false;clickFive=false;negotiableList: any[] = [];ReqList: any[] = [];
  quotriceList: any[] = [];firmdtsList: any[] = [];FIRMID:any;FIRMID1:any;StatusID:any;ApprovlasStatusID:any;Rating:any;ApproveddetailsList: any[] = [];
  firmname:any;   firmadd:any;   gst:any;   rate :any;fyIDrice:any;fyIDFIRM:any;
  paytermaddress:any;paytermgst:any;paytermrate:any;

  PAYMODEID2 = true; 
  constructor(private toast: ToasterService,
    private utils: UtilsService,  
    private session: SessionService, 
    private OfficeModuleAPI: OfficeserviceService, 
    private spinner: NgxSpinnerService,  private router: Router ) { }

  ngOnInit(): void {
    if (this.session.uniqueId != "" && this.session.desigId != "") {
      this.RatingLevel();
      this.ReqDetails();
      this.ComponentClick("1");
    } else {
      this.router.navigate(['/shared/UnAuthorized']);
  }

   
  }
 
  async ComponentClick(id): Promise<void> { debugger;

    this.clickone = false;
    this.clickTwo = false;
    this.clickThree=false;
    this.clickFour=false;
    this.clickFive=false;
    this.Financialyeardetails();
    this.fyID=undefined;

    if (id === "1") {
      this.ReqUpload="";
      this.ReqDesc="";
      this.fyID;
        this.clickone = true;
        // this.clickTwo = false;
        // this.clickThree=false;
        // this.clickFour=false;
        // this.clickFive=false;
        //this.Financialyeardetails();
        this.ReqDetails();
    }
    else if (id === "2") {
      this.qutdesc="";
       // this.clickone = false;
        this.clickTwo = true;
        // this.clickThree=false;
        // this.clickFour=false;
        // this.clickFive=false;
        // this.Financialyeardetails();
        this.quotriceDetails();
    }
    else if (id === "3") {
      this.firmname="";
      this.firmadd="";
      this.gst="";
      this.rate="";
      // this.clickone = false;
      // this.clickTwo = false;
      this.clickThree=true;
     // this.clickFour=false;
  //this.clickFive=false;
  this.firmdtsDetails();
  }
  else if (id === "4") {
    this.paytermaddress="";
    this.paytermgst="";
    this.paytermrate="";
    this.negotiablestatus="";
    // this.clickone = false;
    // this.clickTwo = false;
    // this.clickThree=false;
    this.clickFour=true;
  //this.clickFive=false;
  //this.Financialyeardetails();
   this.firmdtsDetails();
   this.negotiablestatuslist();
   this.FIRMID=undefined;
}
else if (id === "5") {
  // this.clickone = false;
  // this.clickTwo = false;
  // this.clickThree=false;
  // this.clickFour=false;
  this.clickFive=true;
  //this.Financialyeardetails();
  this.firmdtsDetails();
  this.Approveddetailslist();
  
}
}
async Financialyeardetails(): Promise<void> {  
  try {           
    const reqdistrict={ 
      type:371, 
     // id:22,
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

async Firmdetails(): Promise<void> {  
  try {            this.Firmdata  = [];
    const reqdistrict={
      type:37, 
    };   this.spinner.show();
    const res = await this.OfficeModuleAPI.office_po_select(reqdistrict); 
    if (res.success) {  this.spinner.hide();
      this.  Firmdata  = res.result; 
    } else {
      this.toast.info(res.message);
    }
    this.spinner.hide();
  } catch (error) {
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

async ondocguarantee(event): Promise<void> {
  try {  this.docPATH='';
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
  
  if(element.files[0].name.split('.').length.toString()!=='2')      
  { this.toast.warning('Please Upload PDF files only');    
  event.target.value = '';
return;
  }else{

    const res: any = await this.utils.encodedString(
      event,
      this.utils.fileType.PDF,
      this.utils.fileSize.fiftyMB
    );
    if (!this.utils.isEmpty(res)) {  
       this.docPATH= res.split('base64,')[1];
    }
  }
  } catch (error) { this.toast.warning('Please Select pdf'); 
  }
}

  async onbankguarantee(event): Promise<void> {
    try {  this.qutdescUpload='';
      const element = event.currentTarget as HTMLInputElement;
      let fileList: FileList | null = element.files;
    
    if(element.files[0].name.split('.').length.toString()!=='2')      
    { this.toast.warning('Please Upload PDF files only');    
    event.target.value = '';
  return;
    }else{
  
      const res: any = await this.utils.encodedString(
        event,
        this.utils.fileType.PDF,
        this.utils.fileSize.fiftyMB
      );
      if (!this.utils.isEmpty(res)) {  
         this.qutdescUpload= res.split('base64,')[1];
      }
    }
    } catch (error) { this.toast.warning('Please Select pdf'); 
    }
  }  

  async SubComponentsSubmit(): Promise<void> {
    try {

       
        debugger;
        if (this.utils.DataValidationNullorEmptyorUndefined(this.negotiablestatus)) {
            this.toast.info("Please Select Components");
            return;
        }

      
    } catch (ex) {
      
    }
  }

  async Quotationadd(): Promise<void> {
    try {

       
      if (this.utils.DataValidationNullorEmptyorUndefined(this.fyID)) {
        this.toast.info("Please select financial year");
        return;
    }
        if (this.utils.DataValidationNullorEmptyorUndefined(this.ReqDesc)) {
            this.toast.info("Please Enter Requirement Details");
            return;
        }

        if (this.utils.DataValidationNullorEmptyorUndefined(this.ReqUpload)) {
          this.toast.info("Please select file upload");
          return;
      }
      debugger;

      const req = {
        TYPE: "1",
                  FINANCIAL_YEAR: this.fyID,
                  REQUIREMENT_DESCRIPTION:this.ReqDesc,
                  RD_IMAGE_PATH:this.ReqUpload_path,
                  ROLE:this.session.desigId,
                  UNIQUEID:this.session.uniqueId, 
              };
              this.spinner.show();
              const res = await this.OfficeModuleAPI.office_Quotion_Sub(req);
              this.spinner.hide();
              if (res.success) { debugger;
                this.toast.info(res.message);
                  this.ReqDesc="";
                 // this.Financialyeardetails();
                 this.ComponentClick("1");
              } else {
                  this.toast.info(res.message);
              }
              this.spinner.hide();

debugger;
      
    } catch (ex) {
      
    }
  } 

  async Quriceadd(): Promise<void> {
    try {

       
      if (this.utils.DataValidationNullorEmptyorUndefined(this.qutdesc)) {
        this.toast.info("Please Enter Description");
        return;
    }
    
    if (this.utils.DataValidationNullorEmptyorUndefined(this.fyIDrice)) {
      this.toast.info("Please select Financial Year");
      return;
  }

        if (this.utils.DataValidationNullorEmptyorUndefined(this.qutdescUpload)) {
          this.toast.info("Please select file upload");
          return;
      }

     
      const req = {
        TYPE: "2",
                  FINANCIAL_YEAR: this.fyIDrice,
                  QUOTATION_DESCRIPTION:this.qutdesc,
                  QUOTATION_IMAGE_PATH:this.qutdescUpload,
                  ROLE:this.session.desigId,
                  UNIQUEID:this.session.uniqueId,  
              };
              this.spinner.show();debugger;
              const res = await this.OfficeModuleAPI.office_Quotion_Sub(req);
              this.spinner.hide();
              if (res.success) { debugger;
                this.toast.info(res.message);
                  this.ReqDesc="";
                 // this.Financialyeardetails();
                 this.ComponentClick("2");
              } else {
                  this.toast.info(res.message);
              }
              this.spinner.hide();


      
    } catch (ex) {
      
    }
  } 

  async Firmdtsadd(): Promise<void> {
    try {

       
      if (this.utils.DataValidationNullorEmptyorUndefined(this.firmname)) {
        this.toast.info("Please Enter firm name");
        return;
    }
    
       
    if (this.utils.DataValidationNullorEmptyorUndefined(this.fyIDFIRM)) {
      this.toast.info("Please select Financial Year");
      return;
  }

        if (this.utils.DataValidationNullorEmptyorUndefined(this.firmadd)) {
          this.toast.info("Please Enter Address");
          return;
      }

      
      if (this.utils.DataValidationNullorEmptyorUndefined(this.gst)) {  
        this.toast.info("Please Enter GST");
        return;
    }
    
    if (this.utils.DataValidationNullorEmptyorUndefined(this.rate)) {
      this.toast.info("Please Enter Rate");
      return;
  }
  //pFIRM_NAME,pFINANCIAL_YEAR,pFIRM_ADDRES,pGST,pRATE,pUNIQUE_ID,pROLE

  const req = {
    TYPE: "3",
              FINANCIAL_YEAR: this.fyIDFIRM,
              FIRM_NAME:this.firmname,
              FIRM_ADDRES:this.firmadd,
              GST:this.gst,
              RATE:this.rate, 
              ROLE:this.session.desigId,
              UNIQUEID:this.session.uniqueId, 
          };
          this.spinner.show();
          const res = await this.OfficeModuleAPI.office_Quotion_Sub(req);
          this.spinner.hide();
          if (res.success) { debugger;
            this.toast.info(res.message);
              this.ReqDesc="";
              //this.Financialyeardetails();
              this.ComponentClick("3");
          } else {
              this.toast.info(res.message);
          }
          this.spinner.hide();
     


      
    } catch (ex) {
      
    }
  }

  async onInvoiceChange(event): Promise<void> {/// QUOTATION DETAILS
    try {  this.ReqUpload_path='';
      const element = event.currentTarget as HTMLInputElement;
      let fileList: FileList | null = element.files;
    
    if(element.files[0].name.split('.').length.toString()!=='2')      
    { this.toast.warning('Please Upload PDF files only');    
    event.target.value = '';
  return;
    }else{
  
      const res: any = await this.utils.encodedString(
        event,
        this.utils.fileType.PDF,
        this.utils.fileSize.fiftyMB
      );
      if (!this.utils.isEmpty(res)) {  
         this.ReqUpload_path= res.split('base64,')[1];
      }
    }
    } catch (error) { this.toast.warning('Please Select pdf'); 
    }
  }

  async onStampReceipt(event): Promise<void> {///QUOTATION RISE
    try { this.qutdescUpload='';
      const element = event.currentTarget as HTMLInputElement;
      let fileList: FileList | null = element.files;
    
    if(element.files[0].name.split('.').length.toString()!=='2')      
    { this.toast.warning('Please Upload PDF files only');    
    event.target.value = '';
  return;
    }else{
  
      const res: any = await this.utils.encodedString(
        event,
        this.utils.fileType.PDF,
        this.utils.fileSize.fiftyMB
      );
      if (!this.utils.isEmpty(res)) {  
         this.qutdescUpload= res.split('base64,')[1];
      }
    }
    } catch (error) { this.toast.warning('Please Select pdf'); 
    }
  }

  async ReqDetails(): Promise<void> {
    try {
 debugger;
      const req = {
        TYPE: "6",
                  
                  ROLE:this.session.desigId,
                  UNIQUEID:this.session.uniqueId, 
              };
              this.ReqList=[];
              this.spinner.show();
             // const res = await this.OfficeModuleAPI.office_Quotion_Sub(req);
             const res = await this.OfficeModuleAPI.office_QuotionRequirement_Select(req);
              this.spinner.hide();
              if (res.success) { debugger;
                
                  this.ReqList=res.result;
                  
              } else {
                  this.toast.info(res.message);
              }
              this.spinner.hide();

debugger;
      
    } catch (ex) {
      
    }
  } 
  
  async quotriceDetails(): Promise<void> {
    try {
 debugger;
      const req = {
        TYPE: "7",
                  
                  ROLE:this.session.desigId,
                  UNIQUEID:this.session.uniqueId, 
              };
              this.quotriceList=[];
              this.spinner.show();
              const res = await this.OfficeModuleAPI.office_QuotionRise_Select(req);
              this.spinner.hide();
              if (res.success) { debugger;
                
                  this.quotriceList=res.result;
                  
              } else {
                  this.toast.info(res.message);
              }
              this.spinner.hide();

debugger;
      
    } catch (ex) {
      
    }
  } 

  async firmdtsDetails(): Promise<void> {
    try {
 debugger;
      const req = {
        TYPE: "8",
                  
                  ROLE:this.session.desigId,
                  UNIQUEID:this.session.uniqueId, 
              };
              this.firmdtsList=[];
              this.spinner.show();
              const res = await this.OfficeModuleAPI.office_OffersReceived_Select(req);
              this.spinner.hide();
              if (res.success) { debugger;
                 
                  this.firmdtsList=res.result;
                        this.FIRMID=undefined;
                  
              } else {
                  this.toast.info(res.message);
              }
              this.spinner.hide();

debugger;
      
    } catch (ex) {
      
    }
  } 

  async PaymenttermsAdd(): Promise<void> {
    try {

       
      if (this.utils.DataValidationNullorEmptyorUndefined(this.FIRMID)) {
        this.toast.info("Please Select Firm Name");
        return;
    }
       

        if (this.utils.DataValidationNullorEmptyorUndefined(this.negotiablestatus)) {
          this.toast.info("Please Enter Payment Terms");
          return;
      }

      
      if (this.utils.DataValidationNullorEmptyorUndefined(this.StatusID)) {  
        this.toast.info("Please Select Status");
        return;
    }
    
 
debugger;
  const req = {
    TYPE: "4",
               FINANCIAL_YEAR: this.fyID,
               FIRM_ID:this.FIRMID,
              PAYMENT_TERM_CONDITIONS:this.negotiablestatus,
              NEGOTIABLE_STATUS:this.StatusID,
            //  RATE:this.rate, 
              ROLE:this.session.desigId,
              UNIQUEID:this.session.uniqueId, 
          };
          this.spinner.show();
          const res = await this.OfficeModuleAPI.office_Quotion_Sub(req);
          this.spinner.hide();
          if (res.success) { debugger;
            this.toast.info(res.message);
              this.ReqDesc="";
           //   this.Financialyeardetails();
           this.ComponentClick("4");
          } else {
              this.toast.info(res.message);
          }
          this.spinner.hide();
     


      
    } catch (ex) {
      
    }
  }
  
  async ApprovalsAdd(): Promise<void> {
    try {

      if (this.utils.DataValidationNullorEmptyorUndefined(this.fyID)) {
        this.toast.info("Please Select Financial Year");
        return;
    }

      if (this.utils.DataValidationNullorEmptyorUndefined(this.FIRMID1)) {
        this.toast.info("Please Select Firm Details");
        return;
    }
       

        if (this.utils.DataValidationNullorEmptyorUndefined(this.Rating)) {
          this.toast.info("Please Select Rating");
          return;
      }

      
      if (this.utils.DataValidationNullorEmptyorUndefined(this.ApprovlasStatusID)) {  
        this.toast.info("Please Select Approvlas");
        return;
    }
    
    if (this.utils.DataValidationNullorEmptyorUndefined(this.docPATH)) {
      this.toast.info("Please select pdf document");
      return;
  }
  //pFIRM_NAME,pFINANCIAL_YEAR,pFIRM_ADDRES,pGST,pRATE,pUNIQUE_ID,pROLE
//pFIRM_ID,pFIRM_NAME,pFINANCIAL_YEAR,pAPPROVAL_RATING,pAPPROVAL_TEXT,pAP_IMAGE_PATH
  const req = {
    TYPE: "5",
        FINANCIAL_YEAR: this.fyID,
        FIRM_ID:this.FIRMID1,
        APPROVAL_RATING:this.Rating,
        APPROVAL_TEXT:this.ApprovlasStatusID,
        AP_IMAGE_PATH:this.docPATH,
        ROLE:this.session.desigId,
        UNIQUEID:this.session.uniqueId, 
          };
          this.spinner.show();debugger;
          const res = await this.OfficeModuleAPI.office_Quotion_Sub(req);
          this.spinner.hide();
          if (res.success) { debugger;
            this.toast.info(res.message);
              this.ReqDesc="";
            //  this.Financialyeardetails();
            this.ComponentClick("5");
          } else {
              this.toast.info(res.message);
          }
          this.spinner.hide();
     this.Approveddetailslist();


      
    } catch (ex) {
      
    }
  }
   
  async negotiablestatuslist(): Promise<void> {
    try {
 debugger;
      const req = {
        TYPE: "9",
                  
                  ROLE:this.session.desigId,
                  UNIQUEID:this.session.uniqueId, 
              };
              this.negotiableList=[];
              this.spinner.show();
              const res = await this.OfficeModuleAPI.office_PaymentTerms_Select(req);
              this.spinner.hide();
              if (res.success) { debugger;
                
                  this.negotiableList=res.result;

                  
              } else {
                  this.toast.info(res.message);
              }
              this.spinner.hide();

debugger;
      
    } catch (ex) {
      
    }
  } 

  async Approveddetailslist(): Promise<void> {
    try {
 debugger;
      const req = {
        TYPE: "10",
                  
                  ROLE:this.session.desigId,
                  UNIQUEID:this.session.uniqueId, 
              };
              this.ApproveddetailsList=[];
              this.spinner.show();
              const res = await this.OfficeModuleAPI.office_Approvals_Select(req);
              this.spinner.hide();
              if (res.success) { debugger;                
                  this.ApproveddetailsList=res.result;                  
              } else {
                  this.toast.info(res.message);
              }
              this.spinner.hide();

debugger;
      
    } catch (ex) {
      
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


async Firmidchanged(): Promise<void> {
  try {   debugger;
    if (this.utils.isEmpty(this.FIRMID)) {
      this.toast.warning('Please Select Firm Name');
      return;
    }
    
    debugger;
    
    const reqdistrict={
        type:"11",
        FIRM_ID:this.FIRMID,
        UNIQUEID:this.session.uniqueId,
        ROLE:this.session.desigId,
         
    };  this.spinner.show();
    const res = await this.OfficeModuleAPI.office_QuotionRequirement_Select(reqdistrict); 
    if (res.success) {  debugger;
     
      //this.purchasedetailsList = res.result; 
   

    this.paytermaddress=res.result[0].FIRM_ADDRES;
    this.paytermgst=res.result[0].GST;
    this.paytermrate=res.result[0].RATE;
     
 
    } else {
      this.toast.info(res.message);
    }
    
    this.spinner.hide();
  } catch (error) {
    this.spinner.hide();
    this.utils.catchResponse(error);
  }
}

}
