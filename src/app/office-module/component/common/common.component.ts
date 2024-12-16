import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginService } from 'src/app/login/services/login.service';
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
  //variables
      userName: any;  lastLoginTime: any;  
  //list  
    guideLines: any[];
    //boolean
      mdssshowhide=false; admin=false;  menu0=false;  menu1=false;

  constructor( private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private router: Router,
    private session: SessionService,
    private utils: UtilsService,
    private loginAPI: LoginService,
    private userManual: UserManualsService) { }

  ngOnInit(): void {

    this.userName=this.session.userName;
    this.lastLoginTime=this.session.lastLoginTime;  

    if(this.session.uniqueId !="" && this.session.desigId != ""){   
     if( this.session.desigId==="10"  ) 
      {
     if(this.session.uniqueId.toString()=="90001") 
          { this.menu0=true;this.menu1=false;}//Ravi and Kameshwri menu
          else 
          {this.menu1=true;this.menu0=false;} 
     }     
      else{
        this.router.navigate(['/shared/UnAuthorized']);
      } 
  }
  else
  {
    this.router.navigate(['/shared/UnAuthorized']);
  }

  }

  btnLogout(): void {
    if (confirm('are you sure want to logout ?')) {
      sessionStorage.clear();
         this.session.clearSession();
         //this.router.navigate(['/']);
         this.router.navigate(['/login']); 
    }
  }

  btnForgetPassword(): void {
    this.utils.updatePassword(this.session.desigId);
  }

}
