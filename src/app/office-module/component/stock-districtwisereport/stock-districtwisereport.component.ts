import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { OfficeserviceService } from '../../services/officeservice.service';
import { Subject } from 'rxjs/internal/Subject';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-stock-districtwisereport',
  templateUrl: './stock-districtwisereport.component.html',
  styleUrls: ['./stock-districtwisereport.component.css']
})
export class StockDistrictwisereportComponent implements   OnInit, OnDestroy, AfterViewInit  {

  distSelected:any;districtListdata=[];detailslist=[];InvoiceReportsList=[];

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective; 
  dtOptions: DataTables.Settings = this.utils.dataTableOptions();
  dtTrigger: Subject<any> = new Subject(); 
    pendtTrigger: Subject<any> = new Subject();
    excelData: any[] = [];
    id: number;
  constructor( private toast: ToasterService,
    private utils: UtilsService,  
    private session: SessionService,  
    private OfficeModuleAPI: OfficeserviceService, 
    private spinner: NgxSpinnerService, private router: Router) { }

  ngOnInit(): void {
    if(this.session.uniqueId !="" && this.session.desigId != ''){ 
      this.DistrictLists();
    }
    else
    {
      this.router.navigate(['/shared/UnAuthorized']);
    }

  }


  async DistrictLists(): Promise<void> {
    try {    
       

      const reqdistrict={
        type:"42",
        Role:this.session.desigId,
        UNIQUEID:this.session.uniqueId,
        DISTRICTID:this.session.districtId,
        INSERTEDBY:this.session.userName,

      };  
      const res = await this.OfficeModuleAPI.office_po_select(reqdistrict); 
      if (res.success) { 
        this.districtListdata = res.result; 
      } else {
        this.toast.info(res.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
   

  async onDISTRICtChange(): Promise<void> {
    try {  
      if (this.utils.isEmpty(this.distSelected)) {
        this.toast.warning('Select District');
        return;
      } 
      const req={
        type:"19", 
        id:this.distSelected,
        ROLE:this.session.desigId,
        UNIQUEID:this.session.uniqueId,
        INSERTEDBY:this.session.userName
     };
      
     this.spinner.show();debugger;
     const res = await this.OfficeModuleAPI.tenderdetailsSelect(req); 
     this.spinner.hide();  this.excelData = [];
      if (res.success) { 
        this.detailslist = res.result; 
         this. rerender();

         this.excelData = [];


debugger;

         for (var i = 0; i < res.result.length; i++) {


           
              let SingleRowone = {
                  S_NO: i + 1,
                  PONUMBER: res.result[i].PONUMBER,
                  PODATE:res.result[i].PODATE,
                  POQTY: res.result[i].POQTY,
                  INVOICENO: res.result[i].INVOICENO,
                  INVOICEDATE: res.result[i].INVOICEDATE,
                  INVOICEQTY:res.result[i].INVOICEQTY,
                  ENTRYDATE: res.result[i].ENTRYDATE,
                  RECEIVEDQTY: res.result[i].RECEIVEDQTY,
                  BALANCEQTY: res.result[i].BALANCEQTY                 

              }
              this.excelData.push(SingleRowone);
          
      } 

      } else {this.excelData = [];
        this.toast.info(res.message);
      }
      this.spinner.hide();
    } catch (error) {this.excelData = [];
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


  btnExcel(): void {
        debugger;
        
            this.utils.JSONToCSVConvertor(
                this.excelData,
                'Stock District wise Report',
                true
            ); 
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
 