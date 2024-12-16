import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { OfficeserviceService } from '../../services/officeservice.service';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';

@Component({
    selector: 'app-tender-price-report',
    templateUrl: './tender-price-report.component.html',
    styleUrls: ['./tender-price-report.component.css']
})
export class TenderPriceReportComponent implements OnInit, OnDestroy, AfterViewInit {
    typeid: any;
    COMPONENTisChecked: boolean = true;
    SUBCOMPONENTisChecked: boolean = false;
    excelData: any[] = [];
    admbtn:boolean=false;
    componentListdata = []; COMPID: any; checkList = []; SUBCOMPONENT = true; COMPONENT = true;

    cid: any;
    priceList = [];

    minDate: Date;
    maxDate: Date; fromdate = this.session.getTodayDateString();; Todate = this.session.getTodayDateString();;
    fromdate_frm =this.session.getTodayDateString();
    //dtOptions: DataTables.Settings = this.utils.dataTableOptions();  
    // dtTrigger: Subject<any> = new Subject();
    // pendtTrigger: Subject<any> = new Subject();


    @ViewChild(DataTableDirective, { static: false })
    dtElement: DataTableDirective;
    dtOptions: DataTables.Settings = this.utils.dataTableOptions();
    dtTrigger: Subject<any> = new Subject();
    pendtTrigger: Subject<any> = new Subject();


    constructor(private toast: ToasterService,
        private utils: UtilsService,
        private session: SessionService,
        private OfficeModuleAPI: OfficeserviceService,
        private spinner: NgxSpinnerService, private router: Router) { }

    ngOnInit(): void {
        debugger;
        if (this.session.uniqueId != "" && this.session.desigId != "") {
            this.COMPONENT = true; this.typeid = 8;
            if(this.session.desigId ==10|| this.session.desigId ==20){this.admbtn=true;}else {this.admbtn=false;}
            this.Componentdetails();
            this.componentprices();

        } else {
            this.router.navigate(['/shared/UnAuthorized']);
        }

    }

    handleChange1() {
        let element0 = document.getElementById('COMPONENT');
    }

    handleChange(e) {

        if (e.target.checked == true && e.target.value == "SUBCOMPONENT") {
            this.typeid = 14; this.componentChange();
        }

        if (e.target.checked == true && e.target.value == "COMPONENT") {
            this.typeid = 8; this.componentChange();
        }

    }

    async Componentdetails(): Promise<void> {
        try {
            const reqdistrict = {
                type: 9,
                //   DISTRICTID:this.RBKDDSelected,
            }; debugger;
            const res = await this.OfficeModuleAPI.office_po_select(reqdistrict);
            if (res.success) {
                this.componentListdata = res.result;
            } else {
                this.toast.info("No Data Found");
            }
            this.spinner.hide();
        } catch (error) {
            this.spinner.hide();
            // this.utils.catchResponse("No Data Found");
            this.toast.info("No Data Found");
        }
    }

    async componentprices(): Promise<void> {
        try {



            this.priceList = [];
            const req = {
                type: 2,
                ROLE: this.session.desigId,
                FROMDATE: this.session.getTodayDateString(),
                TODATE: this.session.getTodayDateString(),
                FRMDATE: this.session.getTodayDateString(),
                TDATE: this.session.getTodayDateString(),

                ID: this.COMPID
            };

            this.spinner.show();
            const res = await this.OfficeModuleAPI.officeTenderPriceSelect(req);
            this.spinner.hide();
            this.priceList = [];
            if (res.success) {

                this.priceList = res.result; this.cid = this.checkList.length;

            } else {
                this.toast.info("No Data Found");
            }


        } catch (error) {
            this.spinner.hide();
            //this.utils.catchResponse("No Data Found");
            this.toast.info("No Data Found");
        }
    }
  

    async componentChange(): Promise<void> {
        try {

            if (this.utils.isEmpty(this.COMPID)) {
                this.toast.warning('Please select Component');
                return;
            }

            this.checkList = [];
            const req = {
                type: this.typeid,
                ID: this.COMPID
            };

            this.spinner.show();
            const res = await this.OfficeModuleAPI.office_po_select(req);
            this.spinner.hide();
            this.checkList = [];
            if (res.success) {

                this.checkList = res.result; this.cid = this.checkList.length;

            } else {
                this.toast.info("No Data Found");
            }


        } catch (error) {
            this.spinner.hide();
            // this.utils.catchResponse(error);
            this.toast.info("No Data Found");
        }
    }
    
