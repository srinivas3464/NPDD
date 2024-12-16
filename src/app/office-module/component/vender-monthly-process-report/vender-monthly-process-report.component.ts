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
    selector: 'app-vender-monthly-process-report',
    templateUrl: './vender-monthly-process-report.component.html',
    styleUrls: ['./vender-monthly-process-report.component.css']
})
export class VenderMonthlyProcessReportComponent implements OnInit {  
    MonthlyDate: any;COMPONENTNAME:any;
    drid: any;
    DataList: any[] = [];
    displayedColumns: string[] = [];
    excelData: any[] = [];

    dropdownList: any[] = [
        { id: 1, name: "Financial" },
        { id: 2, name: "Price" }, 
     //   { id: 3, name: "Process" },
        { id: 4, name: "Tender" },
        { id: 5, name: "Particpants" },
        { id: 6, name: "Commercial" },
        { id: 7, name: "Reverse Action" },
        { id: 8, name: "Tender Sancation" },
        { id: 9, name: "Emd Refund" },
        { id: 10, name: "LOA Details" },
        { id: 11, name: "Purchase Details Master" },
        { id: 12, name: "Po District Details" }
    ];

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
            this.MonthlyDate = this.session.getTodayDateString();
        }
        else {
            this.router.navigate(['/shared/UnAuthorized']);
        }
    }





    async btnLoadReport(): Promise<void> {
        try {
            if (this.utils.DataValidationNullorEmptyorUndefined(this.MonthlyDate)) {
                this.toast.warning('Please Select Monthly Date ');
                return;
            }
            if (this.utils.DataValidationNullorEmptyorUndefined(this.drid)) {
                this.toast.warning('Please Select Vender Position Status ');
                return;
            }
            else {
                debugger
                const obj = {
                    type: "28",
                    TENDERDATE: this.MonthlyDate,
                    id: this.drid
                }
                this.DataList = []; 
                this.excelData = [];
                this.spinner.show();
                const res = await this.OfficeModuleAPI.tenderdetailsSelect(obj);   
                if (res.success) { debugger;
                    this.excelData = [];
                    this.DataList = [];  
                    this.DataList = res.result;  
                    this.displayedColumns = Object.keys(this.DataList[0]);

                    this.COMPONENTNAME="(17)-SOFTWARE CONSULTANCY & DATA BASE ADMINISTRATION";// res.result[1].COMPNAME;
                    console.log(this.displayedColumns);

                    // for (let obj of this.displayedColumns) { 

                    //     for (let obj1 of this.DataList) {
                    //         let singleRow = {
                    //             obj: obj[obj1]
                    //         }

                    //         this.excelData.push(singleRow);
                    //     }

                    // }

                    this.spinner.hide();
                    this.rerender();
                } else {
                    this.spinner.hide();
                    this.toast.warning(res.message);    
                }
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
            'Vender Monthly Process Report',
            true
        );
    }
}
