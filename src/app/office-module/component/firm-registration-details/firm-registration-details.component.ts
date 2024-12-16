
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
 
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { OfficeserviceService } from '../../services/officeservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-firm-registration-details',
  templateUrl: './firm-registration-details.component.html',
  styleUrls: ['./firm-registration-details.component.css'] 
})
export class FirmRegistrationDetailsComponent implements OnInit {
  //registerForm: FormGroup;
  districtListdata=[];
  stateListdata=[];
  DISTID:any;
  STATEID:any;
  firmname:any;  address1:any;  address2:any;  panno:any;  Email:any;  gstno:any;  contactno:any;
  paddress:any;
  pcontactno:any;  accountno:any;pestyear:any;pregno:any;
  branchname:any;  bankname:any;ifsccode:any;bankAccLength:any;micrNo:any;accountNolength:any;
  submitbtn:true;
  minDate: Date;
  maxDate: Date;
  constructor(  
    private toast: ToasterService,
    private utils: UtilsService, 
    private session: SessionService, 
    private OfficeModuleAPI: OfficeserviceService, 
    private spinner: NgxSpinnerService, 
    private router: Router  
  ) { }

  ngOnInit(): void {
    if(this.session.uniqueId !="" && this.session.desigId != ""){
    // this.pestyear =this.session.getCurrentyear();// today.getFullYear();
    
    this.StateLists();

  }
  else
  {
    this.router.navigate(['/shared/UnAuthorized']);
  }
  }

