import {  Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { OfficeserviceService } from '../../services/officeservice.service';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-proceeding-details-report',
  templateUrl: './proceeding-details-report.component.html',
  styleUrls: ['./proceeding-details-report.component.css'] 
})
export class ProceedingDetailsReportComponent implements   OnInit, OnDestroy, AfterViewInit {
  proceedingList=[];

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective; 
  dtOptions: DataTables.Settings = this.utils.dataTableOptions();
  dtTrigger: Subject<any> = new Subject(); 
    pendtTrigger: Subject<any> = new Subject();
    
    excelData: any[] = [];

 



  constructor(private toast: ToasterService,
    private utils: UtilsService,  
    private session: SessionService, 
    private OfficeModuleAPI: OfficeserviceService, 
    private spinner: NgxSpinnerService, private router: Router ) { }

  ngOnInit(): void {this.excelData = [];
    if(this.session.uniqueId !="" && this.session.desigId != ""){
    this.GetProceedingDetails();
  } else {
    this.router.navigate(['/shared/UnAuthorized']);
      }
  } 
  async GetProceedingDetails():Promise<void>{
    try { 
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
      this. rerender();
      for (var i = 0; i < res.result.length; i++) {


                    
        let SingleRowone = {
            S_NO: i + 1,
            PRCID: res.result[i].PRCID,
            PONUMBER: res.result[i].PONUMBER,
            INV_TYPE: res.result[i].INV_TYPE,
            DATEOFSANTION: res.result[i].DATEOFSANTION,

            PROCEDINGNO: res.result[i].PROCEDINGNO,
            QTY: res.result[i].QTY,
            PAYMENTAMOUNT: res.result[i].PAYMENTAMOUNT,
            PAYMENTPER: res.result[i].PAYMENTPER +"-"+"%",

            DISTRICTNAME: res.result[i].DISTRICTNAME,
            



        }
        this.excelData.push(SingleRowone);
    
    
}


      }
      else  this.toast.info(res.message);
    }
   catch (error) { 
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
ngOnDestroy(): void {
  //     // Do not forget to unsubscribe the event
        this.dtTrigger.unsubscribe();
    }
    ngAfterViewInit(): void {
        this.dtTrigger.next();
   }
   rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }


}
