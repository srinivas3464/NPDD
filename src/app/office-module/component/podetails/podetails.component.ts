import { STRING_TYPE, THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { timeStamp } from 'console';
import { trim } from 'jquery';
 
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePickerService } from 'src/app/shared/services/date-picker.service'; 
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { OfficeserviceService } from '../../services/officeservice.service';
import { Router } from '@angular/router';
import { AnyARecord } from 'dns';
 

@Component({
  selector: 'app-podetails',
  templateUrl: './podetails.component.html',
  styleUrls: ['./podetails.component.css']
})
export class PodetailsComponent implements OnInit {
   [x: string]: any; percentageamount:any;  tendertypedata=[];fyID:any;ttID:any;
  minDate: Date;
  maxDate: Date;
  secretaryDetails = {  };
  PAYMODEID='';
  PurchaseOrderno ='';
  paymodeamount='';
  Units=''; 
 // UOMID='';
  TotalRate='';
  districtListdata=[];
  formdata=[];
  componentListdata=[];
  purchasedetailsList=[];
  paymodeListdata=[];
  minMonth: any;
  Month: any;
  Year: any;
  Details_div=true;
  Details_div_back=false;
   RBKDDSelected:any;
   pono:any;
   EPOPATH:any;
   PAYMODEADVANCE:any;
 PAYMODEDELIVERY:any;
       PAYMODEINSTALLATION:any;
         PAYMODEFINALPAYMENT:any;
         totalper:any;
  constructor(
    private toast: ToasterService,
    private utils: UtilsService,  
    private session: SessionService, 
    private OfficeModuleAPI: OfficeserviceService, 
    private spinner: NgxSpinnerService, private router: Router  
     
  ) {
    this.minDate = this.session.getDOBMinDate();
    this.maxDate = this.session.getDOBMaxDate();
  }
   selectedLevel
   Totalvalues=0;
   Totals=0;
   Totals1=0; 
   //paymodeamount='';
   DamageStock=0;
   selectedText: any;
   typeofpayname: any;
   uomListdata:any[]=[];
   PurchaseOrder = {
    Districtid:'',
    DistrictName:'',
  PurchaseOrderDate:'',
  Order:'',
  Units:'',
  //UOMID:'',
  TotalRate:'', 
  };
  
  DistrictList:any[]=[];
  purchargeOrderList:any[]=[];
  RequestStockpointList:any[]=[];
  QuantityList:any[]=[];
  StockCount:any[]=[];
  AddDetailsview=false;
  AddDetailsview_div=true;
  submitbtn=true;
  Addbtnarray=true;
  PurchageorderIns_div=true;
  OrderDetailsview_div=false;

  POD=this.session.getTodayDateString();
  ngOnInit(): void {  

    if(this.session.uniqueId !="" && this.session.desigId != ""){
      this.percentageamount1= "0";
      this.percentageamount2= "0";
      this.percentageamount3= "0";
      this.percentageamount4= "0";
   this.pod=this.session.getTodayDateString() ;

   this.tendertypedetails();  //office_Budget_Select
   this.UomDetails();            //office_po_select   TYPE 12
   //this.FormLists();    ///office_po_select  TYPE 2

   //this.paymodeDetails();        //office_po_select   TYPE 13
   this.purchasedetails();     //office_po_select  TYPE 6

 //  this.onDISTRICtChange1(); //office_po_select  TYPE 30
  // this.Componentslist1(); 
  //   this.DistrictLists(); 
  // this.Financialyeardetails();   //office_po_select  TYPE 37
   

  } else {
this.router.navigate(['/shared/UnAuthorized']); 
  }

    
     
  }

