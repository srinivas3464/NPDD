import {  Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { OfficeserviceService } from '../../services/officeservice.service';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-invoice-report',
  templateUrl: './invoice-report.component.html',
  styleUrls: ['./invoice-report.component.css'] 
})
export class InvoiceReportComponent implements   OnInit, OnDestroy, AfterViewInit {

  invdetailslist:[];InvoiceReportsList:[];
  INVID:any;
  excelData: any[] = [];
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
      } else {
    this.router.navigate(['/shared/UnAuthorized']);
      }
     
  }

  async Invoicedetails(): Promise<void> {
    try { 
      const req={
        type:"10",//1 
        UNIQUEID:this.session.uniqueId,
        ROLE:this.session.desigId,
        //INSERTEDBY:this.session.userName
     };
     this.spinner.show();debugger;
     const res = await this.OfficeModuleAPI.officeInvoiceReports(req); 
     this.spinner.hide();  
      if (res.success) { 
        this.invdetailslist = res.result;  
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
  btnExcel(): void {
    debugger;
    
        this.utils.JSONToCSVConvertor(
            this.excelData,
            'Invoice Report',
            true
        );
    
}

  async InvoiceByID(): Promise<void> {
    try {     
      const reqdistrict={
        type:"2",
        INVID:this.INVID,
        UNIQUEID:this.session.uniqueId,
      } ;
      this.spinner.show(); 
      const res = await this.OfficeModuleAPI.officeInvoiceReports(reqdistrict); 
      this.spinner.hide();
      if (res.success) { this.excelData = [];
        this.InvoiceReportsList = res.result; 
        this.rerender();

        for (var i = 0; i < res.result.length; i++) { 
          let SingleRowone = {
              S_NO: i + 1,
              INVOICENO: res.result[i].INVOICENO,
              INVOICEDATE: res.result[i].INVOICEDATE,
              FIRMNAME: res.result[i].FIRMNAME,
              COMPNAME: res.result[i].COMPNAME,
              PONUMBER: res.result[i].PONUMBER,
              UOMNAME: res.result[i].UOMNAME,
              UNITS: res.result[i].UNITS,
              PRICES: res.result[i].PRICES,
              PRICE_UNIT: res.result[i].PRICE_UNIT,
              TOTAL: res.result[i].TOTAL,
              DISCOUNT: res.result[i].DISCOUNT,
              COMENTS: res.result[i].COMENTS,
          }
          this.excelData.push(SingleRowone);
      
      
  }





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
