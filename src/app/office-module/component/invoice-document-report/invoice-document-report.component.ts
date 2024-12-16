import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild  } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { OfficeserviceService } from '../../services/officeservice.service';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-invoice-document-report',
  templateUrl: './invoice-document-report.component.html',
  styleUrls: ['./invoice-document-report.component.css']
})
export class InvoiceDocumentReportComponent implements OnInit, OnDestroy, AfterViewInit  {

  POlist:[];InvoiceReportsList:[];VENDOR=true;
  PMID:any;PONUMBER:any;
  
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective; 
  dtOptions: DataTables.Settings = this.utils.dataTableOptions();
  dtTrigger: Subject<any> = new Subject(); 
    pendtTrigger: Subject<any> = new Subject();
    
  constructor(private toast: ToasterService,
    private utils: UtilsService,   
    private session: SessionService, 
    private OfficeModuleAPI: OfficeserviceService, 
    private spinner: NgxSpinnerService,  private router: Router ) { }

    ngOnInit(): void {
    if(this.session.uniqueId !="" && this.session.desigId != ""){
           this.Invoicedetails();
           if(this.session.desigId<30) this.VENDOR=true; else this.VENDOR=false;
      } else {
    this.router.navigate(['/shared/UnAuthorized']);
      }
   
  }

  async Invoicedetails(): Promise<void> {
    try { 
      const req={
        type:"8", //6
        UNIQUEID:this.session.uniqueId,
        ROLE:this.session.desigId,
     };
     this.spinner.show();
     const res = await this.OfficeModuleAPI.officeInvoiceReports(req); 
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


    async poByID(): Promise<void> {
    try {     
      const reqdistrict={
        type:"5",
        PMID:this.PMID,
        UNIQUEID:this.session.uniqueId,
        ROLE:this.session.desigId,
      } ;
      this.spinner.show(); 
      const res = await this.OfficeModuleAPI.officeInvoiceReports(reqdistrict); 
      this.spinner.hide();
      if (res.success) { 
        this.InvoiceReportsList = res.result; 
        this.rerender();
      } else {
        this.toast.info(res.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
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
}

