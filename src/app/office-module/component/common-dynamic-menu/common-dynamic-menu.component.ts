import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { OfficeserviceService } from '../../services/officeservice.service';
import { LoginService } from 'src/app/login/services/login.service';

@Component({
  selector: 'app-common-dynamic-menu',
  templateUrl: './common-dynamic-menu.component.html',
  styleUrls: ['./common-dynamic-menu.component.css']
})
export class CommonDynamicMenuComponent implements OnInit {

  userName: string;
  lastLoginTime: string;
  guideLines: any[];
  mdssshowhide=false; admin=false;
  
  menu1list:[];menu2list:[];menu3list:[];menu4list:[];menu5list:[];
  Report1list:[];Report2list:[];Report3list:[];Report4list:[];Report5list:[];
  constructor(private spinner: NgxSpinnerService,
    private utils: UtilsService, 
    private router: Router,
    private toast: ToasterService,
    private session: SessionService, 
   // private dairyapp:McuMappingService,
   private loginAPI: LoginService,
    private OfficeModuleAPI: OfficeserviceService,) { }

  ngOnInit(): void {this.userName=this.session.userName;
    this.menufind('1','1_1');
     this.menufind('2','2_2');
    this.menufind('3','3_3');
    this.menufind('4','4_4');
    this.menufind('5','5_5');
    this.menufind('6','6_6'); 
    this.menufind('7','7_7'); 
    this.menufind('8','8_8');
     this.menufind('9','9_9');
      this.menufind('10','10_10'); 

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
  else if(screenid=='5')  { this.menu5list=[];this.menu5list=res.result; }  
  else if(screenid=='6')  { this.Report1list=[];this.Report1list=res.result; debugger;}  
  else if(screenid=='7')  { this.Report2list=[];this.Report2list=res.result; }  
  else if(screenid=='8')  { this.Report3list=[];this.Report3list=res.result; }  
  else if(screenid=='9')  { this.Report4list=[];this.Report4list=res.result; }  
  else if(screenid=='10')  { this.Report5list=[];this.Report5list=res.result; }  
 } 
 else{
  if(screenid=='1') { this.menu1list=[]; }
  else if(screenid=='2') { this.menu2list=[]; }
  else if(screenid=='3')  { this.menu3list=[]; }
  else if(screenid=='4')  { this.menu4list=[]; }
  else if(screenid=='5')  { this.menu5list=[];}  
  else if(screenid=='6')  { this.Report1list=[];}  
  else if(screenid=='7')  { this.Report2list=[];}  
  else if(screenid=='8')  { this.Report3list=[];}  
  else if(screenid=='9')  { this.Report4list=[];}  
  else if(screenid=='10')  { this.Report5list=[];}  


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
