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
  selector: 'app-component-tender-price',
  templateUrl: './component-tender-price.component.html',
  styleUrls: ['./component-tender-price.component.css']
})
export class ComponentTenderPriceComponent implements OnInit {
  componentListdata=[];COMPID:any;checkList = []; SUBCOMPONENT=true;COMPONENT=true; typeid:any;cid:any;priceList=[];
  dtOptions: DataTables.Settings = this.utils.dataTableOptions(); tendertypedata=[];tID:any;ttID:any;tenderdata=[];
  Financialyeardata=[];fyID:any;comptype:any;
  dtTrigger: Subject<any> = new Subject();
  pendtTrigger: Subject<any> = new Subject();
  private _prevSelected: any;
  COMPONENTisChecked: boolean = true;
  SUBCOMPONENTisChecked: boolean = false;  
  constructor(private toast: ToasterService,  
    private utils: UtilsService, 
    private session: SessionService, 
    private OfficeModuleAPI: OfficeserviceService, 
    private spinner: NgxSpinnerService,
    private router: Router    ) { } 

  ngOnInit(): void { 
    if(this.session.uniqueId !="" && this.session.desigId != ""){

    this.COMPONENT=true;  this.typeid=8;
     
    //this.Componentdetails(); 
   // this.componentprices1();
    this.Financialyeardetails();
    this.typedetails();
    this.tendertypedetails();
this.comptype="1";
  }
  else
  {
    this.router.navigate(['/shared/UnAuthorized']);
  }
  }
  
  
  
