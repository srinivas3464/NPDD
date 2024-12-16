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
  selector: 'app-officemenumodule',
  templateUrl: './officemenumodule.component.html',
  styleUrls: ['./officemenumodule.component.css']
})
export class OfficemenumoduleComponent implements OnInit {
  userlogin:any;moduletype:any;menu:any;assstatus:any;
  officelogindetails={
    userlogin:'',
    moduletype:'',
    menu:'',
  }
  id:any;
  recstatus:any;
  replacestr:any;
  strcompid:any;
  strmenuid:any;
  LOGINLIST:any=[];
  COMPONENTLIST:any=[];
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
    this.moduletype='';
    this.menu='';
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
  SCREEN_ID:'',
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
       // this.LOGINLIST="undefined";
      } else {
        this.toast.info(response.message);
        this.spinner.hide();
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
 
  } 
  async loadmenu(): Promise<void> {
    try {      
      const req = {
        type:"3", 
      }
      this.spinner.show();
      const response = await this.OfficeModuleAPI.officemenu_select(req);
       
      this.spinner.hide();
      if (response.success) {
        this.MENULIST = response.result;
      } else {
        this.toast.info(response.message);
        this.spinner.hide();
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
      if(this.officelogindetails.moduletype==undefined)
      { this.toast.info('Select Module type'); return;  }

     // this.toast.info( this.strcompid);
     // this.toast.info( this.strmenuid);
 if(this.strcompid!=undefined && this.strmenuid!=undefined)
    {
        if(this.strcompid.split(',').length==this.strmenuid.split(',').length)
            this.toast.info('Length equal');

          else if(this.strcompid.split(',').length>this.strmenuid.split(',').length)
            this.toast.info('Screen status assigned but which menu not mentioned');

          else if(this.strcompid.split(',').length<this.strmenuid.split(',').length)
            this.toast.info('Screen status not assigned but menu mentioned');
     }
else if(this.strcompid==undefined ){
     this.toast.info('Screen status not assigned'); return;}
 else if(this.strmenuid==undefined ){
     this.toast.info('menu not assigned');return;}
 
 debugger;

this.menulist.TYPE="1",
this.menulist.LOGIN_UNIQUE_ID=this.officelogindetails.userlogin,
this.menulist.MODULE_TYPE=this.officelogindetails.moduletype,
this.menulist.MENUREPORT_TYPE='1',
this.menulist.SCREEN_ID="1",
this.menulist.SCREEN_STATUS=this.strcompid,//.split(',')[i],
this.menulist.MENU_STATUS=this.strmenuid,//this.id,
this.menulist.UNIQUEID=this.session.uniqueId,
this.menulist.ROLE=this.session.desigId,
this.menulist.INSERTEDBY=this.session.userName 
 
 
this.spinner.show();
const res = await this.OfficeModuleAPI.officemenu_Submition(this.menulist); 
this.spinner.hide();  
 if (res.success) { 
  this.toast.info(res.message); 
  this.rerender();
 } 

    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
}


  async btnfind(): Promise<void> {
    try { 
      this.loadmenu();
      
      if (this.validate()){
          const req = {
             type:"2",  
             LOGIN_UNIQUE_ID:this.officelogindetails.userlogin
          } 
          this.spinner.show();
          const response = await this.OfficeModuleAPI.officemenu_select(req);
           
          this.spinner.hide();
          if (response.success) {
            this.COMPONENTLIST = response.result;
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


  validate(): boolean {
    if (
      this.officelogindetails.userlogin === '' ||
      this.officelogindetails.userlogin === null ||
      this.officelogindetails.userlogin === undefined
    ) {
      this.toast.warning('Please Select User Login');
      return false;
    }

    if (
      this.officelogindetails.moduletype === '' ||
      this.officelogindetails.moduletype === null ||
      this.officelogindetails.moduletype === undefined
    ) {
      this.toast.warning('Please Select Module Type');
      return false;
    } 

    return true;
  }

  onmenuchange(x): void {
       
    var element = <HTMLInputElement> document.getElementById("menu_"+x);
 

     if(element.value !="" )
    { 
      if(this.strmenuid!=undefined ){
      this.replacestr="";this.recstatus=0;
      const str=this.strmenuid.split(',');
      for (let i = 0; i <  str.length; i++) {
             var cid = str[i].split('_')[0];  
           
             if (cid == x)  {
this.recstatus=1;
               this.replacestr=this.replacestr+','+x+'_'+element.value; 
             }
              else
              this.replacestr=this.replacestr+','+str[i] ; 
            }
            if(this.recstatus==0)
            this.strmenuid= this.strmenuid+','+x +'_'+element.value ;

          }
          else
      this.strmenuid= this.strmenuid+','+x +'_'+element.value ;
    }
    // else
    // {
    //   this.replacestr="";
    //   const str=this.strmenuid.split(',');
    //   for (let i = 0; i <  str.length; i++) {
    //          var cid = str[i];  
           
    //          if (cid == x)  {}else
    //           this.replacestr=this.replacestr+','+str[i] ; 
    //         }
    //         this.strmenuid='';
    //         this.strmenuid=this.replacestr.replace(',,','');

    // }
    this.strmenuid=this.strmenuid.replace('undefined,','');
 
     
  }

  onSelectionChange(x): void {
       
    var element = <HTMLInputElement> document.getElementById("checkbox_"+x);
 

     if(element.checked ===true )
    { 
      this.strcompid= this.strcompid+','+x ; 

     // this.strcompid= this.strcompid.replace('undefined,','');
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

}