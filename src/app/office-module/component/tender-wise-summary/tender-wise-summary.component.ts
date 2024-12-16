import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { OfficeserviceService } from '../../services/officeservice.service';

@Component({
  selector: 'app-tender-wise-summary',
  templateUrl: './tender-wise-summary.component.html',
  styleUrls: ['./tender-wise-summary.component.css']
})
export class TenderWiseSummaryComponent implements OnInit {
  
  TenderNoList: any[] = [];
  TenderSummarList: any[] = [];
  TenderNo: any;
  excelData: any[] = [];
  reportTotal = {
      S_NO: "Total",
      TENDER_QUANTITY: 0,
      TENDER_AMOUNT: 0,
      PO_QUANTITY: 0,
      PO_AMOUNT: 0,
      ADV_PER: 0,
      ADV_QUANTITY: 0,
      ADV_PER_AMOUNT: 0,
      DELIVERY_PER: 0,
      DELIVERY_QUANTITY: 0,
      DELIVERY_PER_AMOUNT: 0,
      INSTALL_PER: 0,
      INSTALL_QUANTITY: 0,
      INSTALL_PER_AMOUNT: 0,
      FINAL_PER: 0,
      FINAL_QUANTITY: 0,
      FINAL_PER_AMOUNT: 0

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
      private router: Router
  ) { }

  ngOnInit(): void {
      debugger;

      if (this.session.uniqueId != "" && this.session.desigId != "") {

          this.TenderNoGet()


      }
      else {
          this.router.navigate(['/shared/UnAuthorized']);
      }
  }



  async TenderNoGet(): Promise<void> {
      try {
          this.TenderNoList = [];
          const obj = {
              "type": "26",
          }                             //off_budget_details
          const res = await this.OfficeModuleAPI.office_Budget_Select(obj);
          this.spinner.show();
          if (res.success) {
              this.TenderNoList = [];
              this.spinner.hide();
              this.TenderNoList = res.result;


          } else {
              this.spinner.hide();
              this.toast.warning(res.message);

          }

      } catch (error) {
          this.spinner.hide();
          this.utils.catchResponse(error);

      }
  }

