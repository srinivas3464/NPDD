import {   Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner'; 
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { OfficeserviceService } from '../../services/officeservice.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-po-distrcit-qty-changes-report',
  templateUrl: './po-distrcit-qty-changes-report.component.html',
  styleUrls: ['./po-distrcit-qty-changes-report.component.css']
})
export class PoDistrcitQtyChangesReportComponent implements    OnInit, OnDestroy, AfterViewInit {

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective; 
  dtOptions: DataTables.Settings = this.utils.dataTableOptions();
  dtTrigger: Subject<any> = new Subject(); 
    pendtTrigger: Subject<any> = new Subject(); 
    
  Podetailslist=[];PMID:any;SLNO:any;GridData =[];GridDataold=[];fromfyID:any;
  GridDatalist=[];
  excelData: any[] = [];
  constructor(private toast: ToasterService,
    private utils: UtilsService, 
    private session: SessionService, 
    private OfficeModuleAPI: OfficeserviceService, 
    private spinner: NgxSpinnerService,
    private router: Router) { }

  ngOnInit(): void {
    this. podetailsselect();
  }

  async podetailsselect(): Promise<void> {
    try { debugger;
      const req={ 
        type:"4", 
        UNIQUEID:this.session.uniqueId,
        ROLE:this.session.desigId,
        INSERTEDBY:this.session.userName,
     }; 
     this.spinner.show();
     const res = await this.OfficeModuleAPI.tenderdetailsSelect(req); 
     this.spinner.hide();  
      if (res.success) { //this.excelData = [];
        this.Podetailslist = res.result; 
debugger;



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

  async POBYPONUMBER(): Promise<void> {
    try {   
      if (this.utils.isEmpty(this.PMID)) {
        this.toast.warning('Please Enter PONUMBER');
        return;
      }
      debugger;
      const obj = {
        type: "54",
        ID: this.PMID
    };
    this.GridData =[];
    const res = await this.OfficeModuleAPI.office_po_select(obj);
      if (res.success) {  debugger;
       
         this.GridData = res.result; 
      } else {
        this.toast.info(res.message);
      }
       //this.POBYPODetails();
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
            'APPROVALS REPORT',
            true
        );
    
}
  async onDistrictwiseqtyChange(): Promise<void>  
  {
    try { debugger
      this.GridDatalist=[];
        
      const obj = {
          type: "7",  //5
          INPUT01: this.SLNO
      };  
      
      const res = await this.OfficeModuleAPI.ApprovalDetails_Select(obj);
      this.spinner.hide();
      if (res.success) {debugger; this.excelData = [];
        this.GridDatalist = res.result;  
        
        
        
        
for (var i = 0; i <res.result.length; i++) {
  let SingleRowone = {
      S_NO: i + 1,
      PO_DISTRICT_QTY:res.result[i].PO_DISTRICT_QTY,
      PO_DISTRICT_AMOUNT:res.result[i].PO_DISTRICT_AMOUNT,
      UPDATED_QTY: res.result[i].UPDATED_QTY,
      UPDATE_AMOUNT: res.result[i].UPDATE_AMOUNT,
       
              // APPROVAL_DATE      :       null
              // ID      :       null
              // INSERTED_BY      :       "Mech_eng"
              // INSERTED_ON      :       "01-03-2024 19:23:39"  
              // PO_DISTRICT_AMOUNT      :       "2958399.24"
              // PO_DISTRICT_QTY      :       "2"
              // ROLE      :       "50"
              // UNIQUE_ID      :       "90142"
              // UPDATED_QTY      :       "5"
              // UPDATE_AMOUNT      :       "7395998"

  }
  this.excelData.push(SingleRowone);


}
      }
      else{  this.spinner.hide();
        this.GridDatalist=[];
         
      }
       
    } catch (error) {
      this.spinner.hide();
      
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
 