import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { OfficeserviceService } from '../../services/officeservice.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-financial-budget-amounts',
    templateUrl: './financial-budget-amounts.component.html',
    styleUrls: ['./financial-budget-amounts.component.css']
})
export class FinancialBudgetAmountsComponent implements OnInit {
    ComonentId: any;
    DitsData: any[] = [];
    componentListdata: any[] = [];
   // toggleButton: boolean = false;
    constructor(private toast: ToasterService,
        private utils: UtilsService,
        private session: SessionService,
        private OfficeModuleAPI: OfficeserviceService,
        private router:Router,
        private spinner: NgxSpinnerService) { }

 
    ngOnInit(): void {
      if(this.session.uniqueId !="" && this.session.desigId != ''){
        this.DistGet();
        this.Componentdetails();
      }
      else
      {
        this.router.navigate(['/shared/UnAuthorized']);
      }

        
    }

    async Componentdetails(): Promise<void> {
        try {
            const reqdistrict = {
                type: 9,
            };
            this.spinner.show();
            const res = await this.OfficeModuleAPI.office_po_select(reqdistrict);
            if (res.success) {
                this.spinner.hide();
                this.componentListdata = res.result;

            } else {
                this.spinner.hide();
                this.toast.info(res.message);
            }
            this.spinner.hide();
        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
    }

    async DistGet(): Promise<void> {

        try {
            this.DitsData=[];
            debugger;
            const obj = {
                type: 1,
            }
            //console.log(obj);
            const res = await this.OfficeModuleAPI.office_po_select(obj);
            this.spinner.hide();
            if (res.success) {
                this.DitsData = res.result;
                //console.log(this.DitsData);
                return;
            } else {
                this.toast.warning(res.message);
                return;
            }
        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
    }

    async FinancialBudgetSub(obj:any): Promise<void> {
        try {debugger;
             
            if(this.ComonentId ==="0" ||  this.ComonentId ==="" || this.ComonentId ===undefined)
            {
                this.toast.warning("Select Component");
                return  ;
            }else{
          if(  obj.FirstYear!="" && obj.FirstYear!=undefined ){
            const req1 = {
                type: "5",
                COMPID:this.ComonentId,
                DISTRICTID:obj.DISTRICTID,
                YEAROFSANCTION:14,
                BUDSANCTIONAMT:obj.FirstYear
            };

            this.spinner.show();
            const res1 = await this.OfficeModuleAPI.officeBudgetslipSub(req1);
            this.spinner.hide();
            if (res1.success) { 
            }  
          }
            if( obj.SecondYear!="" && obj.SecondYear!=undefined ){
            const req2 = {
              type: "5",
              COMPID:this.ComonentId,
                DISTRICTID:obj.DISTRICTID,
                YEAROFSANCTION:15,
                BUDSANCTIONAMT:obj.SecondYear
          };

          this.spinner.show();
          const res2 = await this.OfficeModuleAPI.officeBudgetslipSub(req2);
          this.spinner.hide();
          if (res2.success) { 
          }  
        }
if(  obj.ThirdYear!="" && obj.ThirdYear!=undefined ){
          const req3 = {
            type: "5",
            COMPID:this.ComonentId,
            DISTRICTID:obj.DISTRICTID,
            YEAROFSANCTION:16,
            BUDSANCTIONAMT:obj.ThirdYear
        };
        this.spinner.show();
        const res3 = await this.OfficeModuleAPI.officeBudgetslipSub(req3);
        this.spinner.hide();
        if (res3.success) { 

        }  
      }

      

      this.toast.success("Record Inserted");
     
      //  this.toggleButton = true;
    }

        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
    } 


}
