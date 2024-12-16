import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { OfficeserviceService } from '../../services/officeservice.service';

@Component({
  selector: 'app-po-district-qty-addition',
  templateUrl: './po-district-qty-addition.component.html',
  styleUrls: ['./po-district-qty-addition.component.css']
})
export class PoDistrictQtyAdditionComponent implements OnInit {
  invdetailslist =[];PMID:any;Podetailslist=[];fromfyID:any;Financialyeardata=[];GridData = [];
  GridDataold=[];INVID:any;GridData1=[];SLNO:any;orgqty:any;

  podistrictqty:any;podistrictamount:any; Updateqty:any;Updateamt:any;
 
  constructor(private toast: ToasterService,
    private utils: UtilsService, 
    private session: SessionService,  
    private OfficeModuleAPI: OfficeserviceService,  
    private spinner: NgxSpinnerService,
    private router: Router) { }

  ngOnInit(): void {
     this.Financialyeardetails();

     this.podetailsselect(); 
  }
 
  async Financialyeardetails(): Promise<void> {  
    try {           
      const reqdistrict={
        type:32, 
      };   this.spinner.show();
      this.Financialyeardata = [];
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
  async   Calamount(): Promise<void> {
    try {

        if(parseInt(this.Updateqty)>0) {  
          this.Updateamt=(Math.round(parseInt(this.podistrictamount)/parseInt(this.podistrictqty))*parseInt(this.Updateqty)).toFixed(0); 
        }           
        else this.Updateamt=0;  
       
    }
    catch (error) {
      this.spinner.hide();
      
    }
    return;

  }

  async podetails(): Promise<void> {
    try { debugger;
      const req={ 
        type:"16",
        id:this.fromfyID, 
        UNIQUEID:this.session.uniqueId,
        ROLE:this.session.desigId,
        INSERTEDBY:this.session.userName,
     };
     this.Podetailslist=[];
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
  async onDistrictwiseqtyChange(): Promise<void>  
  {
    try { debugger
      this.GridDataold=[];
        
      const obj = {
          type: "4",  
          INPUT01: this.SLNO
      };  
      
      const res = await this.OfficeModuleAPI.ApprovalDetails_Select(obj);
      this.spinner.hide();
      if (res.success) {debugger;
  
  
        this.GridDataold = res.result;//[this.SLNO];   this.GridData1=[]; 
         this.podistrictqty=res.result[0].QUANTITY;
         this.podistrictamount=res.result[0].AMOUNT; 

         if ( res.result[0].BALANCE_QUANTITY === '0' ) {// this.Updateqty=false; this.Updateamt=false;
        //  document.getElementById('Updateqty').style.display='block';
        //  document.getElementById('Updateamt').style.display='block';
          // document.getElementById('Updateqty').setAttribute("disabled","disabled"); 
          // document.getElementById('Updateamt').setAttribute("disabled","disabled");
       } else { //this.Updateqty=true; this.Updateamt=true;
          // document.getElementById('Updateqty').removeAttribute("disabled");
          // document.getElementById('Updateamt').removeAttribute("disabled");
         // document.getElementById('Updateqty').style.display='none';
         // document.getElementById('Updateamt').style.display='none';
       }

      }
      else{  this.spinner.hide();
        this.GridDataold=[];
         
      }
       
    } catch (error) {
      this.spinner.hide();
      
    }
  }
  async POBYPONUMBER(): Promise<void> {
    try {   
      if (this.utils.isEmpty(this.PMID)) {
        this.toast.warning('Please Enter PONUMBER');
        return;
      }
      debugger;
      const obj = {
        type: "24",
        ID: this.PMID
    }
    const res = await this.OfficeModuleAPI.office_po_select(obj);
      if (res.success) {  debugger;
       
         this.GridData = res.result; 
      } else {
        this.toast.info(res.message);
      }
       //this.POBYPODetails();
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
  async podetailsselect(): Promise<void> {
    try { debugger;
      const req={ 
        type:"4", 
        UNIQUEID:this.session.uniqueId,
        ROLE:this.session.desigId,
        INSERTEDBY:this.session.userName,
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
  
  

  async btnAddQty():Promise<void>{
    try { debugger;
      if (this.utils.isEmpty(this.PMID)) {
        this.toast.warning('Please Enter PONUMBER');
        return;
      }
        if (this.utils.isEmpty(this.SLNO))
      {
        this.toast.warning('Please Select District');
        return;
      }
        if (this.utils.isEmpty(this.Updateqty))
      {
        this.toast.warning('Please Enter Update Qty');
        return;
      }
        if (this.utils.isEmpty(this.Updateamt))
      {
        this.toast.warning('Please Enter Update Amount');
        return;
      }

    if(this.Updateqty>this.GridDataold[0].PO_BALANCE_QUANTITY   ||  this.Updateamt>this.GridDataold[0].PO_BALANCE_AMOUNT )
{
  this.toast.warning('Please Enter Lessthan PO Quntity and PO Amount');
  return;
}
if(this.Updateqty<=0   ||  this.Updateamt<=0 )
  {
    this.toast.warning('Please Enter  Morethan 0 Quntity and Amount');
    return;
  }
      else{
  debugger;
   
        const req={
          TYPE:"2",
          ID:"",
          approval_date:this.session.getTodayDate,
          po_district_qty:this.podistrictqty,
          po_district_amount:this.podistrictamount,
          updated_qty:this.Updateqty,
          update_amount:this.Updateamt,
          ROLE:this.session.desigId,
          UNIQUEID:this.session.uniqueId,
          INSERTEDBY:this.session.userName,
          INPUT01:this.PMID,
          INPUT02:this.SLNO,
          INPUT03:this.SLNO,
         INPUT04:''//path
  
       }; 
       this.spinner.show();
       debugger;
       const res = await this.OfficeModuleAPI.PoqtyupdateSub(req); 
       
       this.spinner.hide(); 
  
        if (res.success) { 
  
  
          this.toast.info(res.message);
           this.podistrictqty='';
           this.podistrictamount='';
           window.location.reload();
        
        } else {
          this.toast.info(res.message);
        }
        this.spinner.hide();
  
      }
    } catch (error) {
      
    }
  }

  async btnSubmitDetails():Promise<void>{
    try { 
       debugger;
    if (this.utils.isEmpty(this.PMID)) {
      this.toast.warning('Please Enter PONUMBER');
      return;
    }
      if (this.utils.isEmpty(this.SLNO))
    {
      this.toast.warning('Please Select District');
      return;
    }
      if (this.utils.isEmpty(this.Updateqty))
    {
      this.toast.warning('Please Enter Update Qty');
      return;
    }
      if (this.utils.isEmpty(this.Updateamt))
    {
      this.toast.warning('Please Enter Update Amount');
      return;
    }

    
    else{

 
      const req={
        TYPE:"1",
        ID:"",
        approval_date:this.session.getTodayDate,
        po_district_qty:this.podistrictqty,
        po_district_amount:this.podistrictamount,
        updated_qty:this.Updateqty,
        update_amount:this.Updateamt,
        ROLE:this.session.desigId,
        UNIQUEID:this.session.uniqueId,
        INSERTEDBY:this.session.userName,
        INPUT01:this.PMID,
          INPUT02:this.SLNO,
          INPUT03:this.SLNO,
         INPUT04:''//path

     }; 
     this.spinner.show();
     debugger;
     const res = await this.OfficeModuleAPI.PoqtyupdateSub(req); 
     
     this.spinner.hide(); 

      if (res.success) { 


        this.toast.info(res.message);
        this.podistrictqty='';
        this.podistrictamount='';
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


}