  async Financialyeardetails(): Promise<void> {  
    try {           
      const reqdistrict={
        type:44, 
        ID:this.ttID
      };   this.spinner.show(); this.Financialyeardata = [];
      const res = await this.OfficeModuleAPI.office_po_select(reqdistrict); 
      if (res.success) {  this.spinner.hide();
        this.Financialyeardata = res.result; 
        this.fyID=undefined;
      } else {
        this.toast.info(res.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
  
  async UomDetails(): Promise<void> {
    try {     
      const reqdistrict={
        type:"12"
      }  
      const res = await this.OfficeModuleAPI.office_po_select(reqdistrict); 
      if (res.success) { 
        this.uomListdata = res.result; 
        //this.UOMID='0';
      } else {
        this.toast.info(res.message);
      }
      this.spinner.hide();

      this.paymodeDetails();  
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  
  async tendertypeChange(): Promise<void> {
    try {

      if (this.utils.isEmpty(this.fyID)) {
        this.toast.warning('Please select Financial year');         
        return;
      } 

        if (this.utils.isEmpty(this.ttID)) {
        this.toast.warning('Please select Tender Type');         
        return;
      } this.componentListdata=[];
      this.componentListdata =[];
      const reqdistrict={
        type:"13", //5
        id:this.ttID,
        FINANCIAL_YEAR:this.fyID,
        UNIQUEID:this.session.uniqueId,
 ROLE:this.session.desigId,
 INSERTEDBY:this.session.userName
      //  DISTRICTID:this.RBKDDSelected,

      } ; 
      const res = await this.OfficeModuleAPI.office_PaymentTerms_Select(reqdistrict); 

       


      if (res.success) { 
        this.componentListdata = res.result; 
      } else {
        this.toast.info(res.message);
      }
      this.spinner.hide();
      this.FormLists(); 
    } catch (ex) {
      
    }
  }
  
  async onModeChange(): Promise<void> {
    try {  
       this.percentageamount1= "0";
       this.percentageamount2= "0";
       this.percentageamount3= "0";
       this.percentageamount4= "0";

       if(this.utils.isEmpty(this.totalamount) || this.utils.isEmpty(this.paymodeamount1) || (this.paymodeamount1=="undefined")|| (this.totalamount=="undefined"))   
       this.percentageamount1= 0; 
       else if(( trim(this.totalamount.toString())==="") && (trim(this.paymodeamount1.toString())==="")   )   
       this.percentageamount1= 0;
       else
       this.percentageamount1= ((this.totalamount) * (parseFloat(this.paymodeamount1)  /100)   ); 




       if(this.utils.isEmpty(this.totalamount) || this.utils.isEmpty(this.paymodeamount2) || (this.paymodeamount2=="undefined")|| (this.totalamount=="undefined"))   
       this.percentageamount2= 0;
       else
       this.percentageamount2= ((this.totalamount) * (parseFloat(this.paymodeamount2)  /100)   ); 



       if(this.utils.isEmpty(this.totalamount) || this.utils.isEmpty(this.paymodeamount3) || (this.paymodeamount3=="undefined")|| (this.totalamount=="undefined"))   
      
       this.percentageamount3= 0;
       else
       this.percentageamount3= ((this.totalamount) * (parseFloat(this.paymodeamount3)  /100)   ); 



       if(this.utils.isEmpty(this.totalamount) || this.utils.isEmpty(this.paymodeamount4) || (this.paymodeamount4=="undefined")|| (this.totalamount=="undefined"))   
      
       this.percentageamount4= 0;
       else
       this.percentageamount4= ((this.totalamount) * (parseFloat(this.paymodeamount4)  /100)   ); 


            //   if(this.utils.isEmpty(this.totalamount) && this.utils.isEmpty(this.paymodeamount)   )               
            //   this.percentageamount= 0;               
            //  else if(this.utils.isEmpty(this.totalamount) && this.paymodeamount !='' )
            //  {  this.percentageamount= 0; return; }
            //  else if(this.totalamount!='' && this.utils.isEmpty(this.paymodeamount) )
            // {  this.percentageamount= 0; return; }
            //   else               
            //   this.percentageamount= ((this.totalamount) * (parseFloat(this.paymodeamount)  /100)   ); 
              
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }


  async paymodeDetails(): Promise<void> {
    try {   
      
      
      this.PAYMODEADVANCE="ADVANCE";
      this.PAYMODEDELIVERY="DELIVERY";
      this.PAYMODEINSTALLATION="INSTALLATION";
      this.PAYMODEFINALPAYMENT="FINALPAYMENT";


      // const reqdistrict={
      //   type:"13"
      // };
      //    this.spinner.show();
      // const res = await this.OfficeModuleAPI.office_po_select(reqdistrict); 
      // this.spinner.hide();
      // if (res.success) { 
      //   this.paymodeListdata = res.result;

      //   this.PAYMODEADVANCE=  res.result[0].PAYMODE;
      //   this.PAYMODEDELIVERY=res.result[1].PAYMODE;
      //   this.PAYMODEINSTALLATION=res.result[2].PAYMODE;
      //   this.PAYMODEFINALPAYMENT=res.result[3].PAYMODE;


      //    this.PAYMODEID=undefined;
      // } else {
      //   this.toast.info(res.message);
      // }
     // this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }



  async DistrictLists(): Promise<void> {
    try {     
      const reqdistrict={
        type:"1"
      }  
      const res = await this.OfficeModuleAPI.office_po_select(reqdistrict); 
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

  async tendertypedetails(): Promise<void> {  
    try {           
      const reqdistrict={
        type:6, 
      };   this.spinner.show();
      this.tendertypedata =[];
      const res = await this.OfficeModuleAPI.office_Budget_Select(reqdistrict); 
      if (res.success) {  this.spinner.hide();
        this.tendertypedata = res.result; 
      } else {
        this.toast.info(res.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }


  async FormLists(): Promise<void> {
    try {     debugger;
      const reqdistrict={
        TYPE:"12",//2",        
 UNIQUEID:this.session.uniqueId,
 ROLE:this.session.desigId,
 INSERTEDBY:this.session.userName
      }  
      //FIRM DETAILS
     // const res = await this.OfficeModuleAPI.office_po_select(reqdistrict); 
     const res = await this.OfficeModuleAPI.office_Approvals_Select(reqdistrict); 
     
      if (res.success) {
        this.formdata = res.result; 
      } else {
        this.toast.warning(res.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  } 

  async onDISTRICtChange1(): Promise<void> {
  
    try {     

      // if (this.utils.isEmpty(this.RBKDDSelected)) {
      //   this.toast.warning('Please select District');         
      //   return;
      // } 
      const reqdistrict={
        type:"30", //5
      //  DISTRICTID:this.RBKDDSelected,

      }  
      const res = await this.OfficeModuleAPI.office_po_select(reqdistrict); 

       


      if (res.success) { 
        this.componentListdata = res.result; 
      } else {
        this.toast.info(res.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  } 
  
  async purchasedetails(): Promise<void> {
    try {     
      const reqdistrict={
        type:"6" 
      }  
      const res = await this.OfficeModuleAPI.office_po_select(reqdistrict); 
      if (res.success) { 
        this.purchasedetailsList = res.result; 
        this.pono=this.purchasedetailsList[0].PONUMBER;
      } else {
       // this.toast.info(res.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
   


  async Componentslist(): Promise<void> {
    try { debugger;
      const req={
        type:"2",
      //  id:"0",
     //   TENDERID:"0",
     //   COMPID:this.strcompid,
       // TENDERDATE:this.session.dpTodayDate, 
     //   INSERTEDBY:this.session.userName,
     //   ROLE:this.session.desigId,
     //   UNIQUEID:this.session.uniqueId
        
     };
     this.spinner.show();
     const res = await this.OfficeModuleAPI.tenderdetailsSelect(req); 
     this.spinner.hide(); 
      if (res.success) { 
        this.componentListdata = res.result; 
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

  async Componentslist1(): Promise<void> {
    try { debugger;
      const req={
        type:"30",//2
      //  id:"0",
     //   TENDERID:"0",
     //   COMPID:this.strcompid,
       // TENDERDATE:this.session.dpTodayDate, 
     //   INSERTEDBY:this.session.userName,
     //   ROLE:this.session.desigId,
     //   UNIQUEID:this.session.uniqueId
        
     };
     this.spinner.show();debugger;
     const res = await this.OfficeModuleAPI.tenderdetailsSelect(req); 
     this.spinner.hide(); 
      if (res.success) { 
        this.componentListdata = res.result; 
      } else {
      //  this.toast.info(res.message);
      }
      this.spinner.hide();
    }
    catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async AddPacketDetails(): Promise<void> {
  
    try {      
      if (this.validate()) {
      const req={
        type:"1",
       id:this.fyID,
       TENDERID:"0",
       PONUMBER:this.PurchaseOrderno,
       COMPID:this.COMPID,
       FIRMID:this.FIRMID,
       UOMID:this.UOMID,
        UNITS:this.Units,
       PRICES:this.totalamount,
       PODATE:this.POD,
       PRICE_UNIT:(parseInt(this.totalamount)/parseInt(this.UOMID)),
       POID:this.ttID,
       INSERTEDBY:this.session.userName,
       ROLE:this.session.desigId,
       UNIQUEID:this.session.uniqueId,
       DISTRICTID:this.RBKDDSelected,
       PAYMODEID:this.PAYMODEID,
       PAYAMT:this.paymodeamount1,
       EPOPATH:this.EPOPATH,
       DELIVERY_PER:this.paymodeamount2,
       INSTALL_PER:this.paymodeamount3,
       FINAL_PER:this.paymodeamount4




     }; 
     this.spinner.show();debugger;
     //const res = await this.OfficeModuleAPI.tenderdetailsSub(req); 
     const res = await this.OfficeModuleAPI.officePomasterSub(req); 
     
     this.spinner.hide(); 

      if (res.success) { 
        this.componentListdata = res.result; 
         window.location.reload();
      } else {
        this.toast.info(res.message);
      }
      this.spinner.hide();
    }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
  async Deletepacket(PONOCOMPID): Promise<void> {
    try { 
  if(PONOCOMPID!="")
  {
const str=PONOCOMPID.split(','); 
const  req ={
  type:"3",
PONUMBER:str[0],
COMPID:str[1]
    }

    this.spinner.show();
    const res = await this.OfficeModuleAPI.officePomasterSub(req); 
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
    this.toast.info("Component is null");
    return;
  }
}
  catch (error) {
  this.spinner.hide();
  this.utils.catchResponse(error);
}
  
}

  async btnSubmitDetails():Promise<void>{
    try { debugger;
       
    if (this.utils.isEmpty(this.pono)) {
      this.toast.warning('Enter PO NUMBER');
      return;
    }
    else{
      const req={
        type:"2",
       id:this.ttID,
       TENDERID:"0",
       PONUMBER:this.pono,
      //  COMPID:this.COMPID,
      //  FIRMID:this.FIRMID,
      //  UNITS:this.Units,
      //  PRICES:this.totalamount,
      //  PODATE:this.POD,
      //  PRICE_UNIT:(parseInt(this.totalamount)/parseInt(this.Units)),
      //  POID:"0",
       INSERTEDBY:this.session.userName,
       ROLE:this.session.desigId,
       UNIQUEID:this.session.uniqueId,
       DISTRICTID:this.session.districtId,
       EPOPATH:this.EPOPATH
     }; 
     this.spinner.show();
     //const res = await this.OfficeModuleAPI.tenderdetailsSub(req); 
     const res = await this.OfficeModuleAPI.officePomasterSub(req); 
     
     this.spinner.hide(); 

      if (res.success) { 
        this.componentListdata = res.result; 
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
  orderDetails(){
    this.PurchageorderIns_div=false;
  this.OrderDetailsview_div=true;
  this.Details_div=false;
  this.Details_div_back=true;


  }
  
 
  async StockChange(DistCode):Promise<void>{
    let obj = this.districtListdata.find(data=>data.DIST_CODE==DistCode);
    this.PurchaseOrder.DistrictName=obj.DIST_NAME;
    this.PurchaseOrder.Districtid=obj.DIST_CODE; 
}
 
// AddPacketDetails(){

//   if (this.validate()) {
    
//    
//     //alert(this.selectedText);
   
//     var sum=this.Totalvalues;
//     this.Totalvalues = Number(this.PurchaseOrder.Units)*Number(this.PurchaseOrder.TotalRate);
    
//     this.Addbtnarray=true;
//     this.todos.push({  
//       content:this.PurchaseOrder.DistrictName,content1:this.PurchaseOrder.PurchaseOrderDate,content2:this.PurchaseOrder.Order,content3:this.PurchaseOrder.TotalRate,content4:this.PurchaseOrder.Units, content5:this.Totalvalues,content6:this.PurchaseOrder.Districtid,content7:this.session.userName,content8:this.session.mobileNumber
//       // completed:false,  
      
//     });

//   console.log(this.todos);
//   this.PurchaseOrder.Districtid="";
//   this.PurchaseOrder.PurchaseOrderDate="";
//   this.PurchaseOrder.Order="";
//   this.PurchaseOrder.Units="";
//   this.PurchaseOrder.TotalRate="";
  
//   console.log(this.todos);
//   this.AddDetailsview_div=true;
//   this.submitbtn=true;
//  }
// }
 



validate(): boolean {
  // if (this.utils.isEmpty(this.RBKDDSelected )) {
  //   this.toast.warning('Select District');
  //   return false;
  // } 
  if (this.utils.isEmpty(this.fyID)) {
    this.toast.warning('Select Financial year ');
    return false;
  }
  if (this.utils.isEmpty(this.ttID)) {
    this.toast.warning('Select Tender Type ');
    return false;
  }

  if (this.utils.isEmpty(this.COMPID)) {
    this.toast.warning('Select Component ');
    return false;
  }

  if (this.utils.isEmpty(this.POD)) {
    this.toast.warning('Select Order Date');
    return false;
  }
  if (this.utils.isEmpty(this.PurchaseOrderno)) {
    this.toast.warning('Enter Order Number');
     
    return false;
  }
  if (this.utils.isEmpty(this.FIRMID)) {
    this.toast.warning('Select Firm Name');
     
    return false;
  }

  if (this.utils.isEmpty(this.UOMID)) {
    this.toast.warning('Select UOM');
     
    return false;
  }
  if (this.utils.isEmpty(this.Units)) {
    this.toast.warning('Enter Number Of QTY');
     
    return false;
  }
  
  if (this.utils.isEmpty(this.totalamount)) {
    this.toast.warning('Enter Total Amount');
     
    return false;
  }
  // if (this.utils.isEmpty(this.PRICE_UNIT)) {
  //   this.toast.warning('Enter Rate Per Unit');
     
  //   return false;
  // }

  


  // if (this.utils.isEmpty(this.PAYMODEID)) {
  //   this.toast.warning('select Payment Mode');
     
  //   return false;
  // }
  
  // if (this.utils.isEmpty(this.paymodeamount)) {
  //   this.toast.warning('Enter Payment Mode Percentage');
     
  //   return false;
  // }
  this.RBKDDSelected=1000;
 this.totalper=0;
if(this.paymodeamount1==undefined || this.utils.isEmpty(this.paymodeamount1)) {}else this.totalper=this.paymodeamount1;
if(this.paymodeamount2==undefined  || this.utils.isEmpty(this.paymodeamount2)) {}else this.totalper=parseFloat(this.totalper)+parseFloat(this.paymodeamount2);
if(this.paymodeamount3==undefined  || this.utils.isEmpty(this.paymodeamount3)) {}else this.totalper=parseFloat(this.totalper)+parseFloat(this.paymodeamount3);
if(this.paymodeamount4==undefined  || this.utils.isEmpty(this.paymodeamount4)) {}else this.totalper=parseFloat(this.totalper)+parseFloat(this.paymodeamount4);

if(this.totalper!=100 || this.totalper==undefined || this.totalper=="0" || this.utils.isEmpty(this.totalper)){
 this.toast.warning('Enter Payment Mode Percentage Equal to 100% only'); return false;}

 
          
  if (this.utils.isEmpty(this.session.userName)) {
    this.toast.warning('Login user name not Identified');
     
    return false;
  }
  if (this.utils.isEmpty(this.session.desigId)) {
    this.toast.warning('Login user role not Identified');
     
    return false;
  }
  if (this.utils.isEmpty(this.session.uniqueId)) {
    this.toast.warning('Login user UNIQUEID not Identified');
     
    return false;
  }
    
  if (this.utils.isEmpty(this.EPOPATH)) {
    this.toast.warning('Upload PO pdf file');
     
    return false;
  }
  
  
 


  return true;
} 

// async btnSubmitDetails():Promise<void>{
 

//     if(this.todos.length>0)
//   {
//   console.log()

//     this.spinner.show();
//     const res = await this.PaymentAPI.PurchaseOrderInsert(this.todos);
//     this.spinner.hide();
 

//     if (res.success) {
    
//   this.AddDetailsview=false;
//   this.submitbtn = false;
 
//       Swal.fire("success","Purchage order Data Successfully ....!","success");
//     }
//     else{
//       Swal.fire("info","Purchage order Failed ....!","info");
//     }
//     }
//     window.location.reload(); 
// }
 
orderDetails_back(){
 this.Details_div=true;
  this.Details_div_back=false;
   this.PurchageorderIns_div=true;
  this.OrderDetailsview_div=false;
}
 


async EPOPATHchange(event): Promise<void> {
  try {debugger;
     
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
      this.utils.fileSize.twoMB   //fiftyMB
    );
    if (!this.utils.isEmpty(res)) {  
       this.EPOPATH= res.split('base64,')[1];
    }
  }
  } catch (error) { this.toast.warning('Upload PO pdf');  
  }
}

}
