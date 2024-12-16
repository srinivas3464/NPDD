import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { OfficeserviceService } from '../../services/officeservice.service';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-podistrictpercentagesummary',
  templateUrl: './podistrictpercentagesummary.component.html',
  styleUrls: ['./podistrictpercentagesummary.component.css']
})
export class PodistrictpercentagesummaryComponent implements OnInit {

  POList: any[] = [];  PurchaseList: any[] = [];
  POSummaryList: any[] = [];
  selectedPO: any;
  excelData: any[] = [];
  reportTotal = {
                S_NO: "--",
                DISTRICT_NAME: "Total", 
                INV_QTY : 0,   
                INV_AMOUNT : 0,
                APP_QTY : 0,
                APP_AMOUNT : 0  
                }

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = this.utils.dataTableOptions();
  dtTrigger: Subject<any> = new Subject();



  constructor(private toast: ToasterService,
    private utils: UtilsService,
    private session: SessionService,
    private OfficeModuleAPI: OfficeserviceService,
    private spinner: NgxSpinnerService,
    private router: Router) { }

  ngOnInit(): void {
    if (this.session.uniqueId != "" && this.session.desigId != "") {
      this.PoGet();
  }
  else {
      this.router.navigate(['/shared/UnAuthorized']);
  }
}

async PoGet(): Promise<void> {
  try {
      this.POList = [];
      const obj = {
          "type": "23",
          UNIQUEID: this.session.uniqueId, ROLE: this.session.desigId,
      }
      const res = await this.OfficeModuleAPI.office_po_select(obj);
      this.spinner.show();
      if (res.success) {
          this.POList = [];
          this.spinner.hide();
          this.POList = res.result;
           

      } else {
          this.spinner.hide();
          this.toast.warning(res.message);

      }

  } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);

  }
}




async POIdchange(): Promise<void> {
  try {
      debugger
      const obj = {
          type: "22",
          BUDGET_ID: this.selectedPO
      }
      this.PurchaseList = [];  
      this.spinner.show();debugger;
      const res = await this.OfficeModuleAPI.office_Budget_Select(obj);
      if (res.success) {debugger; 
          this.PurchaseList = []; 
          this.PurchaseList = res.result;  
          this.spinner.hide();
           
           this.Districtinvappqty();
      } else {
          this.spinner.hide();
          this.toast.warning(res.message); 

      }


  }
  catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
  }
}

              


async Districtinvappqty(): Promise<void> {
  try {
      debugger
      const obj = {
          type: "23",
          BUDGET_ID: this.selectedPO
      }
      this.POSummaryList = [];
      this.excelData = [];
      this.reportTotal = {
          S_NO: "--",
          DISTRICT_NAME: "Total",
          INV_QTY : 0,
          INV_AMOUNT : 0,
          APP_QTY : 0,
          APP_AMOUNT : 0  
      }
      this.spinner.show();debugger;
      const res = await this.OfficeModuleAPI.office_Budget_Select(obj);
      if (res.success) {debugger;
          this.excelData = [];
          this.POSummaryList = [];
          this.reportTotal = {
              S_NO: "--",
              DISTRICT_NAME: "Total",
              INV_QTY : 0,
              INV_AMOUNT : 0,
              APP_QTY : 0,
              APP_AMOUNT : 0  

          }
          this.POSummaryList = res.result;
          for (let i = 0; i < this.POSummaryList.length; i++) {

              this.reportTotal.INV_QTY += parseInt(this.POSummaryList[i].INV_QTY);
              this.reportTotal.INV_AMOUNT += parseInt(this.POSummaryList[i].INV_AMOUNT);
              this.reportTotal.APP_QTY += parseInt(this.POSummaryList[i].APP_QTY);
              this.reportTotal.APP_AMOUNT += parseInt(this.POSummaryList[i].APP_AMOUNT);
               
              
              let singleRow = {
                  S_NO: i + 1,
                  DISTRICT_NAME: this.POSummaryList[i].DISTRICTNAME,
                  INV_QTY: this.POSummaryList[i].INV_QTY,
                  INV_AMOUNT: this.POSummaryList[i].INV_AMOUNT,
                  APP_QTY: this.POSummaryList[i].APP_QTY,
                  APP_AMOUNT: this.POSummaryList[i].APP_AMOUNT,
                  
              }
              this.excelData.push(singleRow);
          }
          this.excelData.push(this.reportTotal)
          this.spinner.hide();
          this.rerender();
          
      } else {
          this.spinner.hide();
          this.toast.warning(res.message); 

      }

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
btnExcel(): void {
  debugger;

  this.utils.JSONToCSVConvertor(
      this.excelData,
      'PO District Summary Report',
      true
  );
}

}
 