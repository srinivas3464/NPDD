import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { OfficeserviceService } from '../../services/officeservice.service';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-screenmenu-update',
  templateUrl: './screenmenu-update.component.html',
  styleUrls: ['./screenmenu-update.component.css']
})
export class ScreenmenuUpdateComponent implements OnInit {
  strcompid:any;strmenuid:any;
  proceedingList:[];
  LOGINLIST:any=[];
  officelogindetails={
    userlogin:'',
    moduletype:'',
    menu:'',
  }
  
  COMPONENTLIST:[];
  menulist={
    TYPE:'',
    LOGIN_UNIQUE_ID:'',
    MODULE_TYPE:'',
    MENUREPORT_TYPE:'',
    SCREEN_ID:'',
    SCREEN_STATUS:'',
    MENU_STATUS:'',
    UNIQUEID:'',
    ROLE:'',
    INSERTEDBY:'',
  };

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
    private OfficeModuleAPI: OfficeserviceService, ) { }

  ngOnInit(): void {
    this.loadlogin();
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

  
async Deletepacket(DPRCID): Promise<void> {
  try { 
    if(this.officelogindetails.userlogin==undefined)
    { this.toast.info('Select Userlogin'); return;  }
    // if(this.officelogindetails.moduletype==undefined)
    // { this.toast.info('Select Module type'); return;  }

   // this.toast.info( this.strcompid);
   // this.toast.info( this.strmenuid);
// if(this.strcompid!=undefined && this.strmenuid!=undefined)
//   {
//       if(this.strcompid.split(',').length==this.strmenuid.split(',').length)
//           this.toast.info('Length equal');

//         else if(this.strcompid.split(',').length>this.strmenuid.split(',').length)
//           this.toast.info('Screen status assigned but which menu not mentioned');

//         else if(this.strcompid.split(',').length<this.strmenuid.split(',').length)
//           this.toast.info('Screen status not assigned but menu mentioned');
//    }
// else if(this.strcompid==undefined ){
//    this.toast.info('Screen status not assigned'); return;}
// else if(this.strmenuid==undefined ){
//    this.toast.info('menu not assigned');return;}



 this.menulist.TYPE="6",//"1"
this.menulist.LOGIN_UNIQUE_ID=this.officelogindetails.userlogin,
this.menulist.MODULE_TYPE='1',
this.menulist.MENUREPORT_TYPE='1',
this.menulist.SCREEN_ID=DPRCID,
this.menulist.SCREEN_STATUS=DPRCID,
this.menulist.MENU_STATUS='0',
this.menulist.UNIQUEID=this.session.uniqueId,
this.menulist.ROLE=this.session.desigId,
this.menulist.INSERTEDBY=this.session.userName 

debugger;
this.spinner.show();
const res = await this.OfficeModuleAPI.officemenu_Submition(this.menulist); 
this.spinner.hide();  
if (res.success) { 
  this.toast.info("Record Deactive Successfully");
this.rerender();
}
  else {
    this.toast.info("Record NOT Modified");
  }


 
}
catch (error) {
this.spinner.hide();
this.utils.catchResponse(error);
}

}



}
