import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { OfficeserviceService } from '../../services/officeservice.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-approvals-reports',
  templateUrl: './approvals-reports.component.html',
  styleUrls: ['./approvals-reports.component.css']
})
export class ApprovalsReportsComponent implements   OnInit, OnDestroy, AfterViewInit  {

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective; 
  dtOptions: DataTables.Settings = this.utils.dataTableOptions();
  dtTrigger: Subject<any> = new Subject(); 
    pendtTrigger: Subject<any> = new Subject();

    dtOptions1: DataTables.Settings = this.utils.dataTableOptions();
    dtTrigger1: Subject<any> = new Subject(); 

  GridDataold=[];GridData  =[];
  constructor(private toast: ToasterService,
    private utils: UtilsService, 
    private session: SessionService, 
    private OfficeModuleAPI: OfficeserviceService, 
    private spinner: NgxSpinnerService,
    private router: Router) { }

  ngOnInit(): void {  
      if(this.session.uniqueId !="" && this.session.desigId != '')
      { 
        this.approvalwisedetails();
         this.approvalDocwisedetails(); 
      }
      else
      {
        this.router.navigate(['/shared/UnAuthorized']);
      }

  }


  async approvalwisedetails(): Promise<void>  
  {
    try {
      this.GridDataold =[];
      const obj = {
        type:"1" 
          
      }; debugger; 
      const res = await this.OfficeModuleAPI.ApprovalDetails_Select(obj);
      
      this.spinner.hide();
      if (res.success) {debugger;
  
  
        this.GridDataold = res.result; 
        this.rerender();
        
      }
      else{
        this.GridDataold=[];
        return;
      }
    } catch (error) {
      
    }
  }

  async approvalDocwisedetails(): Promise<void>  
  {
    try {
      this.GridData  =[];
      const obj = {
        type:"2" 
          
      }; debugger; 
      const res = await this.OfficeModuleAPI.ApprovalDetails_Select(obj); 
      
      this.spinner.hide();
      if (res.success) { 
        this.GridData  = res.result; 
        this.rerender1();
      }
      else{
        this.GridDataold=[];
        this.spinner.hide();
        this.toast.warning(res.message);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error+"approvalDocwisedetails");
    }
  }

  async btnPdfView(pdf): Promise<void> {
    try {
      this.spinner.show();
      const res = await this.utils.AdminFileDownload(pdf);
      if (res.success) {
        this.utils.viewPDF(res.result);
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

    rerender1(): void {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        // Destroy the table first
        dtInstance.destroy();
        // Call the dtTrigger to rerender again
        this.dtTrigger1.next();
      });
    }

}
 