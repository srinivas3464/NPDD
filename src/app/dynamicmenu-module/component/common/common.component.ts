import { Component, OnInit } from '@angular/core'; 
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginService } from 'src/app/login/services/login.service';
import { OfficeserviceService } from 'src/app/office-module/services/officeservice.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UserManualsService } from 'src/app/shared/services/user-manuals.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-common',
  templateUrl: './common.component.html',
  styleUrls: ['./common.component.css']
})
export class CommonComponent implements OnInit {
  userName:any;
  lastLoginTime: any;
  menu1list:[];menu2list:[];menu3list:[];menu4list:[];
  Report1list:[];Report2list:[];Report3list:[];Report4list:[];
  constructor(private spinner: NgxSpinnerService,
    private utils: UtilsService, 
    private router: Router,
    private toast: ToasterService,
    private session: SessionService,     
    private loginAPI: LoginService,
    private OfficeModuleAPI: OfficeserviceService,) { }

  ngOnInit(): void { 
    this.lastLoginTime=this.session.lastLoginTime; 
    this.userName=this.session.userName;  
        if(this.session.uniqueId !="" && this.session.desigId != "")
        {
         
          this.menufind('1','1_1');
          this.Findmenu2('2','2_2');
          this.Findmenu2('3','3_3');
          this.Reportsmenu('4','4_4');
          this.Reports2menu('5','5_5');
          this.Reports2menu('6','6_6');
        }
      else
      {
        this.router.navigate(['/shared/UnAuthorized']);
      }
  }


  async menufind(  screenid,  menuid) {
    try { 

       
        // if(this.officelogindetails.userlogin==undefined)
        // { this.toast.info('Select Userlogin'); return;  } 
const req={
   TYPE:"4",
   LOGIN_UNIQUE_ID: this.session.uniqueId,
 MODULE_TYPE:'0'  ,
 MENUREPORT_TYPE:'1',
 SCREEN_ID:"1",
 SCREEN_STATUS:screenid,
 MENU_STATUS:menuid,
 UNIQUEID:this.session.uniqueId,
 ROLE:this.session.desigId,
 INSERTEDBY:this.session.userName 
} 
  
this.spinner.show();
const res = await this.OfficeModuleAPI.officemenu_Submition(req); 
this.spinner.hide();  
 if (res.success) { 
  if(screenid=='1') { this.menu1list=[]; this.menu1list=res.result; }
  else if(screenid=='2') { this.menu2list=[]; this.menu2list=res.result; }
  else if(screenid=='3')  { this.menu3list=[];this.menu3list=res.result; }
  else if(screenid=='4')  { this.menu4list=[];this.menu4list=res.result; }
  else if(screenid=='5')  { this.Report1list=[];this.Report1list=res.result; }  
  else if(screenid=='6')  { this.Report2list=[];this.Report2list=res.result; }  
   
 } 
 else{
  if(screenid=='1') { this.menu1list=[]; }
  else if(screenid=='2') { this.menu2list=[]; }
  else if(screenid=='3')  { this.menu3list=[]; }
  else if(screenid=='4')  { this.menu4list=[]; }
  else if(screenid=='5')  { this.Report1list=[];}  
  else if(screenid=='6')  { this.Report2list=[];}  
 }

    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
}

async Findmenu2(  screenid,  menuid) {
  try { 

     
      // if(this.officelogindetails.userlogin==undefined)
      // { this.toast.info('Select Userlogin'); return;  } 
const req={
 TYPE:"4",
 LOGIN_UNIQUE_ID: this.session.uniqueId,
MODULE_TYPE:'0'  ,
MENUREPORT_TYPE:'1',
SCREEN_ID:"1",
SCREEN_STATUS:screenid,
MENU_STATUS:menuid,
UNIQUEID:this.session.uniqueId,
ROLE:this.session.desigId,
INSERTEDBY:this.session.userName 
} 

this.spinner.show();
const res = await this.OfficeModuleAPI.officemenu_Submition(req); 
this.spinner.hide();  
if (res.success) { 
 if(screenid=='2') { this.menu2list=[]; this.menu2list=res.result; }
else if(screenid=='3')  { this.menu3list=[];this.menu3list=res.result; }
 
 
} 
else{
  if(screenid=='2') { this.menu2list=[]; }
else if(screenid=='3')  { this.menu3list=[]; }
 
}

  } catch (error) {
    this.spinner.hide();
    this.utils.catchResponse(error);
  }
}

async Reportsmenu(  screenid,  menuid) {
  try {  
const req={
 TYPE:"4",
 LOGIN_UNIQUE_ID: this.session.uniqueId,
MODULE_TYPE:'0'  ,
MENUREPORT_TYPE:'1',
SCREEN_ID:"1",
SCREEN_STATUS:screenid,
MENU_STATUS:menuid,
UNIQUEID:this.session.uniqueId,
ROLE:this.session.desigId,
INSERTEDBY:this.session.userName 
} 

this.spinner.show();
const res = await this.OfficeModuleAPI.officemenu_Submition(req); 
this.spinner.hide();  
if (res.success) { 
 if(screenid=='4')  { this.menu4list=[];this.menu4list=res.result; }
else if(screenid=='5')  { this.Report1list=[];this.Report1list=res.result; }  
else if(screenid=='6')  { this.Report2list=[];this.Report2list=res.result; }  
 
} 
else{ 
if(screenid=='4')  { this.menu4list=[]; }
else if(screenid=='5')  { this.Report1list=[];}  
else if(screenid=='6')  { this.Report2list=[];}  
}

  } catch (error) {
    this.spinner.hide();
    this.utils.catchResponse(error);
  }
}

async Reports2menu(  screenid,  menuid) {
  try {  
const req={
 TYPE:"4",
 LOGIN_UNIQUE_ID: this.session.uniqueId,
MODULE_TYPE:'0'  ,
MENUREPORT_TYPE:'1',
SCREEN_ID:"1",
SCREEN_STATUS:screenid,
MENU_STATUS:menuid,
UNIQUEID:this.session.uniqueId,
ROLE:this.session.desigId,
INSERTEDBY:this.session.userName 
} 

this.spinner.show();
const res = await this.OfficeModuleAPI.officemenu_Submition(req); 
this.spinner.hide();  
if (res.success) { 
  if(screenid=='5')  { this.Report1list=[];this.Report1list=res.result; }  
else if(screenid=='6')  { this.Report2list=[];this.Report2list=res.result; }  
 
} 
else{ 
   if(screenid=='5')  { this.Report1list=[];}  
else if(screenid=='6')  { this.Report2list=[];}  
}

  } catch (error) {
    this.spinner.hide();
    this.utils.catchResponse(error);
  }
}





btnLogout(): void {
  if (confirm('are you sure want to logout ?')) {
    const req = {
      userName: this.userName,
    };

    this.spinner.show();
    this.loginAPI
      .logout(req)
      .then((res: any) => {
        if (res.success) {
          alert(res.message);
          sessionStorage.clear();
          this.session.clearSession();
          this.router.navigate(['/']);
        } else {
          this.toast.info(res.message);
        }
        this.spinner.hide();
      })
      .catch((error: any) => {
        this.spinner.hide();
        this.utils.catchResponse(error);
      });
  }
}

btnForgetPassword(): void {
  this.utils.updatePassword(this.session.desigId);
}


}
