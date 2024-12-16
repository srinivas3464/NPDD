import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { OfficeserviceService } from '../../services/officeservice.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-stockentrydetails',
  templateUrl: './stockentrydetails.component.html',
  styleUrls: ['./stockentrydetails.component.css']
})
export class StockentrydetailsComponent implements OnInit {
  distSelected:any;districtListdata=[];Podetailslist=[];invoiceList=[]; invdetailslist=[];InvoiceReportsList=[];subcomponentList=[];
   PMID:any;INVID:any;Recqty:any;RegName:any;PageNo:any;slno:any;RegDate:any;waybillpath:any;stockdocUpload:any;stockdocUploadBASE64:any;
   crdocstatus:any;signedcopystatus:any;dtsvisiblestatus:any;WayBillUpload:any;allotmentAlienationUpload:any; Recqty1:any;actqty:any;
   minDate: Date;subcomp=false;REMARKS:any;Invoicepath:any;
   maxDate: Date;
   dtOptions: DataTables.Settings = this.utils.dataTableOptions();Paymentdetailslist=[];
  dtTrigger: Subject<any> = new Subject();
  pendtTrigger: Subject<any> = new Subject();
  constructor(
    private toast: ToasterService,
    private utils: UtilsService,  
    private session: SessionService, 
    private OfficeModuleAPI: OfficeserviceService, 
    private spinner: NgxSpinnerService, private router: Router
  ) { }

  ngOnInit(): void { debugger;  
    if(this.session.uniqueId !="" && this.session.desigId != ""){
    //  this.RegDate=this.session.getTodayDateString();
    this.DistrictLists();
  } else {
    this.router.navigate(['/shared/UnAuthorized']);
      }
  }



