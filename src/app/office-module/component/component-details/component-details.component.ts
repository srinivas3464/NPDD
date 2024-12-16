import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { OfficeserviceService } from '../../services/officeservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-component-details',
  templateUrl: './component-details.component.html',
  styleUrls: ['./component-details.component.css']
})
export class ComponentDetailsComponent implements OnInit {
  //variables
  COMPID:any;strcompid='';replacestr=''; RBKDDSelected:any;
  //list
  componentListdata=[];answrdcheckList=[];dupanswrdcheckList=[]; 
  districtListdata=[];  checkList=[];   compidcheckList = [];

  

  @ViewChildren(DataTableDirective)
  dtElements!: QueryList<DataTableDirective>;
  dtOptions: DataTables.Settings = this.utils.dataTableOptions();
  dtTrigger: Subject<any> = new Subject();
  pendtTrigger: Subject<any> = new Subject();
  
  constructor( private toast: ToasterService,
    private utils: UtilsService, 
    private session: SessionService, 
    private OfficeModuleAPI: OfficeserviceService, 
    private spinner: NgxSpinnerService ,
    private router: Router  
    ) { }

  ngOnInit(): void {

    if(this.session.uniqueId !="" && this.session.desigId != ""){

    this.DistrictLists(); 
    this.Componentdetails();
  }
  else
  {
    this.router.navigate(['/shared/UnAuthorized']);
  }
  }
  async DistrictLists(): Promise<void> {
    try {     
      const reqdistrict={
        type:"1"  
      }  
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



  async Componentdetails(): Promise<void> {
  
    try {     debugger;

      // if (this.utils.isEmpty(this.RBKDDSelected)) {
      //   this.toast.warning('Please select District');         
      //   return;
      // } 
      const reqdistrict={
        type:"271"  //"27", //9
     //   DISTRICTID:this.RBKDDSelected, 

      }  
      const res = await this.OfficeModuleAPI.office_po_select(reqdistrict); 
      if (res.success) { debugger;
        this.componentListdata = res.result; 
      } else {
        this.toast.info(res.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async RBKDDChange(): Promise<void> { 
    try { 

      if (this.utils.isEmpty(this.COMPID)) {
        this.toast.warning('Please select District');         
        return;
      } 
      this.checkList = []; 
        const req = {
          type:"8",
          ID:this.COMPID
        };

        this.spinner.show();
        const res = await this.OfficeModuleAPI.office_po_select(req); 
        this.spinner.hide();
        this.checkList = [];
        if (res.success) {
          
          this.checkList = res.result; 
        } else {
          this.toast.warning(res.message);
        }     
      
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  } 
    async btnSubmitDetails():Promise<void>{ debugger;
      if( this.strcompid.substring(this.strcompid.length-1,1)==",")  this.strcompid=this.strcompid.substring(0,this.strcompid.length-1)
     if( this.strcompid.substring(0,1)==",")this.strcompid=this.strcompid.substring(1,this.strcompid.length);
     this.strcompid=this.strcompid.replace(',,','') ; 

     // alert(this.strcompid);
      const req={
        type:"1",
        id:"0",
        TENDERID:"0",
        COMPID:this.strcompid,
        TENDERDATE:this.session.dpTodayDate,
        INSERTEDBY:this.session.userName,
        ROLE:this.session.desigId,
        UNIQUEID:this.session.uniqueId
        
     };
debugger;
     this.spinner.show();
     const res = await this.OfficeModuleAPI.tenderdetailsSub(req); 
     this.spinner.hide();
     
     if (res.success) {
      this.toast.info(res.message);
      window.location.reload();
     } else {
       this.toast.info(res.message);
     }



    }


  onSelectionChange(x): void {
       
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
            this.strcompid=this.replacestr.replace(',,','');

    }

 
     
  }


  bntenablecheck(): void {
    if (this.checkList.length == this.answrdcheckList.length) {
      var k = 1;
      for (let i = 0; i < this.answrdcheckList.length; i++) {
        if (this.answrdcheckList[i]["ans"] == 0) {
      //    document.getElementById('divSbmt2').style.display='none';   
      //    document.getElementById('tremarks').style.display='block';
          
          return;
        }
      }
   //   this.divSbmt = true;    //this.divSbmt = true;
   //    this.tremarks=false;
    }
  }

}
