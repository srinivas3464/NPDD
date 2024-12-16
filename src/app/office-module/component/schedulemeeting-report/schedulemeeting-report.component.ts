import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { OfficeserviceService } from '../../services/officeservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-schedulemeeting-report',
  templateUrl: './schedulemeeting-report.component.html',
  styleUrls: ['./schedulemeeting-report.component.css']
})
export class SchedulemeetingReportComponent implements OnInit {
  TRAININGID:any;
  POlist:[];

  excelData: any[] = [];



  constructor(private toast: ToasterService,
    private utils: UtilsService,  
    private session: SessionService, 
    private OfficeModuleAPI: OfficeserviceService, 
    private spinner: NgxSpinnerService, private router: Router) { }

  ngOnInit(): void {
    this.excelData = [];
    if(this.session.uniqueId !="" && this.session.desigId != ""){
    this.Traningscheduledetails();

  } else {
    this.router.navigate(['/shared/UnAuthorized']);
      }
  }
  btnExcel(): void {
    debugger;
    
        this.utils.JSONToCSVConvertor(
            this.excelData,
            'Components',
            true
        );
    
}

  async Traningscheduledetails(): Promise<void> {
    try { 
      const req={
        TYPE:"1", 
        UNIQUEID:this.session.uniqueId,
        ROLE:this.session.desigId,
        INSERTEDBY:this.session.userName
     };
     this.spinner.show();
     const res = await this.OfficeModuleAPI.officescheduletestingSelect(req); 
     this.spinner.hide();  
      if (res.success) { 
        this.POlist = res.result; 
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

  async onScheduleChange(): Promise<void> {
    try {  
        
       if (this.utils.isEmpty(this.TRAININGID))
       {
         this.toast.warning('Select Schedule Testing');
         return;
       }
       else
       {
         //this.ClearAllControls();
        // if(this.TRAININGID==="1"){this.ft=true;this.st=false;this.bt =false;}
        // else if(this.TRAININGID==="2"){this.ft=false;this.st=true;this.bt =false;this.ricphno=this.ssricphno;}
        // else if(this.TRAININGID==="3"){this.ft=false;this.st=false;this.bt =true;}
        // else {this.ft=false;this.st=false;this.bt =false;}
       // this.TraningscheduleMENTOR_Mobilenodetails();

         
       }
       

              
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
}