  async DistrictLists(): Promise<void> {
    try {  this.subcomp=false;   
      this.Podetailslist=[];this.invoiceList=[]; this.invdetailslist=[];this.InvoiceReportsList=[];this.subcomponentList=[];this.Recqty1="";

      const reqdistrict={
        type:"41",
        Role:this.session.desigId,
        UNIQUEID:this.session.uniqueId,
        DISTRICTID:this.session.districtId,
        INSERTEDBY:this.session.userName,

      };  
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
   
  async onDISTRICtChange(): Promise<void> {
    try { this.invoiceList=[]; this.invdetailslist=[];this.InvoiceReportsList=[];this.subcomponentList=[];this.Recqty1="";
      if (this.utils.isEmpty(this.distSelected)) {
        this.toast.warning('Select District');
        return;
      }this.subcomp=false;
      const req={
        type:"14", 
        id:this.distSelected,
     };
     this.Podetailslist =[];
     this.spinner.show();debugger;
     const res = await this.OfficeModuleAPI.tenderdetailsSelect(req); 
     this.spinner.hide();  
      if (res.success) { 
        this.Podetailslist = res.result; 
        this.PMID="undefined";
      } else {
        this.toast.info(res.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }


  async POBYPONUMBER(): Promise<void> {
    try { debugger; this.invoiceList=[]; this.invdetailslist=[];this.InvoiceReportsList=[];this.subcomponentList=[];this.Recqty1="";
      if (this.utils.isEmpty(this.PMID)) {
        this.toast.warning('Select PONUMBER');
        return;
      } 
      this.subcomp=false;
      const req={
        type:"18", 
       id:this.PMID,
       TENDERID:this.distSelected,
       
     };
     this.spinner.show();
     const res = await this.OfficeModuleAPI.tenderdetailsSelect(req); 
     this.spinner.hide();  
      if (res.success) { 
        this.invdetailslist = res.result; 
        this.INVID="undefined";
      } else {
        this.toast.info(res.message);
      }
      this.spinner.hide(); 
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }


  
   async onModeChange( ): Promise<void> {
    try {  debugger;
      if (this.utils.isEmpty(this.INVID)) {
        this.toast.warning('Select Invoice');
        return;
      }
      if (this.utils.isEmpty(this.actqty)) {
        this.toast.warning('Enter Received Qty');
        return;
      }
      if( parseInt(this.actqty,0)<parseInt(this.Recqty1,0)){
        this.toast.warning('Enter Received Qty Morethan Actual Qty');
        return;
      }
      if (this.utils.isEmpty(this.Recqty1)) {
        this.toast.warning('Enter Received Qty');
        return;
      }
      this.subcomp=false;
      this.subcomponentList = [];
      const reqdistrict={
        type:"4",
        INVID:this.INVID,
        UNITS:this.Recqty1,
      } ;
      this.spinner.show(); 
      const res = await this.OfficeModuleAPI.officeInvoiceReports(reqdistrict); 
      this.spinner.hide();
      if (res.success) { 
        this.subcomponentList = res.result;  
        this.subcomp=true;
      } else {
        this.toast.info(res.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }


  async InvoiceByID(): Promise<void> {
    try {  debugger;
      if (this.utils.isEmpty(this.INVID)) {
        this.toast.warning('Select Invoice');
        return;
      }

      const reqdistrict={
        type:"3",
        INVID:this.INVID,
      } ;
      this.spinner.show(); 
      const res = await this.OfficeModuleAPI.officeInvoiceReports(reqdistrict); 
      this.spinner.hide();
      if (res.success) { 
        this.InvoiceReportsList = res.result; 
       this.waybillpath =res.result[0].WAYBILL;
       this.Invoicepath =res.result[0].INVOICEPATH;
      this.actqty=res.result[0].UNITS;
      } else {
        this.toast.info(res.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async btnAllPdf(id ): Promise<void> {
    try {
      let pdf='';     
if(id==='1')    pdf=this.Invoicepath;  
if(id==='2')    pdf=this.waybillpath;
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
  
  async btnDownloadPdf(): Promise<void> {
    try {

      if (this.utils.isEmpty(this.REMARKS)) {
        this.toast.warning('Enter REMARKS');
        return;
      }
debugger;
      const reqdistrict={
        type:"2",
        STOCKID:"0",
        ID:"0",
       INVID:this.INVID,
       RECEIVEDQTY:this.Recqty1,
       REGISTATIONNAME:'NA',//this.RegName,
       REGISTATIONDATE:'NA',//this.RegDate,
       REGISTATIONSLNO:'NA',//this.slno,
       REGISTATIONPAGE:'NA',//this.PageNo,
       STOCTDETAILSPATH:null,
       DOCSATATUS:false,
       SIGNSTATUS:false,
       VISIBLESTATUS:false,
       ROLE:this.session.desigId,
       UNIQUEID:this.session.uniqueId,
       INSERTEDBY:this.session.userName,
       REMARKS:this.REMARKS

    } ;
    this.spinner.show(); 
    const res = await this.OfficeModuleAPI.stockEntryReportpdf(reqdistrict); 
    this.spinner.hide(); 
       let pdf="StockEntry";
      // this.spinner.show();
      // const res = await this.utils.AdminFileDownload(pdf);
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

    btnVIEWPdf(){
    
      this.spinner.show();
     //this.utils.downloadPdf(this.stockdocUpload,'Signedcopy'); 
     this.utils.viewPDF(this.stockdocUpload); 
     this.spinner.hide();
    
  }

  async onKeydownMain(event): Promise<void> {
    if (event.key === "Enter" || event.key === "Tab") {
                //event.preventDefault();
                  this.onModeChange();  
    }
}



  async onstockdoc(event): Promise<void> {
    try { this.stockdocUpload='';
      const element = event.currentTarget as HTMLInputElement;
      let fileList: FileList | null = element.files;
    
    if(element.files[0].name.split('.').length.toString()!=='2')      
    { this.toast.warning('Please Upload PDF files only');    
    event.target.value = '';
  return;
    }else{
      this.spinner.show();
      const res: any = await this.utils.encodedString(
        event,
        this.utils.fileType.PDF,
        this.utils.fileSize.fiftyMB
      );
      // if (!this.utils.isEmpty(res)) {  
      //    this.stockdocUpload= res.split('base64,')[1];
      //     this.stockdocUploadBASE64=res;

          if (!this.utils.isEmpty(res)) { 
            this.allotmentAlienationUpload= res.split('base64,')[1];
             this.stockdocUploadBASE64= this.allotmentAlienationUpload; 
             this.stockdocUpload= this.allotmentAlienationUpload; 
 
        top.document.getElementById('ifrm').setAttribute("src",res); 
        this.spinner.hide();

      }
    }
    } catch (error) { this.toast.warning('Please Select pdf'); 
    }
  }



  Validate():boolean{
    try {
     
       if (this.utils.isEmpty(this.distSelected))
      {
        this.toast.warning('Select DISTRICT');
        return;
      }
      if (this.utils.isEmpty(this.PMID)) {
        this.toast.warning('Select PO NUMBER');
        return;
      } 

      if (this.utils.isEmpty(this.INVID)) {
        this.toast.warning('Select Invoice');
        return;
      } 
       
      if (this.utils.isEmpty(this.Recqty1)) {
        this.toast.warning('Select Required Quantity');
        return;
      } 
      // if (this.utils.isEmpty(this.RegName)) {
      //   this.toast.warning('Enter Registration Name');
      //   return;
      // } 
      if (this.utils.isEmpty(this.RegDate)) {
        this.toast.warning('Select Registration Entry Date');
        return;
      }
      // if (this.utils.isEmpty(this.slno)) {
      //   this.toast.warning('Enter Registration Serial No');
      //   return;
      // }
      // if (this.utils.isEmpty(this.PageNo)) {
      //   this.toast.warning('Enter Registration Page No');
      //   return;
      // }
      if (this.utils.isEmpty(this.allotmentAlienationUpload)) {
        this.toast.warning('Upload Stock Entry Details ');
        return;
      }
      if (this.utils.isEmpty(this.crdocstatus)) {
        this.toast.warning('Check Status Correct Document or Not ');
        return;
      }
      if (this.utils.isEmpty(this.signedcopystatus)) {
        this.toast.warning('Check Status Signed Or Not');
        return;
      }
      if (this.utils.isEmpty(this.dtsvisiblestatus)) {
        this.toast.warning('Check Status Visible Or Not');
        return;
      }
      return true;

    } catch (error) {
      
    }
  }

  async btnSubmit(): Promise<void> {
    try {  debugger;
if(this.Validate())
{ debugger;
      const reqdistrict={
          type:"1",
          STOCKID:"0",
          ID:"0",
         INVID:this.INVID,
         RECEIVEDQTY:this.Recqty1,
         REGISTATIONNAME:this.RegName,
         REGISTATIONDATE:this.RegDate,
         REGISTATIONSLNO:this.slno,
         REGISTATIONPAGE:this.PageNo,
         STOCTDETAILSPATH:this.allotmentAlienationUpload,
         DOCSATATUS:this.crdocstatus,
         SIGNSTATUS:this.signedcopystatus,
         VISIBLESTATUS:this.dtsvisiblestatus,
         ROLE:this.session.desigId,
         UNIQUEID:this.session.uniqueId,
         INSERTEDBY:this.session.userName,
         REMARKS:this.REMARKS

      } ;
      this.spinner.show(); 
      const res = await this.OfficeModuleAPI.stockEntryMasterSub(reqdistrict); 
      this.spinner.hide();
      if (res.success) { 
       
        this.toast.info(res.message);
        window.location.reload();
        if(res.result[0].Status==="1")
              { window.location.reload();}
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





}