  async TenderNochange(): Promise<void> {
      try {
          debugger
          const obj = {
              type: "27",
              BUDGET_ID: this.TenderNo

          }
          this.TenderSummarList = [];
          this.excelData = [];
          this.reportTotal = {
              S_NO: "Total",
              TENDER_QUANTITY: 0,
              TENDER_AMOUNT: 0,
              PO_QUANTITY: 0,
              PO_AMOUNT: 0,
              ADV_PER: 0,
              ADV_QUANTITY: 0,
              ADV_PER_AMOUNT: 0,
              DELIVERY_PER: 0,
              DELIVERY_QUANTITY: 0,
              DELIVERY_PER_AMOUNT: 0,
              INSTALL_PER: 0,
              INSTALL_QUANTITY: 0,
              INSTALL_PER_AMOUNT: 0,
              FINAL_PER: 0,
              FINAL_QUANTITY: 0,
              FINAL_PER_AMOUNT: 0


          }
          this.spinner.show();              //off_budget_details
          const res = await this.OfficeModuleAPI.office_Budget_Select(obj);
          if (res.success) {
              this.excelData = [];
              this.TenderSummarList = [];
              this.reportTotal = {
                  S_NO: "Total",
                  TENDER_QUANTITY: 0,
                  TENDER_AMOUNT: 0,
                  PO_QUANTITY: 0,
                  PO_AMOUNT: 0,
                  ADV_PER: 0,
                  ADV_QUANTITY: 0,
                  ADV_PER_AMOUNT: 0,
                  DELIVERY_PER: 0,
                  DELIVERY_QUANTITY: 0,
                  DELIVERY_PER_AMOUNT: 0,
                  INSTALL_PER: 0,
                  INSTALL_QUANTITY: 0,
                  INSTALL_PER_AMOUNT: 0,
                  FINAL_PER: 0,
                  FINAL_QUANTITY: 0,
                  FINAL_PER_AMOUNT: 0


              }
              this.TenderSummarList = res.result;
              for (let i = 0; i < this.TenderSummarList.length; i++) {

                  this.reportTotal.TENDER_QUANTITY += parseInt(this.TenderSummarList[i].TENDER_QTY),
                      this.reportTotal.TENDER_AMOUNT += parseInt(this.TenderSummarList[i].TENDER_AMOUNT),
                      this.reportTotal.PO_QUANTITY += parseInt(this.TenderSummarList[i].PO_QTY),
                      this.reportTotal.PO_AMOUNT += parseInt(this.TenderSummarList[i].PO_AMOUNT),
                      this.reportTotal.ADV_PER += parseInt(this.TenderSummarList[i].ADV_PER),
                      this.reportTotal.ADV_QUANTITY += parseInt(this.TenderSummarList[i].ADV_QTY),
                      this.reportTotal.ADV_PER_AMOUNT += parseInt(this.TenderSummarList[i].ADV_PER_AMOUNT),
                      this.reportTotal.DELIVERY_PER += parseInt(this.TenderSummarList[i].DELIVERY_PER),
                      this.reportTotal.DELIVERY_QUANTITY += parseInt(this.TenderSummarList[i].DELIVERY_QTY),
                      this.reportTotal.DELIVERY_PER_AMOUNT += parseInt(this.TenderSummarList[i].DELIVERY_PER_AMOUNT),
                      this.reportTotal.INSTALL_PER += parseInt(this.TenderSummarList[i].INSTALL_PER),
                      this.reportTotal.INSTALL_QUANTITY += parseInt(this.TenderSummarList[i].INSTALL_QTY),
                      this.reportTotal.INSTALL_PER_AMOUNT += parseInt(this.TenderSummarList[i].INSTALL_PER_AMOUNT),
                      this.reportTotal.FINAL_PER += parseInt(this.TenderSummarList[i].FINAL_PER),
                      this.reportTotal.FINAL_QUANTITY += parseInt(this.TenderSummarList[i].FINAL_QTY),
                      this.reportTotal.FINAL_PER_AMOUNT += parseInt(this.TenderSummarList[i].FINAL_PER_AMOUNT)

                  let singleRow = {
                      S_NO: i + 1,
                      TENDER_QUANTITY: this.TenderSummarList[i].TENDER_QTY,
                      TENDER_AMOUNT: this.TenderSummarList[i].TENDER_AMOUNT,
                      PO_QUANTITY: this.TenderSummarList[i].PO_QTY,
                      PO_AMOUNT: this.TenderSummarList[i].PO_AMOUNT,
                      INV_QUANTITY: this.TenderSummarList[i].INV_QTY,
                      INV_AMOUNT: this.TenderSummarList[i].INV_QTY,
                      ADV_PER: this.TenderSummarList[i].ADV_PER,
                      ADV_QUANTITY: this.TenderSummarList[i].ADV_QTY,
                      ADV_PER_AMOUNT: this.TenderSummarList[i].ADV_PER_AMOUNT,
                      DELIVERY_PER: this.TenderSummarList[i].DELIVERY_PER,
                      DELIVERY_QUANTITY: this.TenderSummarList[i].DELIVERY_QTY,
                      DELIVERY_PER_AMOUNT: this.TenderSummarList[i].DELIVERY_PER_AMOUNT,
                      INSTALL_PER: this.TenderSummarList[i].INSTALL_PER,
                      INSTALL_QUANTITY: this.TenderSummarList[i].INSTALL_QTY,
                      INSTALL_PER_AMOUNT: this.TenderSummarList[i].INSTALL_PER_AMOUNT,
                      FINAL_PER: this.TenderSummarList[i].FINAL_PER,
                      FINAL_QUANTITY: this.TenderSummarList[i].FINAL_QTY,
                      FINAL_PER_AMOUNT: this.TenderSummarList[i].FINAL_PER_AMOUNT

                  }
                  this.excelData.push(singleRow);
                  //console.log(this.TenderSummarList);
              }
              this.excelData.push(this.reportTotal)
              this.spinner.hide();
              this.rerender();
          }
          else {
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
          'Tender Wise Summary',
          true
      );
  }
}
