import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginService } from 'src/app/login/services/login.service';
import { OfficeserviceService } from 'src/app/office-module/services/officeservice.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-common',
  templateUrl: './common.component.html',
  styleUrls: ['./common.component.css']
})
export class CommonComponent implements OnInit {
//variables
userName:any;  lastLoginTime: any;  
//menu list
  menu1list:[];menu2list:[];menu3list:[];menu4list:[];menu5list:[];
//report list
  Report1list:[];Report2list:[];Report3list:[];Report4list:[];Report5list:[];

  menu0=false;
  menu1=false;mdssshowhide=false; admin=false;
  constructor(private spinner: NgxSpinnerService,
    private utils: UtilsService, 
    private router: Router,
    private toast: ToasterService,
    private session: SessionService,     
    private loginAPI: LoginService,
    private OfficeModuleAPI: OfficeserviceService,) { }

  ngOnInit(): void { debugger;
    this.lastLoginTime=this.session.lastLoginTime; 
    this.userName=this.session.userName;  
        if(this.session.uniqueId !="" && this.session.desigId != "")
        { 
        if( this.session.desigId==="10"  )  {
          if(this.session.uniqueId.toString()=="90001") 
               { this.menu0=true;this.menu1=false;}//Ravi and Kameshwri menu
               else 
               {this.menu1=true;this.menu0=false;} 
          }
        }
      else
      {
        this.router.navigate(['/shared/UnAuthorized']);
      }
  }

  //#region menu
//  officemenu2   officemenu3
// // officemenu2   officereport1    
  async officemenu1(  screenid,  menuid) {
    try { debugger;
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
const res = await this.OfficeModuleAPI.officemenu1(req); 
this.spinner.hide();  
 if (res.success) { 
  if(screenid=='1') { this.menu1list=[]; this.menu1list=res.result; } 
 } 
 else{
  if(screenid=='1') { this.menu1list=[]; }
  
 }

    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
}

async officemenu2(  screenid,  menuid) {
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
const res = await this.OfficeModuleAPI.officemenu2(req); 
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

async officemenu3(  screenid,  menuid) {
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
const res = await this.OfficeModuleAPI.officemenu3(req); 
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

async Findmenu45(  screenid,  menuid) {
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
else if(screenid=='5')  { this.menu5list=[];this.menu5list=res.result; }   
} 
else{ 
if(screenid=='4')  { this.menu4list=[]; }
else if(screenid=='5')  { this.menu5list=[];}   
}

  } catch (error) {
    this.spinner.hide();
    this.utils.catchResponse(error);
  }
}


async officereport1(  screenid,  menuid) {
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
const res = await this.OfficeModuleAPI.officereport1(req); 
this.spinner.hide();  
if (res.success) { 
 if(screenid=='6')  { this.Report1list=[];this.Report1list=res.result; }   
} 
else{ 
  if(screenid=='6')  { this.Report2list=[];}  
}

  } catch (error) {
    this.spinner.hide();
    this.utils.catchResponse(error);
  }
}

async officereport2(  screenid,  menuid) {
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
const res = await this.OfficeModuleAPI.officereport2(req); 
this.spinner.hide();  
if (res.success) { 
  if(screenid=='7')  { this.Report2list=[];this.Report2list=res.result; }  
else if(screenid=='8')  { this.Report3list=[];this.Report3list=res.result; }  
 
} 
else{ 
   if(screenid=='5')  { this.Report2list=[];}  
else if(screenid=='6')  { this.Report3list=[];}  
}

  } catch (error) {
    this.spinner.hide();
    this.utils.catchResponse(error);
  }
}


async officereport3(  screenid,  menuid) {
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
const res = await this.OfficeModuleAPI.officereport3(req); 
this.spinner.hide();  
if (res.success) { 
  if(screenid=='7')  { this.Report2list=[];this.Report2list=res.result; }  
else if(screenid=='8')  { this.Report3list=[];this.Report3list=res.result; }  
 
} 
else{ 
   if(screenid=='5')  { this.Report2list=[];}  
else if(screenid=='6')  { this.Report3list=[];}  
}

  } catch (error) {
    this.spinner.hide();
    this.utils.catchResponse(error);
  }
}
//#endregion menus



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
          //this.router.navigate(['/']);
          this.router.navigate(['/login']);
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
