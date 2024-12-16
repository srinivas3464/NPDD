import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { OfficeserviceService } from '../../services/officeservice.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-tender-details-today-report',
    templateUrl: './tender-details-today-report.component.html',
    styleUrls: ['./tender-details-today-report.component.css']
})
export class TenderDetailsTodayReportComponent implements OnInit {

    checkList = [];
    excelData: any = [] = [];
    dtOptions: DataTables.Settings = this.utils.dataTableOptions();
    dtTrigger: Subject<any> = new Subject();
    pendtTrigger: Subject<any> = new Subject();
    constructor(private toast: ToasterService,
        private utils: UtilsService,
        private session: SessionService,
        private OfficeModuleAPI: OfficeserviceService,
        private spinner: NgxSpinnerService, private router: Router) { }

    ngOnInit(): void {
        if (this.session.uniqueId != "" && this.session.desigId != "") {
            this.Todaytenderdetails();
        } else {
            this.router.navigate(['/shared/UnAuthorized']);
        }
    }



    async Todaytenderdetails(): Promise<void> {
        try {
            this.checkList = [];
            this.excelData = []; 
            const req = {
                type: "3"
            };

            this.spinner.show();
            const res = await this.OfficeModuleAPI.tenderdetailsSelect(req);
            this.spinner.hide();
            this.checkList = [];
            if (res.success) {
                this.excelData = [];
                this.checkList = res.result;
                for (var i = 0; i < this.checkList.length; i++) {
                    let singleRow =
                    {
                        S_NO: i + 1,
                        COMPONENT_ID: this.checkList[i].COMPID,
                        COMPONENT_NAME: this.checkList[i].COMPNAME,
                        DESCRIPTION: this.checkList[i].DESCRIPTION,
                        QUANTITY: this.checkList[i].QTY,
                        PRICE: this.checkList[i].PRICE,
                    }
                    this.excelData.push(singleRow);
                }
            } else {
                this.toast.info("Details Not Found");
            }


        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse("Details Not Found");
        }
    }

    btnExcel(): void {
        debugger;
        this.utils.JSONToCSVConvertor(
            this.excelData,
            'Today Tender Details',
            true
        );
    }

}
