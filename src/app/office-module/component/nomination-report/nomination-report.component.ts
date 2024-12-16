import {  Component, OnInit, OnDestroy, AfterViewInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { OfficeserviceService } from '../../services/officeservice.service';

@Component({
    selector: 'app-nomination-report',
    templateUrl: './nomination-report.component.html',
    styleUrls: ['./nomination-report.component.css']
})
export class NominationReportComponent implements  OnInit, OnDestroy, AfterViewInit  {

    @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective; 
  dtOptions: DataTables.Settings = this.utils.dataTableOptions();
  dtTrigger: Subject<any> = new Subject(); 
    pendtTrigger: Subject<any> = new Subject();
    excelData: any[] = [];
    DataList: any[] = [];
    constructor(private spinner: NgxSpinnerService,  
        private utils: UtilsService,
        private router: Router,
        private toast: ToasterService,
        private session: SessionService,
        private OfficeModuleAPI: OfficeserviceService,
    ) {

    }


    ngOnInit(): void {
        if (this.session.uniqueId != "" && this.session.desigId != "") {
            this.LoadReport();
        }
        else {
            this.router.navigate(['/shared/UnAuthorized']);
        }
    }

    async LoadReport(): Promise<void> {
        try {
            debugger;
            this.DataList = [];
            const obj = {
                type: "14",
            }
            this.spinner.show();
            const res = await this.OfficeModuleAPI.office_Budget_Select(obj)
            if (res.success) {
                this.spinner.hide();
                this.DataList = res.result;
                //console.log(this.DataList);
                this.rerender();

                for (var i = 0; i < res.result.length; i++) {


                    
                    let SingleRowone = {
                        S_NO: i + 1,
                        FINANCIAL_YEAR: res.result[i].FINANCIAL_YEAR,
                        TYPE: res.result[i].TYPE,
                        TYPE_OTHER_DESCRIPTION: res.result[i].TYPE_OTHER_DESCRIPTION,
                        CATEGORY: res.result[i].CATEGORY,

                        NATURE_OF_INSTITUTION: res.result[i].NATURE_OF_INSTITUTION,
                        DESCRIPTION: res.result[i].DESCRIPTION,
                        APPROVAL_RATING: res.result[i].APPROVAL_RATING,
                        APPROVAL_STATUS: res.result[i].APPROVAL_STATUS,
                         
                    }
                    this.excelData.push(SingleRowone);
                
                
            }



                return;
            }
            else {
                this.spinner.hide();
                this.toast.info(res.message);
                return;

            }

        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
            return;

        }

    }
    btnExcel(): void {
        debugger;
        
            this.utils.JSONToCSVConvertor(
                this.excelData,
                'NOMINEE DETAILS',
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
