import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { OfficeserviceService } from '../../services/officeservice.service';

@Component({
  selector: 'app-budget-financialyears',
  templateUrl: './budget-financialyears.component.html',
  styleUrls: ['./budget-financialyears.component.css']
})
export class BudgetFinancialyearsComponent implements OnInit {
  fromfyID:any; tofyID:any;PAYMODE:any;COMPID:any;SUBCOMPID:any;Units:any;Amount:any;
Financialyeardata=[];componentListdata=[];subcomponentListdata=[];

  constructor(private toast: ToasterService,
    private utils: UtilsService, 
    private session: SessionService, 
    private OfficeModuleAPI: OfficeserviceService, 
    private spinner: NgxSpinnerService,
    private router: Router  ) { }

  ngOnInit(): void {
    if(this.session.uniqueId !="" && this.session.desigId != ""){
    this.Financialyeardetails();this.Componentdetails();
    //this.Budgetdetails();
    }
    else
  {
    this.router.navigate(['/shared/UnAuthorized']);
  }
  }


  async Financialyeardetails(): Promise<void> {  
    try {           
      const reqdistrict={
        type:32, 
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
      } ; 
      this.spinner.show();
      const res = await this.OfficeModuleAPI.office_po_select(reqdistrict); 
      if (res.success) { 
        this.spinner.hide();
        this.componentListdata = res.result; 
      } else { this.spinner.hide();
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
        if (this.utils.isEmpty(this.COMPID)) {
            this.toast.warning('Please select Component');
            return;
        } 

        const req = {
            type: 144,
            ID: this.COMPID
        };
debugger;
        this.spinner.show();
        const res = await this.OfficeModuleAPI.office_po_select(req);
        this.spinner.hide();
        this.subcomponentListdata = [];
        if (res.success) { 
            this.subcomponentListdata = res.result; 
        } else {
             this.toast.info(res.message);
        } 

    } catch (error) {
        this.spinner.hide();
        this.utils.catchResponse(error);
    }
}



async btnSubmitDetails():Promise<void>{

  try {
    
    if (this.validate()) {


      let fid= parseInt(this.fromfyID);
        let tid= parseInt(this.tofyID);
        if( parseInt(fid.toString()) > parseInt(tid.toString()))
          {  this.toast.warning('Please Select Valid Financial Years');return; }

      const req={ 
         type:"2",
         BUDGET_ID:"0",
         COMPONENT_ID:this.COMPID,
         SUB_COMPONENT_ID:this.SUBCOMPID,
         FROM_FINANCIAL_YEAR:fid,
         TO_FINANCIAL_YEAR:tid,
         BUDGET_UNITS:this.Units,
         BUDGET_AMOUNT:this.Amount,
         UNIQUEID:this.session.uniqueId,
         ROLE:this.session.desigId,
         INSERTEDBY:this.session.userName   
        };
      this.spinner.show();debugger;
      const res = await this.OfficeModuleAPI.office_Budget_Sub(req); 
      if (res.success) 
          {
            if(res.result[0].STATUS==="1")
            {
            this.spinner.hide();  
            this.Amount='';
            this.Units='';  
            this.toast.success(res.message); 
            //window.location.reload();
          // this.toast.success("Record Submitted Successfully");
            this.Amount='';
            this.Units='';
            this.SUBCOMPID=undefined;
            this.Budgetdetails();
            }
            else
            {
              this.spinner.hide();    
              this.toast.warning(res.message); 
            }
            this.spinner.hide();
          } 
      else {this.spinner.hide();
         this.toast.warning(res.result.MSG);
      }

    }
  }
  catch(ex)
  {
   // throw ex;
    this.utils.catchResponse(ex );
  }
}

validate(): boolean { 
debugger;
if ( this.fromfyID === '' ||  this.fromfyID === null ||  this.fromfyID === undefined    ) 
{    this.toast.warning('Please Select Financial From Year');      this.fromfyID=this.fromfyID.focus;      return false;    }

else   if ( this.tofyID === '' ||  this.tofyID === null ||  this.tofyID === undefined    ) 
{    this.toast.warning('Please Select Financial To Year');      this.tofyID=this.tofyID.focus;      return false;    }


else  if ( this.COMPID === '' ||  this.COMPID === null ||  this.COMPID === undefined    ) 
  {    this.toast.warning('Please Select Component');      this.COMPID=this.COMPID.focus;      return false;    }

   
 else if ( this.SUBCOMPID === '' ||  this.SUBCOMPID === null ||  this.SUBCOMPID === undefined    ) 
  {    this.toast.warning('Please Select Sub Component');      this.SUBCOMPID=this.SUBCOMPID.focus;      return false;    }
   

else   if ( this.Units === '' ||  this.Units === null ||  this.Units === undefined    ) 
{    this.toast.warning('Please Enter Units');      this.Units=this.Units.focus;      return false;    }

else   if ( this.Amount === '' ||  this.Amount === null ||  this.Amount === undefined    ) 
{    this.toast.warning('Please Enter Amount');      this.Amount=this.Amount.focus;      return false;    }

return true;
}


async Budgetdetails(): Promise<void> {
try {
  

  const req={ 
    type:"3", 
    UNIQUEID:this.session.uniqueId,
    ROLE:this.session.desigId,
    INSERTEDBY:this.session.userName   
 };
 this.spinner.show();
 const res = await this.OfficeModuleAPI.office_Budget_Select(req); 
 if (res.success) {    this.spinner.hide();


   this.toast.info(res.message); 
  // window.location.reload();
 } else {
    this.toast.info(res.result.message); 
 }
 this.spinner.hide();

} catch (ex) {
  this.spinner.hide();
}
}





}