  async typedetails(): Promise<void> {  
    try {           
      const reqdistrict={
        type:5, 
      };   this.spinner.show();
      this.tenderdata =[];
      const res = await this.OfficeModuleAPI.office_Budget_Select(reqdistrict); 
      if (res.success) {  this.spinner.hide();
        this.tenderdata = res.result; 
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

  

  async componentprices(): Promise<void> {
    try { 

      

      this.priceList = []; 
        const req = {
          type:15,
          ID:this.COMPID
        };

        this.spinner.show();
        const res = await this.OfficeModuleAPI.office_po_select(req); 
        this.spinner.hide();
        this.priceList = [];
        if (res.success) {
          
          this.priceList = res.result; this.cid=this.checkList.length;
        } else {
          this.toast.info(res.message);
        }
      
      
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  } 
  async componentprices1(): Promise<void> {
    try { 

      

      this.priceList = []; 
        const req = {
          type:15,
          ID:this.COMPID
        };

        this.spinner.show();
        const res = await this.OfficeModuleAPI.office_po_select(req); 
        this.spinner.hide();
        this.priceList = [];
        if (res.success) {
          
          this.priceList = res.result; this.cid=this.checkList.length;
        } else {
         // this.toast.info(res.message);
        }
      
      
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  } 

  async Financialyeardetails(): Promise<void> {  
    try {           
      const reqdistrict={
        type:37, 
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

  async Componentdetails(): Promise<void> {  
    try {           
      const reqdistrict={
        type:9,
     //   DISTRICTID:this.RBKDDSelected,
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
  
  async fyIDChange(): Promise<void> {
    try { 

      if (this.utils.isEmpty(this.fyID)) {
        this.toast.warning('Please select Financial Year');          
        return;
      } 
this.checkList=[];
      this.componentListdata = []; 
      this.COMPID=undefined;debugger;
        const req = {
          type:'33',
          ID:this.fyID
        };

        this.spinner.show();
        const res = await this.OfficeModuleAPI.office_po_select(req); 
        this.spinner.hide();
        this.componentListdata = [];
        if (res.success) {
          this.componentListdata = res.result; 
         // this.checkList = res.result; this.cid=this.checkList.length;
        } else {
          this.toast.info(res.message);
        }
      
      
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  } 

  
  async comptypeChange(): Promise<void> {
    try {debugger;
      if(this.comptype===undefined) this.componentChange(88);
      else if(this.comptype==="1") this.componentChange(88);
      else if(this.comptype==="2") this.componentChange(34);
else  this.componentChange(88);
     
    } catch (ex) {
      
    }
  }

  
  async comptypeChangeevent(): Promise<void> { debugger;
   // if(this.comptype!=null && this.comptype!="0" && this.comptype!=undefined)
   if(this.comptype===undefined || this.comptype==="1" )
    {
    this.componentChange(88);
    }
    else if(this.comptype!=undefined)
    {
    this.componentChange(34);
    }
    else{
      this.toast.warning('Please select Component/Sub Component');  return;
    }
  }

  async componentChange(id): Promise<void> {
    try { 

      if (this.utils.isEmpty(this.COMPID)) {
        this.toast.warning('Please select Component');          
        return;
      } 

      this.checkList = []; 
        const req = {
          type:id,
          ID:this.fyID,
          POID:this.COMPID
        };

        this.spinner.show();
        const res = await this.OfficeModuleAPI.office_po_select(req); 
        this.spinner.hide();
        this.checkList = [];
        if (res.success) {
          
          this.checkList = res.result; this.cid=this.checkList.length;
        } else {
          this.toast.info(res.message);
        }
      
      
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  } 

  

  handleChange1() {
    let element0=  document.getElementById('COMPONENT');
     
  //   if(e.target.checked==true && e.target.value=="SUBCOMPONENT")
  
  //   { //this.toast.info("SUBCOMPONENT CHECKED");
  //    this.typeid=14;this.componentChange();}
  //   // if(e.target.checked==false && e.target.value=="SUBCOMPONENT")
  //   // this.toast.info("SUBCOMPONENT UNCHECKED");
  //   if(e.target.checked==true && e.target.value=="COMPONENT")
  //  { //this.toast.info("COMPONENT CHECKED");
  //  this.typeid=8;this.componentChange();}
  //   // if(e.target.checked==false && e.target.value=="COMPONENT")
  //   // this.toast.info("COMPONENT UNCHECKED"); 
  //   //  console.log(e.target.value);
     }

  handleChange(e) {

  if(e.target.checked==true && e.target.value=="SUBCOMPONENT")
  { //this.toast.info("SUBCOMPONENT CHECKED");

  // this.typeid=14;this.componentChange();
  this.typeid=34;this.componentChange(34);
  }
  // if(e.target.checked==false && e.target.value=="SUBCOMPONENT")
  // this.toast.info("SUBCOMPONENT UNCHECKED");
  if(e.target.checked==true && e.target.value=="COMPONENT")
 { //this.toast.info("COMPONENT CHECKED");
 this.typeid=8;this.componentChange(8);}
  // if(e.target.checked==false && e.target.value=="COMPONENT")
  // this.toast.info("COMPONENT UNCHECKED"); 
  //  console.log(e.target.value);
  }

 async btnSubmitDetails():Promise<void>{
  try { 
    debugger;
    if (this.utils.isEmpty(this.COMPID)) {
      this.toast.warning('Please select Component');         
      return;
    } 
    let j=this.cid;
    let str='';
for(let i=1;i<=j;i++){   
    let element2=  document.getElementById('txtqty_'+i).getAttribute("name");
    let qty=  (<HTMLInputElement>document.getElementById('txtqty_'+i)).value;
    let price=  (<HTMLInputElement>document.getElementById('txtprice_'+i)).value;
    let bid=(<HTMLInputElement>document.getElementById('bid_'+i)).value;
    if(parseFloat(qty)>0 && parseFloat(price)>0){
if(element2.replace('txt_','')!=''){
         if(qty!=null &&  qty!='' && price!=null &&  price!='') 
        str=str+ element2.replace('txt_','')+','+qty+','+price+','+bid+'/'
      else if(qty!=null &&  qty!='' &&  (price=='' ||  price ==null))
      {this.toast.warning('Please Enter Price for Component ID='+element2.replace('txt_','') + ', Qty='+qty); return;}
      else if(price!=null &&  price!='' &&  (qty=='' ||  qty ==null))
      {this.toast.warning('Please Enter Qty for Component ID='+element2.replace('txt_','') + ', Price='+price); return;}
}
    } 
else this.toast.warning('Please select Component');
 

}
//this.toast.warning(str);

debugger;
const reqdistrict={
  type:1,
  TXNDATE:this.session.getTodayDateString(),
  COMPID:this.COMPID,
  SUBCOMPID:this.COMPID,//''
  PRICE:'',
  QTY:'',
  STATUS:'',
  ROLE:this.session.desigId,
  INSERTEDBY:this.session.userName,
  UNIQUEID:this.session.uniqueId,
  DISTRICTID:this.session.districtId,
  stringtotalcomponents:str,
  FINANCIAL_YEAR_ID:this.fyID,
  TYPE_ID:this.tID,
  TENDER_TYPE_ID:this.ttID,
  INTPUT_01:'0',
  INTPUT_02:'0',
  INTPUT_03:'0',
  INTPUT_04:'0'

}  
const res = await this.OfficeModuleAPI.officeTenderPriceDetailsSub(reqdistrict); 
if (res.success) { debugger
  //this.componentListdata = res.result; 
  this.toast.success(res.message);
  
  // this.checkList =[];
  // this.componentListdata = [];
 window.location.reload();


} else {
  this.toast.info(res.message);
}
this.spinner.hide();




  
} catch (error) {
  this.spinner.hide();
  this.utils.catchResponse(error);
}
 }


 async Deletepacket(priceid): Promise<void> {
  try { 

    if(confirm('Are you sure to Delete Record ?')){ 
    const req = {
      type:17,
      ID:priceid
    };

    this.spinner.show();
    const res = await this.OfficeModuleAPI.office_po_select(req); 
    this.spinner.hide();
    this.priceList = [];
    if (res.success) {

      this.priceList = []; 
      const req = {
        type:15,
        ID:priceid
      };  
      this.spinner.show();
      const res = await this.OfficeModuleAPI.office_po_select(req); 
      this.spinner.hide();      
      this.priceList = res.result; 
    } 
  } 
} catch (error) {
  this.spinner.hide();
  this.utils.catchResponse(error);
}

}
}
