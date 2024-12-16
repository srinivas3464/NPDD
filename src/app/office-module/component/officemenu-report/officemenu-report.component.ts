import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { OfficeserviceService } from '../../services/officeservice.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-officemenu-report',
  templateUrl: './officemenu-report.component.html', 
  styleUrls: ['./officemenu-report.component.css']
})
export class OfficemenuReportComponent implements OnInit {
  LOGINLIST:any=[];
  officelogindetails={
    userlogin:'',
    moduletype:'',
    menu:'',
  }
  menulist:[];
  COMPONENTLIST:[];
  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;

  dtOptions: DataTables.Settings = this.utils.dataTableOptions();
  dtTrigger: Subject<any> = new Subject();  
 pendtTrigger: Subject<any> = new Subject();
  constructor(private spinner: NgxSpinnerService,
    private utils: UtilsService, 
    private router: Router,
    private toast: ToasterService,
    private session: SessionService, 
   // private dairyapp:McuMappingService,
    private OfficeModuleAPI: OfficeserviceService  ) { }

    ngOnInit(): void {
    if(this.session.uniqueId !="" && this.session.desigId != ""){
      this.loadlogin();
      } else {
    this.router.navigate(['/shared/UnAuthorized']);
      }
    
  }
  async loadlogin(): Promise<void> {
    try {      
      const req = {
        TYPE:"4",  
      }
      this.spinner.show();
      const response = await this.OfficeModuleAPI.officemenu_select(req);
       
      this.spinner.hide();
      if (response.success) {
        this.LOGINLIST = response.result;
      } else {
        this.toast.info(response.message);
        this.spinner.hide();
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
 
  } 



  async btnFind(): Promise<void> {
    try { 

        // if(this.officelogindetails.userlogin==undefined)
        // { this.toast.info('Select Userlogin'); return;  } 
const req={
   TYPE:"3",
   LOGIN_UNIQUE_ID:this.officelogindetails.userlogin,
 MODULE_TYPE:'0'  ,
 MENUREPORT_TYPE:'1',
 SCREEN_ID:"1",
 SCREEN_STATUS:'0',
 MENU_STATUS:'0_0',
 UNIQUEID:this.session.uniqueId,
 ROLE:this.session.desigId,
 INSERTEDBY:this.session.userName 
} 
this.COMPONENTLIST=[];
this.spinner.show();
const res = await this.OfficeModuleAPI.officemenu_Submition(req); 
this.spinner.hide();  
 if (res.success) { 
  this.COMPONENTLIST=res.result; 
 // this.rerender();
 } 

    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
}
rerender(): void {
  this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
    dtInstance.clear().draw(); // Add this  line to clear all rows..
    // Destroy the table first
    dtInstance.destroy();
    // Call the dtTrigger to rerender again
    this.dtTrigger.next();
  });
} 
}
