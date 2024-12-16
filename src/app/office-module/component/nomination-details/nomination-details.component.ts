import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { OfficeserviceService } from '../../services/officeservice.service';

@Component({
  selector: 'app-nomination-details',
  templateUrl: './nomination-details.component.html',
  styleUrls: ['./nomination-details.component.css']
})
export class NominationDetailsComponent implements OnInit {
  Financialyeardata=[];
  fyID:any;typeID:any;NatureID:any;CategoryID:any;DescID:any;RatingLevelList: any[] = [];Rating:any;
  typeothers:any;typeothersdisplay=false;statusID:any;
  Category: any[] = [];
  NatureType: any[] = [];
  typedata: any[] = [];
  Descriptiondata: any[] = [];
  ApprovedstatusList: any[] = [];
  constructor( private toast: ToasterService,
    private utils: UtilsService,
    private session: SessionService,
    private OfficeModuleAPI: OfficeserviceService,
    private spinner: NgxSpinnerService,
    private router: Router) { }

  ngOnInit(): void { this.Financialyeardetails();
    if (this.session.uniqueId != "" && this.session.desigId != "") {
    this.clearcontrols();
    
  } else {
    this.router.navigate(['/shared/UnAuthorized']);
}
  }
 

  async Financialyeardetails(): Promise<void> {  
    try {           
      const reqdistrict={
        type:38, 
        id:24
      };   this.spinner.show();
      const res = await this.OfficeModuleAPI.office_po_select(reqdistrict); 
      if (res.success) {   
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

async Categorylist(): Promise<void> {
  try {
      debugger
      const obj = {
          type: "11",
          INPUT_01:"7"
      }
      this.Category =[];
      const res = await this.OfficeModuleAPI.office_Budget_Select(obj);
      this.spinner.hide();
      if (res.success) {
          this.Category = res.result; 
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


async Descriptiondatalist(): Promise<void> {
  try {
      debugger
      const obj = {
          type: "36",
          TenderID:"9"
      }
      this.Descriptiondata =[];
      const res = await this.OfficeModuleAPI.TrenderDetails_select(obj);
      this.spinner.hide();
      if (res.success) {
          this.Descriptiondata = res.result; 
      } else {
          this.toast.warning(res.message);
          
      }
     
  }
  catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
  }
}


async typelist(): Promise<void> {
  try {
      debugger
      const obj = {
          type: "11",
          INPUT_01:"6"
      }
      this.typedata =[];
      const res = await this.OfficeModuleAPI.office_Budget_masters_Select(obj);
      this.spinner.hide();
      if (res.success) {
          this.typedata = res.result; 
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



async NatureTypelist(): Promise<void> {
  try {
      debugger
      const obj = {
          type: "11",
          INPUT_01:"8"
      }
      this.NatureType =[];
      const res = await this.OfficeModuleAPI.office_Budget_nomination_Select(obj);
      this.spinner.hide();
      if (res.success) {
          this.NatureType = res.result; 
      } else {
          this.toast.warning(res.message);
          return;
      }
      this.typelist();
  }
  catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
  }
}




async Approvedstatusdata(): Promise<void> {
  try {
      debugger
      const obj = {
          type: "36",
          TenderID:"10"
      }
      this.ApprovedstatusList =[];
      const res = await this.OfficeModuleAPI.TrenderDetails_select(obj);
      this.spinner.hide();
      if (res.success) {
          this.ApprovedstatusList = res.result; 
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

async addItem(): Promise<void> { 
  try {
    if (this.utils.DataValidationNullorEmptyorUndefined(this.fyID)) {
      this.toast.info("Please Select Financial Year");
      return;
  }
  if (this.utils.DataValidationNullorEmptyorUndefined(this.typeID)) {
    this.toast.info("Please Select Type");
    return;
}

if (this.utils.DataValidationNullorEmptyorUndefined(this.CategoryID)) {
  this.toast.info("Please Select Category");
  return;
}
if (this.utils.DataValidationNullorEmptyorUndefined(this.NatureID)) {
  this.toast.info("Please Select Nature");
  return;
}

if (this.utils.DataValidationNullorEmptyorUndefined(this.DescID)) {
  this.toast.info("Please Select Description");
  return;
}
if (this.utils.DataValidationNullorEmptyorUndefined(this.Rating)) {
  this.toast.info("Please Select Rating");
  return;
}

if (this.utils.DataValidationNullorEmptyorUndefined(this.statusID)) {
  this.toast.info("Please Select Status");
  return;
}


if(this.typeID==="27"){
if (this.utils.DataValidationNullorEmptyorUndefined(this.typeothers)) {
  this.toast.info("Please Enter Others");
}
}

 
const req={
  type:12,
  FROM_FINANCIAL_YEAR:this.fyID,
  COMPONENT_ID:this.typeID,
  SUB_COMPONENT_ID:this.CategoryID,
  BUDGET_UNITS:this.Rating,
  BUDGET_AMOUNT:this.statusID,
  INPUT_01:this.NatureID,
  INPUT_02:this.DescID,
  ProceedingDetails:this.typeothers, 
  ROLE:this.session.desigId,
  UNIQUEID:this.session.uniqueId,
  INSERTEDBY:this.session.userName,

};

 debugger;
const res = await this.OfficeModuleAPI.office_Budget_Sub(req);
      this.spinner.hide();
      if (res.success) {
        //  this.ApprovedstatusList = res.result; 
        this.toast.warning(res.message);
        //this.clearcontrols();
        window.location.reload();
      } else {
          this.toast.warning(res.message);
          return;
      }



  } catch (ex) {
    
  }
}
clearcontrols()
{
  this.Financialyeardetails();//poselect
  this.RatingLevel();  //tenderselect
  this.Categorylist(); //budgetselect
  
  this.typelist();//office_Budget_masters_Select
  //this.Approvedstatusdata();//tenderselect
  this.NatureTypelist();//office_Budget_nomination_Select
  this.Descriptiondatalist();//tenderselect



  // office_Budget_masters_Select
  // office_Budget_nomination_Select
}

async TypeChange(): Promise<void> {
  try {this.typeothersdisplay=false;
    if(this.typeID==="27") 
      this.typeothersdisplay=true;
    
     

  } catch (ex) {
    
  }
}
}
