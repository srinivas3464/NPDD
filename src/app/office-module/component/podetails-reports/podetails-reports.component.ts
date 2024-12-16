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
    selector: 'app-podetails-reports',
    templateUrl: './podetails-reports.component.html',
    styleUrls: ['./podetails-reports.component.css']
})
export class PodetailsReportsComponent implements OnInit, OnDestroy, AfterViewInit {
    Podetailslist: []; purchasedetailsList: any[] = [];DistrictdetailsList: any[] = [];
    PMID: any;
    excelData: any[] = []; 
    @ViewChild(DataTableDirective, { static: false })
    dtElement: DataTableDirective;
    dtOptions: DataTables.Settings = this.utils.dataTableOptions();
    dtTrigger: Subject<any> = new Subject();
    pendtTrigger: Subject<any> = new Subject();



 
    reportTotal = {
        S_NO: "--",
        DISTRICTNAME: "Total",
        QUANTITY: 0,
        AMOUNT: 0,
        INVOICE_QUANTITY: 0,
        INVOICE_AMOUNT: 0,
        BALANCE_QUANTITY: 0,
        BALANCE_INVOICE: 0

    }

    
    constructor(private toast: ToasterService, 
        private utils: UtilsService,
        private session: SessionService,
        private OfficeModuleAPI: OfficeserviceService,
        private spinner: NgxSpinnerService, private router: Router
    ) { }

    ngOnInit(): void {
        if (this.session.uniqueId != "" && this.session.desigId != "") {
            this.podetails();
        } else {
            this.router.navigate(['/shared/UnAuthorized']);
        }
    }

    async podetails(): Promise<void> {
        try {
            const req = {
                type: "27",//4
                UNIQUEID: this.session.uniqueId,
                ROLE: this.session.desigId,
                INSERTEDBY: this.session.userName
            }; debugger;
            this.spinner.show();
            const res = await this.OfficeModuleAPI.tenderdetailsSelect(req);
            this.spinner.hide();
            if (res.success) {
                this.Podetailslist = res.result;
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
            this.excelData = [];
            const reqdistrict = {
                type: "5",
                UNIQUEID: this.session.uniqueId,
                ROLE: this.session.desigId,
                INSERTEDBY: this.session.userName,
                id: this.PMID,
            }; this.spinner.show();
            const res = await this.OfficeModuleAPI.tenderdetailsSelect(reqdistrict);
            this.spinner.hide();
            if (res.success) {
                this.excelData = [];
                this.purchasedetailsList = res.result;
                for (var i = 0; i < this.purchasedetailsList.length; i++) {
                    let singleRow =
                    {
                        S_NO: i + 1,
                        FORM_MNAME: this.purchasedetailsList[i].FIRMNAME,
                        COMPONENT_NAME: this.purchasedetailsList[i].COMPNAME,
                        PURCHASE_ORDER_DATE: this.purchasedetailsList[i].PODATE,
                        PURCHASE_ORDER: this.purchasedetailsList[i].PONUMBER,
                        TOTAL_UNITS: this.purchasedetailsList[i].UNITS,
                        TOTAL_RATE: this.purchasedetailsList[i].PRICES, 
                    }
                    this.excelData.push(singleRow); 
                }
                const obj = {            
                    type: "6",     
                    INPUT01: this.PMID
                };  debugger;
                this.DistrictdetailsList = [];this.spinner.show();
                const res1 = await this.OfficeModuleAPI.ApprovalDetails_Select(obj);
                this.spinner.hide();
                if (res1.success) {   
                    this.DistrictdetailsList=res1.result; 
                    for (var j = 0; j < this.DistrictdetailsList.length; j++) { 
                    this.reportTotal.QUANTITY  =parseFloat((parseFloat(this.reportTotal.QUANTITY.toFixed(2)) + parseFloat(this.DistrictdetailsList[j].QUANTITY)).toFixed(2)); //.toFixed(2)
                    this.reportTotal.AMOUNT  = parseFloat((parseFloat(this.reportTotal.AMOUNT .toFixed(2))+ parseFloat(this.DistrictdetailsList[j].AMOUNT)).toFixed(2));
                    this.reportTotal.INVOICE_QUANTITY  =parseFloat((parseFloat(this.reportTotal.INVOICE_QUANTITY.toFixed(2))+parseFloat( this.DistrictdetailsList[j].INVOICE_QUANTITY)).toFixed(2));
                    this.reportTotal.INVOICE_AMOUNT =parseFloat((parseFloat(this.reportTotal.INVOICE_AMOUNT .toFixed(2))+parseFloat(this.DistrictdetailsList[j].INVOICE_AMOUNT)).toFixed(2));
                    this.reportTotal.BALANCE_QUANTITY =parseFloat((parseFloat(this.reportTotal.BALANCE_QUANTITY.toFixed(2)) +parseFloat(this.DistrictdetailsList[j].BALANCE_QUANTITY)).toFixed(2));
                    this.reportTotal.BALANCE_INVOICE =parseFloat((parseFloat(this.reportTotal.BALANCE_INVOICE.toFixed(2)) +parseFloat(this.DistrictdetailsList[j].BALANCE_INVOICE)).toFixed(2));
                          
                       
                    }   

                }
                this.spinner.hide();
                //  this.rerender();
                //this.pono=this.purchasedetailsList[0].PONUMBER;
            } 
            else { this.spinner.hide();
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
            'Purchase Order Details Report',
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
