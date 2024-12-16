// import { Component, OnInit, ViewChild } from '@angular/core';
// import { Router } from '@angular/router';
// import { NgxSpinnerService } from 'ngx-spinner';
// import { SessionService } from 'src/app/shared/services/session.service';
// import { ToasterService } from 'src/app/shared/services/toaster.service';
// import { UtilsService } from 'src/app/shared/services/utils.service';
// import { OfficeserviceService } from '../../services/officeservice.service';
// import { DataTableDirective } from 'angular-datatables';
// import { Subject } from 'rxjs';

import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { DataTableDirective } from "angular-datatables";
import { NgxSpinnerService } from "ngx-spinner";
import { Subject } from "rxjs"; 
import { OfficeserviceService } from "src/app/office-module/services/officeservice.service";
import { SessionService } from "src/app/shared/services/session.service";
import { ToasterService } from "src/app/shared/services/toaster.service";
import { UtilsService } from "src/app/shared/services/utils.service"; 

@Component({
    selector: 'app-component-master-report',
    templateUrl: './component-master-report.component.html',
    styleUrls: ['./component-master-report.component.css']
})
export class ComponentMasterReportComponent implements OnInit, OnDestroy, AfterViewInit  {

    clickone: boolean = false; 
    id: number;
    componentList: any[] = []; 
    excelData: any[] = [];


    
    // @ViewChild(DataTableDirective, { static: false })
    // dtElement: DataTableDirective;

    // dtOptions: DataTables.Settings = this.utils.dataTableOptions();
    // dtTrigger: Subject<any> = new Subject();


    @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective; 
  dtOptions: DataTables.Settings = this.utils.dataTableOptions();
  dtTrigger: Subject<any> = new Subject(); 
    pendtTrigger: Subject<any> = new Subject();

    constructor(
        private toast: ToasterService,
        private utils: UtilsService,
        private session: SessionService,
        private spinner: NgxSpinnerService,
        private router: Router,
        private OfficeModuleAPI: OfficeserviceService,) { }

    ngOnInit(): void {
        if (this.session.uniqueId != "" && this.session.desigId != "") {

        }
    }

    async ComponentClick(id): Promise<void> {
        if (id === "1") {
            this.clickone = true;
            this.id = 1;

            this.Componentdetails(35);
        }
        else if (id === "2") {
            this.clickone = true;
            this.id = 2;
            this.Componentdetails(36);
        }
    }

    async Componentdetails(obj): Promise<void> {
        try {
            const reqdistrict = {
                type: obj,
                //   DISTRICTID:this.RBKDDSelected,
            }  
            this.excelData = [];
            const res = await this.OfficeModuleAPI.office_po_select(reqdistrict);
            if (res.success) {
                this.excelData = [];
                this.componentList = res.result;


                //excel binding

                for (var i = 0; i < this.componentList.length; i++) {


                    if (this.id == 1) {
                        let SingleRowone = {
                            S_NO: i + 1,
                            COMPONENT_ID: this.componentList[i].COMPID,
                            COMPONENT_CODE: this.componentList[i].COMPCODE,
                            COMPONENT_NAME: this.componentList[i].COMPNAME,
                            DESCRIPTION: this.componentList[i].DESCRIPTION,
                        }
                        this.excelData.push(SingleRowone);
                    }
                    else {
                        let SingleRowTwo = {
                            S_NO: i + 1,
                            COMPONENT_NAME: this.componentList[i].COMPNAME,
                            SUB_COMPONENT_ID: this.componentList[i].PARTID,
                            SUB_COMPONENT_NAME: this.componentList[i].PARTNAMES,
                            DESCRIPTION: this.componentList[i].PARTDESC,
                        }
                        this.excelData.push(SingleRowTwo);
                    }
                }


              
              //  console.log(this.componentList);
             //  this.rerender();
            } else { this.excelData = [];
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
        if (this.id == 1) {
            this.utils.JSONToCSVConvertor(
                this.excelData,
                'Components',
                true
            );
        }

        else {
            this.utils.JSONToCSVConvertor(
                this.excelData,
                'Sub Components',
                true
            );
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
