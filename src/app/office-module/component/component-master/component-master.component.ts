import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { OfficeserviceService } from '../../services/officeservice.service';

@Component({
    selector: 'app-component-master',
    templateUrl: './component-master.component.html',
    styleUrls: ['./component-master.component.css']
})
export class ComponentMasterComponent implements OnInit {
  COMPID:any;
    clickone: boolean = false;
    clickTwo: boolean = false;
    Description: any;
    ComponentName: any;
    ComponentCode: any;
    SubComponentCode: any;
    SubComponentName: any;
    SubDescription: any;
    Components: any;
    componentListdata=[]; 
    constructor(
        private toast: ToasterService,
        private utils: UtilsService,
        private session: SessionService,
        private spinner: NgxSpinnerService,
        private router: Router,
        private OfficeModuleAPI: OfficeserviceService,) { }

    ngOnInit(): void {
        if (this.session.uniqueId != "" && this.session.desigId != "") {
          this.Componentdetails();
        }
        else
  {
    this.router.navigate(['/shared/UnAuthorized']);
  }
    }
    async ComponentClick(id): Promise<void> {
        if (id === "1") {
            this.clickone = true;
            this.clickTwo = false;
        }
        else if (id === "2") {
            this.clickone = false;
            this.clickTwo = true;
            this.Componentdetails();
        }
    }

    async ComponentsSubmit(): Promise<void> {
        try {
            debugger;
            if (this.utils.DataValidationNullorEmptyorUndefined(this.ComponentCode)) {
                this.toast.info("Please Enter Component Code");
                return;
            }
            if (this.utils.DataValidationNullorEmptyorUndefined(this.ComponentName)) {
                this.toast.info("Please Enter Component Name");
                return;
            }
            if (this.utils.DataValidationNullorEmptyorUndefined(this.Description)) {
                this.toast.info("Please Enter Description");
                return;
            }
            else {debugger;
                const obj = {
                    type: "3",
                    INPUT_01: this.ComponentCode,
                    INPUT_02: this.ComponentName,
                    INPUT_03: this.Description,
                    UNIQUEID: this.session.uniqueId,
                    ROLE: this.session.desigId,
                    INSERTEDBY: this.session.userName,
                }
                this.spinner.show();
                const res = await this.OfficeModuleAPI.office_Budget_Sub(obj)
                if (res.success) {
                    this.spinner.hide();
                    this.toast.success("Component Submitted Successfully");
                    this.clearMethod();
                    return;
                }
                else {
                    this.spinner.hide();
                    this.toast.warning(res.message);
                    return;
                }


            }

        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
            return;
        }

    }

    async SubComponentsSubmit(): Promise<void> {
        try {
            debugger;
            if (this.utils.DataValidationNullorEmptyorUndefined(this.COMPID)) {
                this.toast.info("Please Select Components Code");
                return;
            }
            // if (this.utils.DataValidationNullorEmptyorUndefined(this.SubComponentCode)) {
            //     this.toast.info("Please Enter Component Code");
            //     return;
            // }
            if (this.utils.DataValidationNullorEmptyorUndefined(this.SubComponentName)) {
                this.toast.info("Please Enter Sub Component Name");
                return;
            }
            if (this.utils.DataValidationNullorEmptyorUndefined(this.SubDescription)) {
                this.toast.info("Please Enter Description");
                return;
            }
            else {
                const obj = {
                    type: "4",
                    COMPONENT_ID: this.COMPID,
                    INPUT_01: this.SubComponentName,
                    INPUT_02: this.SubDescription,
                    UNIQUEID: this.session.uniqueId,
                    ROLE: this.session.desigId,
                    INSERTEDBY: this.session.userName,
                }
                this.spinner.show();
                const res = await this.OfficeModuleAPI.office_Budget_Sub(obj)
                if (res.success) {
                    this.spinner.hide();
                    this.toast.success("Sub Component Submitted Successfully");
                    this.clearMethod();
                    return;
                }
                else {
                    this.spinner.hide();
                    this.toast.warning(res.message);
                    return;
                }
            }
        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
            return;
        }
    }
    clearMethod() {
        this.SubComponentCode = ''
        this.SubComponentName = ''
        this.SubDescription = ''
        this.Components = ''
        this.ComponentCode = ''
        this.ComponentName = ''
        this.Description = ''
    }

    async Componentdetails(): Promise<void> {  
      try {           
        const reqdistrict={
          type:9, 
        } ; 
        this.spinner.show();
        const res = await this.OfficeModuleAPI.office_po_select(reqdistrict); 
        if (res.success) { 
          this.spinner.hide();
          this.componentListdata = res.result; 
          this.COMPID=undefined;
        } else { this.spinner.hide();
          this.toast.info(res.message);
        }
        this.spinner.hide();
      } catch (error) {
        this.spinner.hide();
        this.utils.catchResponse(error);
      }
    }

    
  
}

 