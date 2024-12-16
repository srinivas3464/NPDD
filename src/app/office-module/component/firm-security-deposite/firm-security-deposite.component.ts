import { THIS_EXPR, TryCatchStmt } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { OfficeserviceService } from '../../services/officeservice.service';
import { DatePickerService } from 'src/app/shared/services/date-picker.service'; 
import { datePickerConfig } from 'src/app/shared/models/date-picker.models';
  import { parseDate } from 'ngx-bootstrap/chronos';
  import { parse } from 'path';
import { Router } from '@angular/router';
//import { moment } from 'ngx-bootstrap/chronos/test/chain';

@Component({
  selector: 'app-firm-security-deposite',
  templateUrl: './firm-security-deposite.component.html',
  styleUrls: ['./firm-security-deposite.component.css']
})
export class FirmSecurityDepositeComponent implements OnInit {
  FIRMID='';diffInDays:any;
  formdata:[];
  firmdetailsList:[];SecuDepList:[];
  sddate=this.session.getTodayDateString();
  minDate: Date;  maxDate: Date;minDate1: Date;  maxDate1: Date;
  ctype='';ChequeNo='';ChequeDate=this.session.getTodayDateString() ;deptamount='';
  DueDate=this.session.getTodayDateString() ;
  dtOptions: DataTables.Settings = this.utils.dataTableOptions();
  dtTrigger: Subject<any> = new Subject();
  pendtTrigger: Subject<any> = new Subject();
  
  constructor(  private toast: ToasterService,
    private utils: UtilsService,  
    private session: SessionService, 
    private OfficeModuleAPI: OfficeserviceService, 
    private spinner: NgxSpinnerService, private router: Router  ) { } 

  ngOnInit(): void {  
    if(this.session.uniqueId !="" && this.session.desigId != ""){
    this.maxDate=new Date(); 
    
   // this.minDate1=new Date;
    //this.minDate1=moment(new Date()).format('YYYY-MM-DD')
    this.FirmLists();this.ctype=undefined;
  }
  else
  {
    this.router.navigate(['/shared/UnAuthorized']);
  }
  } 

  async FirmLists(): Promise<void> {
    try {     debugger;
      const reqdistrict={
        type:"2",
        
 UNIQUEID:this.session.uniqueId,
 ROLE:this.session.desigId,
 INSERTEDBY:this.session.userName
      }  
      const res = await this.OfficeModuleAPI.office_po_select(reqdistrict); 
      if (res.success) { 
        this.formdata = res.result;  
        this.FIRMID=undefined;
      } else {
        this.toast.info(res.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
  
  async FirmListsbyFIRID(): Promise<void> {
    try {  
      if (this.utils.isEmpty(this.FIRMID)) {
        this.toast.warning('Please select FIRM');         
        return;
      } 
      this.Depostdetails();


      const reqdistrict={
        type:"7",
        FORMID:this.FIRMID,
        UNIQUEID:this.session.uniqueId,
ROLE:this.session.desigId,
INSERTEDBY:this.session.userName
      }  
      const res = await this.OfficeModuleAPI.office_po_select(reqdistrict); 
      if (res.success) {  
        this.firmdetailsList=res.result;
      } else {
        this.toast.info(res.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

 
async Depostdetails():Promise<void>{
  try {
    if (this.utils.isEmpty(this.FIRMID)) {
      this.toast.warning('Please select FIRM');         
      return;
    }
    this.SecuDepList=[];
    const reqdistrict={
      type:"2",
       
      FIRMID:this.FIRMID};
      const res = await this.OfficeModuleAPI.officeSecuDepositSub(reqdistrict); 
      if (res.success) { 
        this.SecuDepList=res.result;
      }
     else {  this.SecuDepList=[];
      //this.toast.info(res.message);
    }
    this.spinner.hide();


  } catch (error) {
    throw error;
  }

}

  async btnSubmitDetails():Promise<void>{
     try {
      if (this.validate()) {

      const reqdistrict={
        type:"1",
        id:'0',
        DEPTID:'',
        FIRMID:this.FIRMID,
        SDDATE:this.sddate,
        CTYPE:this.ctype,
        TXNCHQNO:this.ChequeNo,
        TXNCHQDATE:this.ChequeDate,
        DEPTAMOUNT:this.deptamount,
        INSERTEDBY:this.session.userName,
        ROLE:this.session.desigId,
        UNIQUEID:this.session.uniqueId,  
        DueDate:this.DueDate
        
      };  this.spinner.show();
      const res = await this.OfficeModuleAPI.officeSecuDepositSub(reqdistrict); 
this.spinner.hide();
      if (res.success) { 
        this.toast.info(res.message);
        this.FIRMID=undefined;
        window.location.reload();

      } else {
        this.toast.info(res.message);
      }
      this.spinner.hide();
    } 
     } catch (error) { 
     }
  } 
  validate(): boolean {
try { 
  if ( this.FIRMID === '' || this.FIRMID === null || this.FIRMID === undefined ) 
  { this.toast.warning('Please Select Firm Name');    return false;    }
  if ( this.sddate === '' || this.sddate === null || this.sddate === undefined ) 
  { this.toast.warning('Please Select Date');    return false;    }
  if ( this.ctype === '' || this.ctype === null || this.ctype === undefined ) 
  { this.toast.warning('Please Select Type');    return false;    }
  if ( this.ChequeNo === '' || this.ChequeNo === null || this.ChequeNo === undefined ) 
  { this.toast.warning('Please Select Cheque No');    return false;    }
  if ( this.ChequeDate === '' || this.ChequeDate === null || this.ChequeDate === undefined ) 
  { this.toast.warning('Please Select Cheque Date');    return false;    }
  if ( this.deptamount === '' || this.deptamount === null || this.deptamount === undefined ) 
  { this.toast.warning('Please Select Deposit Amount');    return false;    }

  // this.firstDate = moment(this.ChequeDate);
  // this.secondDate = moment(this.DueDate);
//   this.diffInDays = Math.abs(moment(this.ChequeDate).diff(moment(this.DueDate), 'days')); 
// if(this.diffInDays<0){this.toast.warning('Due Date > Cheque Date');    return false;   }
   
// let todayDate = new Date(this.ChequeDate);
//             let sentOnDate = new Date(this.DueDate);
//             sentOnDate.setDate(sentOnDate.getDate());
            let differenceInTime = parseDate(this.ChequeDate).getTime() - parseDate(this.DueDate) .getTime();
            // To calculate the no. of days between two dates
            let differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24)); 
            


  return true;
} catch (error) {
  throw error;
}
  }

  
  async addEvent(): Promise<void> {
    try {  debugger;
      if (this.utils.isEmpty(this.ChequeDate)) {
        this.DueDate=this.ChequeDate;
        this.minDate1=new Date(this.ChequeDate);

        this.toast.warning('Please select Cheque Date');         
        return;
      }  
      //this.minDate1=parseDate(this.ChequeDate);
       
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

}
