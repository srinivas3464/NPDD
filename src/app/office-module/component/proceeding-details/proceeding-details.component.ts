import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { OfficeserviceService } from '../../services/officeservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-proceeding-details',
  templateUrl: './proceeding-details.component.html',  
  styleUrls: ['./proceeding-details.component.css']
})
export class ProceedingDetailsComponent implements OnInit {
  districtListdata=[];Podetailslist=[];PMID:any;sanDt:any;ProcNo:any;qty:any;amount:any;Percentage:any;
    DISTRICTID:any;budgetslip=null; Proceedingdoc=null;proceedingList=[];totalamt:any;//DPRCID:any;
  minDate: Date;approvedListdata:[];PROID:any;
  maxDate: Date;invoiceListdata:[];INVID:any;pitype:any;
  proceedinginvlist:[];
  dtTrigger: Subject<any> = new Subject();
  pendtTrigger: Subject<any> = new Subject();
  constructor( private toast: ToasterService,
    private utils: UtilsService,  
    private session: SessionService,  
    private OfficeModuleAPI: OfficeserviceService, 
    private spinner: NgxSpinnerService, private router: Router  ) { }

  ngOnInit(): void { 
    if(this.session.uniqueId !="" && this.session.desigId != ""){
    this.podetails();
  //  this.DistrictLists();
//this.GetProceedingDetails();
this.sanDt=this.session.dpTodayDate;
} else {
  this.router.navigate(['/shared/UnAuthorized']);
    }
  }


  
  async onPOChange(): Promise<void> {
    try {  
      if (this.utils.isEmpty(this.PMID)) {
        this.toast.warning('Select PO NUMBER');
        return;
      }  
      if (this.utils.isEmpty(this.pitype)) {
        this.toast.warning('Select Invoice type');
        return;
      }  debugger;
      const reqdistrict={
        type:"49",//40
        POID:this.PMID,
        ID:this.pitype,
        ROLE:this.session.desigId,

      }  
      const res = await this.OfficeModuleAPI.office_po_select(reqdistrict); 

     // this.pitype=undefined;
      this.DISTRICTID=undefined;
      this.INVID=undefined;
      this.PROID=undefined;

      if (res.success) { 
        this.districtListdata = res.result; 
      } else {
        this.toast.info(res.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
  
  

  async ondistrictChange(): Promise<void> {
    try {  
      if (this.utils.isEmpty(this.DISTRICTID)) {
        this.toast.warning('Select District');
        return;
      }   
      const reqdistrict={
        type:"50",
        POID:this.PMID,
        ID:this.pitype,
        ROLE:this.session.desigId,
        DISTRICTID:this.DISTRICTID,
      }  
      const res = await this.OfficeModuleAPI.office_po_select(reqdistrict); 
      this.INVID=undefined;
      this.PROID=undefined;
      if (res.success) { 
        this.invoiceListdata = res.result; 
      } else {
        this.toast.info(res.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
  

  async oninvChange(): Promise<void> {
    try {  
      if (this.utils.isEmpty(this.INVID)) {
        this.toast.warning('Select District');
        return;
      }   
      const reqdistrict={
        type:"51",
        ID:this.INVID,
        ROLE:this.session.desigId,
        DISTRICTID:this.DISTRICTID,
      }  
      const res = await this.OfficeModuleAPI.office_po_select(reqdistrict); 
      this.PROID=undefined;
      if (res.success) { 
        this.approvedListdata = res.result; 
      } else {
        this.toast.info(res.message);
      }
      this.proceedinginv()
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async podetails(): Promise<void> { 
    try { 
      const req={
        type:"17", 
        UNIQUEID:this.session.uniqueId,
        ROLE:this.session.desigId,
        INSERTEDBY:this.session.userName
     };
     this.spinner.show();    ///off_tenderrequ_details
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

  async onModeChange(): Promise<void> {
    try {  
      //  this.percentageamount1= "0";
      //  this.percentageamount2= "0";
      //  this.percentageamount3= "0";
      //  this.percentageamount4= "0";

      //  if(this.utils.isEmpty(this.totalamount) || this.utils.isEmpty(this.paymodeamount1) || (this.paymodeamount1=="undefined")|| (this.totalamount=="undefined"))   
      //  this.percentageamount1= 0; 
      //  else if(( trim(this.totalamount.toString())==="") && (trim(this.paymodeamount1.toString())==="")   )   
      //  this.percentageamount1= 0;
      //  else
      //  this.percentageamount1= ((this.totalamount) * (parseFloat(this.paymodeamount1)  /100)   ); 




      //  if(this.utils.isEmpty(this.totalamount) || this.utils.isEmpty(this.paymodeamount2) || (this.paymodeamount2=="undefined")|| (this.totalamount=="undefined"))   
      //  this.percentageamount2= 0;
      //  else
      //  this.percentageamount2= ((this.totalamount) * (parseFloat(this.paymodeamount2)  /100)   ); 



      //  if(this.utils.isEmpty(this.totalamount) || this.utils.isEmpty(this.paymodeamount3) || (this.paymodeamount3=="undefined")|| (this.totalamount=="undefined"))   
      
      //  this.percentageamount3= 0;
      //  else
      //  this.percentageamount3= ((this.totalamount) * (parseFloat(this.paymodeamount3)  /100)   ); 



      //  if(this.utils.isEmpty(this.totalamount) || this.utils.isEmpty(this.paymodeamount4) || (this.paymodeamount4=="undefined")|| (this.totalamount=="undefined"))   
      
      //  this.percentageamount4= 0;
      //  else
      //  this.percentageamount4= ((this.totalamount) * (parseFloat(this.paymodeamount4)  /100)   ); 

 
              
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async onProceedingdoc(event): Promise<void> {
    try {// this.Proceedingdoc='';
      const element = event.currentTarget as HTMLInputElement;
      let fileList: FileList | null = element.files;
    
    if(element.files[0].name.split('.').length.toString()!=='2')      
    { this.toast.warning('Upload PDF files only');    
    event.target.value = '';
  return;
    }else{
  
      const res: any = await this.utils.encodedString(
        event,
        this.utils.fileType.PDF,
        this.utils.fileSize.fiftyMB
      );
      if (!this.utils.isEmpty(res)) {  
         this.Proceedingdoc= res.split('base64,')[1];
      }
    }
    } catch (error) { this.toast.warning('Select Proceeding Document pdf'); 
    }
  }
 
  async onbudgetslip(event): Promise<void> {
    try {
   
      const element = event.currentTarget as HTMLInputElement;
      let fileList: FileList | null = element.files;
    
    if(element.files[0].name.split('.').length.toString()!=='2')      
    { this.toast.warning('Please Upload PDF files only');    
    event.target.value = '';
  return;
    }
  else{
  
      const res: any = await this.utils.encodedString(
        event,
        this.utils.fileType.PDF,
        this.utils.fileSize.fiftyMB
      );
      if (!this.utils.isEmpty(res)) {  
         this.budgetslip= res.split('base64,')[1];
      }
     }
    } catch (error) { this.toast.warning('Select pdf'); 
    }
  }
 
  async btnSubmitDetails():Promise<void>{
    try { 
       
    if (this.utils.isEmpty(this.PMID)) {
      this.toast.warning('Select PO NUMBER');
      return;
    }
    else if (this.utils.isEmpty(this.DISTRICTID))
    {
      this.toast.warning('Select DISTRICT');
      return;
    } 
    else if (this.utils.isEmpty(this.sanDt))
    {
      this.toast.warning('Select Sanction Date');
      return;
    }
    else if (this.utils.isEmpty(this.ProcNo))
    {
      this.toast.warning('Enter Proceeding No');
      return;
    }
    else if (this.utils.isEmpty(this.qty))
    {
      this.toast.warning('Enter Qty');
      return;
    }
    else if (this.utils.isEmpty(this.amount))
    {
      this.toast.warning('Enter Amount');
      return;
    }
    else if (this.utils.isEmpty(this.Percentage))
    {
      this.toast.warning('Enter Percentage ');
      return;
    }

    else if (this.utils.isEmpty(this.Proceedingdoc))
    {
      this.toast.warning('Upload Proceeding document');
      return;
    }
    else if (this.utils.isEmpty(this.budgetslip))
    {
      this.toast.warning('Upload Budget Slip document');
      return;
    } 
    
    // else if (this.utils.isEmpty(this.invoiceNo))
    // {
    //   this.toast.warning('Please enter invoiceNo');
    //   return;
    // } 
    else{ 
      const req={
        TYPE:"6",  //1
         ID:"0", 
         PRCID:"0",
         PMID:this.PMID,  
         DATEOFSANTION:this.sanDt,       
         PROCEDINGNO:this.ProcNo, 
         QTY:this.qty,
         PAYMENTAMOUNT:this.amount,
         PAYMENTPER:this.Percentage,
         DISTRICTID:this.DISTRICTID,
         PROCEEDINGDOCPATH:this.Proceedingdoc,
         BUDGETSLIPDOCPATH:this.budgetslip,
         ROLE:this.session.desigId,
       UNIQUEID:this.session.uniqueId,
        INSERTEDBY:this.session.userName 

     }; 
     this.spinner.show();
     
     const res = await this.OfficeModuleAPI.proceedingDetailsSub(req); 
     
     this.spinner.hide(); 

      if (res.success) { 
  
        this.toast.info(res.message);
      
      //  const resdocs = await this.OfficeModuleAPI.officeInvoiceDocumentsSub(req);
      //  if (resdocs.success) { 
      //   //  this.componentListdata = res.result; 
      //   this.toast.info(resdocs.message);

      //  }

      //this.podetails();
         window.location.reload();
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


    async GetProceedingDetails():Promise<void>{
      try { debugger;
        const req1={
          TYPE:"2",
           ID:"0", 
           PRCID:"0",
           PMID:"0",  
           DATEOFSANTION:this.session.getTodayDateString(),       
           PROCEDINGNO:"0",
           QTY:"0",
           PAYMENTAMOUNT:"0",
           PAYMENTPER:"0",
           DISTRICTID:"0",
           PROCEEDINGDOCPATH:null,
           BUDGETSLIPDOCPATH:null,
           ROLE:this.session.desigId,
         UNIQUEID:this.session.uniqueId,
          INSERTEDBY:this.session.userName 
  
       }; 
       this.spinner.show();       
       const res = await this.OfficeModuleAPI.proceedingDetailsSub(req1);        
       this.spinner.hide();   
        if (res.success) { 
        this.proceedingList=res.result; 
        }
        else  this.toast.info(res.message);
      }
     catch (error) { 
  }
}
 

// async btnAllPdf(path): Promise<void> {
//   try {
//     this.toast.info(path);
//   }
//   catch (error) {
//   this.spinner.hide();
//   this.utils.catchResponse(error);
//   }
  
//   }

  async btnAllPdf(pdf): Promise<void> {
    try {
      this.spinner.show();
      const res = await this.utils.AdminFileDownload(pdf);
      if (res.success) {
         this.utils.downloadPdf(res.result,pdf); 
      } else {
        this.toast.info(res.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
   

async Deletepacket(DPRCID): Promise<void> {
  try { 
if(DPRCID!="")
{
//const str=PONOCOMPID.split(','); 
const  req3 ={ 
  TYPE:"3",
  ID:"0", 
  PRCID:DPRCID,
  PMID:"0",  
  DATEOFSANTION:this.session.getTodayDateString(),       
  PROCEDINGNO:"0",
  QTY:"0",
  PAYMENTAMOUNT:"0",
  PAYMENTPER:"0",
  DISTRICTID:"0",
  PROCEEDINGDOCPATH:null,
  BUDGETSLIPDOCPATH:null,
  ROLE:this.session.desigId,
UNIQUEID:this.session.uniqueId,
 INSERTEDBY:this.session.userName 

}; 
this.spinner.show();       
const res = await this.OfficeModuleAPI.proceedingDetailsSub(req3);        
this.spinner.hide();   
if (res.success) {  
    this.toast.info("Record Deleted Successfully");
   window.location.reload();
     
  } else {
    this.toast.info("Record NOT Deleted");
  }


}
else
{
  this.toast.info("Proceeding id is null");
  return;
}
}
catch (error) {
this.spinner.hide();
this.utils.catchResponse(error);
}

}


async btnaddDetails():Promise<void>{
  try {
    if (this.utils.isEmpty(this.PMID)) {
      this.toast.warning('Select PO NUMBER');
      return;
    }
    if (this.utils.isEmpty(this.pitype)) {
      this.toast.warning('Select Invoice Type');
      return;
    }

      if (this.utils.isEmpty(this.DISTRICTID)) {
      this.toast.warning('Select DISTRICTID');
      return;
    }
      if (this.utils.isEmpty(this.INVID))
    {
      this.toast.warning('Select INVOICE');
      return;
    } 
    if (this.utils.isEmpty(this.PROID))
    {
      this.toast.warning('Select Approved List');
      return;
    } 

    const req={
      TYPE:"4",
       ID:this.pitype, 
       PRCID:this.PROID,
       PMID:this.INVID,  
       DATEOFSANTION:this.sanDt,       
       PROCEDINGNO:this.ProcNo, 
       QTY:0,
       PAYMENTAMOUNT:0,
       PAYMENTPER:0,
       DISTRICTID:this.DISTRICTID,
       PROCEEDINGDOCPATH:null,
       BUDGETSLIPDOCPATH:null,
       ROLE:this.session.desigId,
       UNIQUEID:this.session.uniqueId,
      INSERTEDBY:this.session.userName 

   }; 
   this.spinner.show();
   
   const res = await this.OfficeModuleAPI.proceedingDetailsSub(req); 
   
   this.spinner.hide(); 

    if (res.success) { 

      this.toast.info(res.message);
    }else  this.toast.info(res.message);

    this.proceedinginv();

  } catch (error) {
    
  }
}

//proceedinginvlist

async proceedinginv():Promise<void>{
  try {debugger;
    if (this.utils.isEmpty(this.PMID)) {
      this.toast.warning('Select PO NUMBER');
      return;
    }
      if (this.utils.isEmpty(this.DISTRICTID)) {
      this.toast.warning('Select DISTRICTID');
      return;
    }
      if (this.utils.isEmpty(this.INVID))
    {
      this.toast.warning('Select INVOICE');
      return;
    } 
    // if (this.utils.isEmpty(this.PROID))
    // {
    //   this.toast.warning('Select Approved List');
    //   return;
    // } 

    const req={
      TYPE:"5",
      // ID:"0", 
      ID:this.PMID,
    }
  
  this.spinner.show();
  
  const res = await this.OfficeModuleAPI.proceedingDetailsSub(req); 
  
  this.spinner.hide(); 

   if (res.success) { 
this.proceedinginvlist=res.result;

   }
  }
  catch (error) {
    
  }
}
}
