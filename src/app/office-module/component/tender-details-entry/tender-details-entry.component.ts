import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { OfficeserviceService } from '../../services/officeservice.service';
import { Subject } from 'rxjs/internal/Subject';
import { pid } from 'process';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tender-details-entry',
  templateUrl: './tender-details-entry.component.html',
  styleUrls: ['./tender-details-entry.component.css']
})
export class TenderDetailsEntryComponent implements OnInit {
  FIRMID:any; tendernoticeno:any;NatureofWork:any;tenderendtime:any;tenderstarttime:any;paymentmode:any;paymentdetailsNo:any;
  deptamount:any;quotepriceamount:any;rating:any;str:any;
  formdata:[];paymentdata:[];paymentList:[];ratinglist:[]; Listpaymodedetails=[];Deal=[];
  tenderdate=this.session.getTodayDateString();
  biddocstartdate=this.session.getTodayDateString();
  biddocendate=this.session.getTodayDateString();
  paydate=this.session.getTodayDateString();
  minDate: Date;  maxDate: Date;
  minDate1: Date;  maxDate1: Date;
  minDate2: Date;  maxDate2: Date;
  minDate3: Date;  maxDate3: Date;

  dtOptions: DataTables.Settings = this.utils.dataTableOptions();
  dtTrigger: Subject<any> = new Subject();
  pendtTrigger: Subject<any> = new Subject();
  
  constructor(  private toast: ToasterService,
    private utils: UtilsService,  
    private session: SessionService, 
    private OfficeModuleAPI: OfficeserviceService, 
    private spinner: NgxSpinnerService, private router: Router) { }

  ngOnInit(): void {
    if(this.session.uniqueId !="" && this.session.desigId != ""){
    this.FirmLists();
    this.paymentmodeLists(1,1);
    this.paymentmodeLists(1,3);
  //  this.Listpaymodedetails.push('ID','Paymentmode','Date','TransactionNo','Amount');

} else {
  this.router.navigate(['/shared/UnAuthorized']);
    }

  }

  async FirmLists(): Promise<void> {
    try {     
      const reqdistrict={
        type:"2"   
      }  
      const res = await this.OfficeModuleAPI.office_Tenderdetails_select(reqdistrict); 
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

  async tendernoticenochange(): Promise<void> {
try {
  this. paymentmodeLists(3,this.tendernoticeno);
  
} catch (error) {
  
}
  }

  async paymentmodeLists(tyeid,PID): Promise<void> {
    try {     debugger;
      const reqdistrict={
        type:tyeid,  //"1"
        ID:PID 
      } ;
       this.paymentdata =[];
      const res = await this.OfficeModuleAPI.office_Tenderdetails_select(reqdistrict); 
      if (res.success) { 
        if(tyeid===1 && PID===1) this.paymentdata = res.result; 
         if(tyeid===1 && PID===3) this.ratinglist = res.result;
          if(tyeid===3) this.paymentList = res.result;

        
      } else {
        if(tyeid===1 && PID===1) this.paymentdata = res.result; 
          if(tyeid===1 && PID===3) this.ratinglist = res.result;
         if(tyeid===3) this.paymentList = res.result;

        //this.toast.info(res.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
  
  async btnAddDetails():Promise<void>{
    try {

      // if(this.str===undefined)
      // this.str="[{ID:1,PAYMENTMODE : "+this.paymentmode +",DATE:"+this.paydate+",DETAILS:"+this.paymentdetailsNo+",AMOUNT:"+this.deptamount+"}";
      // else
      // this.str=this.str+",{ID:2,PAYMENTMODE : "+this.paymentmode +",DATE:"+this.paydate+",DETAILS:"+this.paymentdetailsNo+",AMOUNT:"+this.deptamount+"}]";
      // this.paymentList=this.str;

    //   this.Listpaymodedetails= [
    //     {
    //         "ID": "1",
    //         "PAYMENTMODE": "1",
    //         "DATE": "EMD",
    //         "DETAILS": "1",
    //         "AMOUNT":"3333"
    //     },
    //     {
    //         "ID": "2",
    //         "PAYMENTMODE": "2",
    //         "DATE": "FEE",
    //         "DETAILS": "1",
    //         "AMOUNT":"2222"
    //     }
    // ];
    // this.paymentList.push(this.Listpaymodedetails)
     

  const req={
    type:'1',
    TenderNoticeNo: this.tendernoticeno,
    PaymentModeID: this.paymentmode,
    PaymentDate: this.paydate,
    PaymentDetails: this.paymentdetailsNo,
    PaymentAmount:this.deptamount,

    UNIQUEID:this.session.uniqueId,
    ROLE:this.session.desigId,
    INSERTEDBY:this.session.userName
            }
            var fieldElement = <HTMLInputElement>document.getElementById('tendernoticeno'); 
             // fieldElement.readOnly = true;

        //    document.getElementById('tendernoticeno').style.display="none";
            const res = await this.OfficeModuleAPI.office_TenderPayment_Sub(req); 
            if (res.success) { 
              this.paymentmodeLists(3, this.tendernoticeno);
              fieldElement.readOnly = true;
               
            } else {
              this.toast.info(res.message);
              fieldElement.readOnly = false;
            }
            this.spinner.hide();
    //  this.Deal= [{ PAYMENTMODE : this.paymentmode,DATE:this.paydate,DETAILS:this.paymentdetailsNo,AMOUNT:this.deptamount },];//( this.paymentmode,this.paydate,this.paymentdetailsNo,this.deptamount ) 
     
    //  // this.publicDeals.push( deal )
    //   this.Listpaymodedetails.push( this.Deal);
      
    //   for(let i=0;i<this.Listpaymodedetails.length;i++)
    //   this.paymentList.concat(this.Listpaymodedetails[i] ) ;
    //   // this.Listpaymodedetails.push('paymentmode'+this.paymentmode
    //   // ,+' - '+this.paydate+' - '+this.paymentdetailsNo +' - '+this.deptamount);
    } catch (error ) {
      this.toast.info(this.paymentList.toString());
      
    }
  }


  async btnsubmitDetails():Promise<void>{
    try {
      
    } catch (error ) {
      this.toast.info('');
      
    }
  }

  

  async btnclearDetails():Promise<void>{
    try {
      
    } catch (error ) {
      this.toast.info('');
      
    }
  }
}
