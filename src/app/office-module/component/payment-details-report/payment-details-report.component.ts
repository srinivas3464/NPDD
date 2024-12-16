import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { OfficeserviceService } from '../../services/officeservice.service';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-payment-details-report',
  templateUrl: './payment-details-report.component.html',
  styleUrls: ['./payment-details-report.component.css']
})
export class PaymentDetailsReportComponent implements   OnInit, OnDestroy, AfterViewInit {
  PMID:any;Paymentdetailslist=[];
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

    ngOnInit(): void { this.excelData = [];
    if(this.session.uniqueId !="" && this.session.desigId != ""){
          this.Paymentdetails();
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
  async Paymentdetails(): Promise<void> {
    try { debugger;
      this.Paymentdetailslist =[];
      if (this.utils.isEmpty(this.PMID)) { this.PMID="0";}
      const req={
        type:"10", 
        UNIQUEID:this.session.uniqueId,
        ROLE:this.session.desigId,
        INSERTEDBY:this.session.userName,
       id:this.PMID,
     };
     this.spinner.show();
     const res = await this.OfficeModuleAPI.tenderdetailsSelect(req); 
     this.spinner.hide();  
      if (res.success) { 
        this.Paymentdetailslist = res.result; 
        this.rerender();


          
for (var i = 0; i <  res.result.length; i++) {  
  let SingleRowone = {
      S_NO: i + 1,
      PONUMBER:  res.result[i].PONUMBER,
      PODATE:  res.result[i].PODATE,
      INVOICENO:  res.result[i].INVOICENO,
      INVOICEDATE:  res.result[i].INVOICEDATE,
      GROSSINVOICEVAL:  res.result[i].GROSSINVOICEVAL,
      DEDUCTION:  res.result[i].DEDUCTION,
      CGST:  res.result[i].CGST,
      SGST:  res.result[i].SGST,
      IGST:  res.result[i].IGST,
      TDS:  res.result[i].TDS,
      NETPAYMENT:  res.result[i].NETPAYMENT,
      CHEQUENO:  res.result[i].CHEQUENO, 
      CHEQUEDATE:  res.result[i].CHEQUEDATE,
      UTR:  res.result[i].UTR,


  }
  this.excelData.push(SingleRowone); 
}




      } else {
       // this.toast.info(res.message);
      }
      this.spinner.hide();
    }
    catch (error) {
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
