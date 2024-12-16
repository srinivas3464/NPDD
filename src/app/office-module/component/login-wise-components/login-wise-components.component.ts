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
  selector: 'app-login-wise-components',
  templateUrl: './login-wise-components.component.html',
  styleUrls: ['./login-wise-components.component.css']
})
export class LoginWiseComponentsComponent implements OnInit {

  userlogin:any;compId:any;assstatus:any;
  officelogindetails={
    userlogin:'', 
  }
  id:any;
  recstatus:any;
  replacestr:any;
  strcompid:any;
  strmenuid:any;
  LOGINLIST:any=[];
  COMPONENTLIST:any=[];   updateCOMPONENTLIST:any=[];
  MENULIST:any=[];

  constructor(private spinner: NgxSpinnerService,
    private utils: UtilsService, 
    private router: Router,
    private toast: ToasterService,
    private session: SessionService, 
   // private dairyapp:McuMappingService,
    private OfficeModuleAPI: OfficeserviceService, 
    ) {

    this.userlogin=''; 
   } 

   @ViewChild(DataTableDirective, { static: false })
   dtElement!: DataTableDirective;
 
   dtOptions: DataTables.Settings = this.utils.dataTableOptions();
   dtTrigger: Subject<any> = new Subject();  
  pendtTrigger: Subject<any> = new Subject();
menulistitems:[];
menulist={
  TYPE:'',
  LOGIN_UNIQUE_ID:'',
  MODULE_TYPE:'',
  MENUREPORT_TYPE:'',
  COMP_ID:'',
  SCREEN_STATUS:'',
  MENU_STATUS:'',
  UNIQUEID:'',
  ROLE:'',
  INSERTEDBY:'',
};
  ngOnInit(): void {  
    this.loadlogin();
   // this.loadmenu();
  }

  async loadlogin(): Promise<void> {
    try {      
      const req = {
        TYPE:"1",  
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
  
  
  
  async onloginchange(): Promise<void> {
    try { 
      if(this.validate()){debugger;
          const req = {
             type:"8",  
             LOGIN_UNIQUE_ID:this.officelogindetails.userlogin,
          } 
          this.spinner.show(); //proc off_screen_module
          const response = await this.OfficeModuleAPI.officemenu_select(req);
           
          this.spinner.hide();
          if (response.success) {
            this.COMPONENTLIST = response.result; 
            this.compId = this.COMPONENTLIST[0].COMPID;  
          } else {
            this.toast.info(response.message);
            this.spinner.hide();
          } 
        //  this.rerender(); 
           this.onloginUpdatechange();
        } 
        } catch (error) {
          this.spinner.hide();
          this.utils.catchResponse(error);
        }
  }

  async btnSubmit(): Promise<void> {
    try { debugger;

      if(this.officelogindetails.userlogin==undefined)
      { this.toast.info('Select Userlogin'); return;  } 

 if(this.strcompid!=undefined && this.strmenuid!=undefined)
    {
        // if(this.strcompid.split(',').length==this.strmenuid.split(',').length)
        //     this.toast.info('Length equal');

          // else if(this.strcompid.split(',').length>this.strmenuid.split(',').length)
          //   this.toast.info('Screen status assigned but which menu not mentioned');

          // else if(this.strcompid.split(',').length<this.strmenuid.split(',').length)
          //   this.toast.info('Screen status not assigned but menu mentioned');
     }
else if(this.strcompid==undefined ){
     this.toast.info('Screen status not assigned'); return;}
//  else if(this.strmenuid==undefined ){
//      this.toast.info('menu not assigned');return;}
 
 debugger;

this.menulist.TYPE="7",
this.menulist.LOGIN_UNIQUE_ID=this.officelogindetails.userlogin,  
this.menulist.COMP_ID=this.compId
this.menulist.SCREEN_STATUS=this.strcompid,//.split(',')[i], 
this.menulist.UNIQUEID=this.session.uniqueId,
this.menulist.ROLE=this.session.desigId,
this.menulist.INSERTEDBY=this.session.userName 
 
this.spinner.show();
const res = await this.OfficeModuleAPI.officemenu_Submition(this.menulist); 
this.spinner.hide();  
if (res.success) { 
  this.toast.success("Data Inserted Successfully"); 
  this.onloginchange();
} else { 
    this.toast.info(res.message);
} 
  this.rerender(); 
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
} 

  validate(): boolean {
    if (
      this.officelogindetails.userlogin === '' ||
      this.officelogindetails.userlogin === null ||
      this.officelogindetails.userlogin === undefined
    ) {
      this.toast.warning('Please Select User Login');
      return false;
    } 
    return true;
  } 
  onSelectionChange(x): void { debugger;
       
    var element = <HTMLInputElement> document.getElementById("checkbox_"+x);
 

     if(element.checked ===true )
    { 
      this.strcompid= this.strcompid+','+x ;  
    }
    else
    {
      this.replacestr="";
      const str=this.strcompid.split(',');
      for (let i = 0; i <  str.length; i++) {
             var cid = str[i];  
           
             if (cid == x)  {}else
              this.replacestr=this.replacestr+','+str[i] ; 
            }
            this.strcompid='';
            this.strcompid= this.replacestr.replace(',,','');

    }
    this.strcompid= this.strcompid.replace('undefined,','');
 
     
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
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


  async onloginUpdatechange(): Promise<void> {
    try { 
      if(this.validate()){
          const req = {
             type:"9",  
             LOGIN_UNIQUE_ID:this.officelogindetails.userlogin,
          } 
          this.spinner.show(); //proc off_screen_module
          this.updateCOMPONENTLIST =[];
          const response = await this.OfficeModuleAPI.officemenu_select(req);
           
          this.spinner.hide();
          if (response.success) {
            this.updateCOMPONENTLIST = response.result; 
          //  this.compId = this.updateCOMPONENTLIST[0].COMPID;  
          } else {
            this.toast.info(response.message);
            this.spinner.hide();
          } 
          this.rerender(); 
        } 
        } catch (error) {
          this.spinner.hide();
          this.utils.catchResponse(error);
        }
  }
  

  async onSelectionRemove(cmpid): Promise<void> {
    try { 
      if(this.officelogindetails.userlogin==undefined)
      { this.toast.info('Select Userlogin'); return;  } 

          const req = {
             type:"8",  
             LOGIN_UNIQUE_ID:this.officelogindetails.userlogin,
          } 
         


          
this.menulist.TYPE="8",
this.menulist.LOGIN_UNIQUE_ID=this.officelogindetails.userlogin,  
this.menulist.COMP_ID=cmpid
this.menulist.SCREEN_STATUS=cmpid,//.split(',')[i], 
this.menulist.UNIQUEID=this.session.uniqueId,
this.menulist.ROLE=this.session.desigId,
this.menulist.INSERTEDBY=this.session.userName 
 
this.spinner.show();
const res = await this.OfficeModuleAPI.officemenu_Submition(this.menulist); 
this.spinner.hide();  
if (res.success) { 
  this.toast.success("Screen Removed Successfully"); 
  this.onloginchange();
} else { 
    this.toast.info(res.message);
} 
  this.rerender(); 

         
        } catch (error) {
          this.spinner.hide();
          this.utils.catchResponse(error);
        }
  }
}