  async StateLists(): Promise<void> {
    try {     
      const reqdistrict={
        type:"10"
      };  this.spinner.show();
      const res = await this.OfficeModuleAPI.office_po_select(reqdistrict); 
      if (res.success) { 
        this.stateListdata = res.result; 
      } else {
        this.toast.info(res.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async DISTRICTSBYSTATEID(): Promise<void> {
    try {     
      const reqdistrict={
        type:"11",
        ID:this.STATEID,
      };  
      this.spinner.show();
      const res = await this.OfficeModuleAPI.office_po_select(reqdistrict); 
      if (res.success) { 
        this.districtListdata = res.result; 
      } else {
        this.toast.info(res.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
   
  async findifsccodedetails():Promise<void>{
    try {
      
      if (
        this.ifsccode === '' ||
        this.ifsccode === null ||
        this.ifsccode === undefined
      ) {
        this.toast.warning('Please Select IFSC CODE');
        return;
      }

      const req = {
        ifscCode: this.ifsccode,
      };
      this.spinner.show();
      const response = await this.OfficeModuleAPI.searchByIFSC(req);
      this.spinner.hide();
      if (response.success) {
        let count = 0;
      //  for (let i = 0; i < response.result.length; i++) { 
            this.accountNolength === response.result[0].ACCOUNTLENGTH;   
            this.bankname = response.result[0].BANK;
            this.branchname = response.result[0].BRANCH;
            this.bankAccLength = response.result[0].ACCOUNTLENGTH;
            this.micrNo = response.result[0].MICR_CODE;
          //  count++;
           // break;
           
       // }
        // if (count < 1) {
        //   this.toast.info('Invalid bank account number for entered IFSC Code');
        // }
      } else {  this.spinner.hide();
        this.toast.info(response.message);
      }
    } catch(ex)
    { this.spinner.hide();
      throw ex;
    }
  }


  async btnSubmitDetails():Promise<void>{

    try {
      
      if (this.validate()) {
        const req={

          type:"1",
           FIRMID:"0",
          FIRMNAME:this.firmname,
          FADDRESS1:this.address1,
          FADDRESS2:this.address2,
          DISTRICTID:this.DISTID,
        
          FCONTACT:this.contactno,
          EMAIL:this.Email,
          PAN:this.panno,
          GST:this.gstno,

          PLANTADDRESS:this.paddress,
          PLANTCONTACT:this.pcontactno,
          REGNO:this.pregno,
          YEAROFESTB:this.pestyear,

          BANKNAME:this.bankname,
          BRANCHNAME:this.branchname,
          BANKIFSC:this.ifsccode,
          BANKACTNO:this.accountno,

          
          UNIQUEID:this.session.uniqueId,
          ROLE:this.session.desigId,
          INSERTEDBY:this.session.userName 
        };

        const res = await this.OfficeModuleAPI.firmdetailsSub(req); 
        if (res.success) {    
          this.toast.info(res.message);
          this.DISTRICTSBYSTATEID();
          window.location.reload();
        } else {
           this.toast.info(res.result.MSG);
        }

      }
    }
    catch(ex)
    {
      throw ex;
    }
  }

  validate(): boolean {

    

    if ( this.firmname === '' ||  this.firmname === null ||  this.firmname === undefined    ) 
    {    this.toast.warning('Please Enter Firm Name');      this.firmname=this.firmname.focus;      return false;    }

     
   else if ( this.address1 === '' ||  this.address1 === null ||  this.address1 === undefined    ) 
    {    this.toast.warning('Please Enter Firm D.No/Street');      this.address1=this.address1.focus;      return false;    }

    else   if ( this.address2 === '' ||  this.address2 === null ||  this.address2 === undefined    ) 
    {    this.toast.warning('Please Enter Village/Mandal/landmark');      this.address2=this.address2.focus;      return false;    }

   else if ( this.pregno === '' ||  this.pregno === null ||  this.pregno === undefined    ) 
    {    this.toast.warning('Please Enter Plant Reg No');      this.pregno=this.pregno.focus;      return false;    }

    else  if ( this.STATEID === '' ||  this.STATEID === null ||  this.STATEID === undefined    ) 
    {    this.toast.warning('Please Enter STATE');      this.STATEID=this.STATEID.focus;      return false;    }

    else  if ( this.DISTID === '' ||  this.DISTID === null ||  this.DISTID === undefined    ) 
    {    this.toast.warning('Please Enter District');      this.DISTID=this.DISTID.focus;      return false;    }
  

    if ( this.panno === '' ||  this.panno === null ||  this.panno === undefined    ) 
    {    this.toast.warning('Please Enter Pan No');      this.panno=this.panno.focus;      return false;    } 
    else
    {
    let regex = new RegExp(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/); 
    if (regex.test( this.panno.toUpperCase()) == false)        { this.toast.warning('Please Enter Valid Pan No');   return false; }  
   }



    if ( this.gstno === '' ||  this.gstno === null ||  this.gstno === undefined    ) 
    {    this.toast.warning('Please Enter Gst No');      this.gstno=this.gstno.focus;      return false;    }
    else{
      let regex = new RegExp(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/);
      if (regex.test( this.gstno.toUpperCase()) == false)        { this.toast.warning('Please Enter Valid GST No');   return false; }  
    }

    if (this.utils.validatemobileno(this.contactno) ===false)  {    this.toast.warning('Please Enter valid contact No');return false;}

       if ( this.contactno === '' ||  this.contactno === null ||  this.contactno === undefined    ) 
    {    this.toast.warning('Please Enter Contact No');      this.contactno=this.contactno.focus;      return false;    }

    else  if(this.contactno.length!=10) {this.toast.warning('Please Enter 10 Digits Contact No ') ;   return false;  }

  
    if ( this.Email === '' ||  this.Email === null ||  this.Email === undefined    ) 
    {    this.toast.warning('Please Enter Email');      this.Email=this.Email.focus;      return false;    }
    else{
      let regex = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
      if (regex.test( this.Email.toUpperCase()) == false)        { this.toast.warning('Please Enter Valid Email');   return false; } 
    }

     

//PLANT DETAILS

    // if ( this.paddress === '' ||  this.paddress === null ||  this.paddress === undefined    ) 
    // {    this.toast.warning('Please Enter Plant Address');      this.paddress=this.paddress.focus;      return false;    }

    // if ( this.pcontactno === '' ||  this.pcontactno === null ||  this.pcontactno === undefined    ) 
    // {    this.toast.warning('Please Enter Plant Contact No');      this.pcontactno=this.pcontactno.focus;      return false;    }

    // if(this.pcontactno.length!=10) {this.toast.warning('Please Enter 10 Digits Plant Contact No ') ;   return false;  }


    
       if ( this.pestyear === '' ||  this.pestyear === null ||  this.pestyear === undefined    ) 
    {    this.toast.warning('Please Enter Plant Established Year');      this.pestyear=this.pestyear.focus;      return false;    } 
  //  BANK DETAILS 
  else  if ( this.bankname === '' ||  this.bankname === null ||  this.bankname === undefined    ) 
    {    this.toast.warning('Please Enter Bank Name');      this.bankname=this.bankname.focus;      return false;    }
    else   if ( this.branchname === '' ||  this.branchname === null ||  this.branchname === undefined    ) 
    {    this.toast.warning('Please Enter Branch Name');      this.branchname=this.branchname.focus;      return false;    }

    else   if ( this.ifsccode === '' ||  this.ifsccode === null ||  this.ifsccode === undefined    ) 
    {    this.toast.warning('Please Enter IFSC CODE');      this.ifsccode=this.ifsccode.focus;      return false;    }
    else
    {
      let regex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
      if (regex.test( this.ifsccode.toUpperCase()) == false)        { this.toast.warning('Please Enter Valid IFSC CODE');   return false; } 
    }
    if(this.accountno.length!=this.bankAccLength){    this.toast.warning('Please Enter Account No Length not matched');return false;}
    // if (this.utils.validatebankaccount(this.accountno) ===false) 
    if ( this.accountno === '' ||  this.accountno === null ||  this.accountno === undefined    )
    {    this.toast.warning('Please Enter Account No');return false;}
    
  //  if (  validatebankaccount this.accountno === '' ||  this.accountno === null ||  this.accountno === undefined    ) 
  //   {    this.toast.warning('Please Enter Account No');      this.accountno=this.accountno.focus;      return false;    }

    // paddress
    // pcontactno
    
    


  return true;
 }

//  public static bool isValid_Bank_Acc_Number(string str)
// {
//     string strRegex = @"^[0-9]{9,18}$";
//     Regex re = new Regex(strRegex);
//     if (re.IsMatch(str))
//     return (true);
//     else
//     return (false);
// }

}
