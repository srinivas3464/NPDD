import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginService } from 'src/app/login/services/login.service';
import { CommonService } from '../../services/common.service';
import { SessionService } from '../../services/session.service';
import { ToasterService } from '../../services/toaster.service';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-password-update',
  templateUrl: './password-update.component.html',
  styleUrls: ['./password-update.component.css'],
})
export class PasswordUpdateComponent implements OnInit {
  input = '';
  dashboardRoute: string;
  userName: any;
  timeStamp = '';
  lastLoginTime = '';
  userdata = {
    oldPassword: null,
    newPassword: null,
    confirmPassword: null,
  };
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private utils: UtilsService,
    private toast: ToasterService,
    private CommonAPI: CommonService,
    private spinner: NgxSpinnerService,
    private session: SessionService,
    private loginAPI: LoginService
  ) {
    this.userName = this.session.userName;
    this.lastLoginTime = this.session.lastLoginTime;
    route.queryParams.subscribe((params) => (this.input = params['request']));
  }

  ngOnInit(): void {
    if(this.session.uniqueId !="" && this.session.desigId != ''){

    }
    else
    {
      this.router.navigate(['/shared/UnAuthorized']);
    }
    if(this.session.userName!="" && this.session.accessToken!=""){
      const decString = JSON.parse(this.utils.decrypt(this.input));
      this.dashboardRoute ="/login";// decString.routeId ;
    }
    else{
      this.router.navigate(['/shared/UnAuthorized']);
    }
    
  }

  GetLogout(): void {
    if (confirm('are you sure want to logout ?')) {
      sessionStorage.clear();
      this.router.navigate(['/']);
    }
  }
 
  async checkStrength(password1) {
   // if(password1=="1")
     var password=this.userdata.newPassword;
     $(".btnpasswordchange").show();
    
   // else
   // var password=this.userdata.confirmPassword;
  // alert(this.userdata.newPassword);
  $(".btnresult").hide();
  var strength = 0
  if (password.length < 8) {
      $('.result').removeClass()
      $(".btnpasswordchange").hide();  $(".btnresult").show();
      $('.result').addClass('short');// alert('Too short');
      return false;// 'Too short';
  }
  if (password.length > 7) strength += 1
  if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) strength += 1
  if (password.match(/([a-zA-Z])/) && password.match(/([0-9])/)) strength += 1 
  if (password.match(/([!,%,&amp;,@,#,$,^,*,?,_,~])/)) strength += 1
  if (password.match(/(.*[!,%,&amp;,@,#,$,^,*,?,_,~].*[!,",%,&amp;,@,#,$,^,*,?,_,~])/)) strength += 1
  var confirmPwd=this.userdata.confirmPassword;
  if (strength < 4) {
      $('.result').removeClass(); $(".btnresult").show();
      $('.result').addClass('weak');  $(".btnpasswordchange").hide();// alert('To Weak');
      return false;
  }
//   else if (  strength < 5) {
//     $('.result').removeClass(); $(".btnresult").show();
//     $('.result').addClass('weak');  $(".btnpasswordchange").hide(); alert('Weak');
//     return 'Weak';
// }
  // else if (strength == 2) {
  //     $('.result').removeClass();
  //     $('.result').addClass('good');  $(".btnpasswordchange").show();
  //     alert('Good');
  //     return 'Good';
  // } 
  // else {
  //     $('.result').removeClass();
  //     $('.result').addClass('strong');  $(".btnpasswordchange").show();
  //     return 'Strong';
  // }  
 else if (confirmPwd!=null) {
    if(password!=confirmPwd){
    $('.result').removeClass();
    $(".btnpasswordchange").hide(); $(".btnresult").show();
    $('.result').addClass('newpassword and confirmpassword not matched')
  //  alert('newpassword and confirmpassword not matched');
    return false;// 'newpassword and confirmpassword not matched';
    }
  }
  var oldPassword1=this.userdata.oldPassword;
    if (confirmPwd!=null &&   password!=null &&   oldPassword1!=null   ) {
      if (confirmPwd==   oldPassword1    ) {
      $('.result').removeClass();
      $(".btnpasswordchange").hide(); $(".btnresult").show();
      $('.result').addClass('Old password and Confirm password both are same')
      alert('Old password and New password both are same');
      return false;// 'newpassword and confirmpassword not matched';
      }
       
    }
 

} 
  async btnSubmit(): Promise<void> {
    try {debugger;
      if (
        this.userdata.oldPassword === null ||
        this.userdata.oldPassword === undefined ||
        this.userdata.oldPassword === ''
      ) {
        this.toast.warning('Please Enter Old Password');
        return;
      }
      if (
        this.userdata.newPassword === null ||
        this.userdata.newPassword === undefined ||
        this.userdata.newPassword === ''
      ) {
        this.toast.warning('Please Enter New Password');
        return;
      }
      if (
        this.userdata.confirmPassword === null ||
        this.userdata.confirmPassword === undefined ||
        this.userdata.confirmPassword === ''
      ) {
        this.toast.warning('Please Enter Confirm Password');
        return;
      }
      if (this.userdata.confirmPassword !== this.userdata.newPassword) {
        this.toast.warning(
          'Password and confirm password not matched, Please try again !!!'
        );
        return;
      }

      const req = {
        userName: this.session.userName,
        oldPassword: this.userdata.oldPassword,
        newPassword: this.userdata.newPassword,
      };
      this.spinner.show();
      //const response = await this.CommonAPI.passwordUpdate(req);
      const response = await this.CommonAPI.passwordUpdatenew(req);
      if (response.success) {
        this.spinner.hide();
        alert(response.message);
        this.session.passwordUpdate = '1';
        this.router.navigate([this.dashboardRoute]);
      } else {
        this.toast.info(response.message);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async btnLogout(): Promise<void> {
    try {
      if (confirm('are you sure want to logout ?')) {
        const req = {
          userName: this.userName,
        };
        const response = await this.loginAPI.logout(req);
        if (response.success) {
          alert(response.message);
          sessionStorage.clear();
          this.session.clearSession();
          this.router.navigate(['./login']);
        } else {
          this.toast.info(response.message);
        }
        this.spinner.hide();
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
}