    async TodateDetails(): Promise<void>
     { debugger;
        try {
            if (this.utils.isEmpty(this.fromdate_frm)) {
                this.toast.warning('Please select fromdate');
                return;
            }
            // if (this.utils.isEmpty(this.Todate)) {
            //     this.toast.warning('Please select Todate');
            //     return;
            // }
            debugger;

            // var fromdate = document.getElementById("fromdate");//.value;
            // var todate = document.getElementById("Todate");//.value;

            //if(this.fromdate>this.Todate){this.toast.info("From Date must be Less than To Date");return;}
            this.priceList =[];
            const reqdistrict = {
                type: "9",
                //ROLE:this.session.desigId,
                //   FROMDATE:this.fromdate,
                //   TODATE:this.Todate,
                FRMDATE: this.fromdate_frm,  //fromdate,
                 TDATE: this.fromdate_frm
            };
            this.excelData = [];
            this.spinner.show();
            const res1 = await this.OfficeModuleAPI.officeTenderPriceSelect(reqdistrict);
            this.spinner.hide();debugger;
            if (res1.success) {
                this.excelData = [];
                this.priceList = res1.result;
                for (var i = 0; i < this.priceList.length; i++) {
                    let singleRow =
                    {
                        S_NO: i + 1,
                        COMP_ID: this.priceList[i].COMPID,
                        FINANCIAL_YEAR: this.priceList[i].FINANCIAL_YEAR,
                        TYPE: this.priceList[i].TYPE,
                        TENDER_TYPE: this.priceList[i].TENDER_TYPE,
                        COMPONENT_NAME: this.priceList[i].COMPNAME,
                        DESCRIPTION: this.priceList[i].DESCRIPTION,
                        QTY: this.priceList[i].QTY,
                        PRICE: this.priceList[i].PRICE

                    }
                    this.excelData.push(singleRow);
                }
                this.rerender();
            } else {
                this.toast.info(res1.message);
            }
            this.spinner.hide();
        } catch (error) {
            
        }
    }
    async GODetails(): Promise<void> { 

        try {
            if (this.utils.isEmpty(this.fromdate)) {
                this.toast.warning('Please select fromdate');
                return;
            }
            if (this.utils.isEmpty(this.Todate)) {
                this.toast.warning('Please select Todate');
                return;
            }
            debugger;

            // var fromdate = document.getElementById("fromdate");//.value;
            // var todate = document.getElementById("Todate");//.value;

            //if(this.fromdate>this.Todate){this.toast.info("From Date must be Less than To Date");return;}
            this.priceList =[];
            const reqdistrict = {
                type: "1",
                //ROLE:this.session.desigId,
                //   FROMDATE:this.fromdate,
                //   TODATE:this.Todate,
                FRMDATE: this.fromdate,
                TDATE: this.Todate


            };
            this.excelData = [];
            this.spinner.show();
            const res1 = await this.OfficeModuleAPI.officeTenderPriceSelect(reqdistrict);
            this.spinner.hide();
            if (res1.success) {
                this.excelData = [];
                this.priceList = res1.result;
                for (var i = 0; i < this.priceList.length; i++) {
                    let singleRow =
                    {
                        S_NO: i + 1,
                        COMP_ID: this.priceList[i].COMPID,
                        FINANCIAL_YEAR: this.priceList[i].FINANCIAL_YEAR,
                        TYPE: this.priceList[i].TYPE,
                        TENDER_TYPE: this.priceList[i].TENDER_TYPE,
                        COMPONENT_NAME: this.priceList[i].COMPNAME,
                        DESCRIPTION: this.priceList[i].DESCRIPTION,
                        QTY: this.priceList[i].QTY,
                        PRICE: this.priceList[i].PRICE

                    }
                    this.excelData.push(singleRow);
                }
                this.rerender();
            } else {
                this.toast.info(res1.message);
            }
            this.spinner.hide();
        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }

    }

    btnExcel(): void {


        this.utils.JSONToCSVConvertor(
            this.excelData,
            'Component Price Report',
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
