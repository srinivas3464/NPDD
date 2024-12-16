import { Component, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';
import { image } from 'html2canvas/dist/types/css/types/image';
import { jsPDF } from 'jspdf';
 
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { OfficeserviceService } from '../../services/officeservice.service';
import { Router } from '@angular/router';
 
 
@Component({
  selector: 'app-budgetstatement',
  templateUrl: './budgetstatement.component.html',
  styleUrls: ['./budgetstatement.component.css']
})
export class BudgetstatementComponent implements OnInit {
  //variables
  COMPID:any;DISTRICTID:any;SANYEAR:any;SECTIONID:any;
  yearofsanction:any;provisionid:any;adminauthority:any;Documentsstatus:any;modeofwork:any; 
  txtbudgetsanction:any;txtAdditionalbudgetsanction:any;txtExpenditureamt:any;txtpresentbill:any;
  txtProgressiveexp:any;txtbalanceamount:any;budgetbody:any;budgetbody1:any;
//list
  SectionListdata=[]; componentListdata=[];districtListdata=[];SUBCOMPID:any;subcomponentListdata=[];
  checkList=[];

  

  dtOptions: DataTables.Settings = this.utils.dataTableOptions();
  dtTrigger: Subject<any> = new Subject();
  pendtTrigger: Subject<any> = new Subject();


  constructor(private toast: ToasterService,
    private utils: UtilsService, 
    private session: SessionService, 
    private OfficeModuleAPI: OfficeserviceService,  
    private spinner: NgxSpinnerService,
    private router: Router  ) { }

  ngOnInit(): void { 
    if(this.session.uniqueId !="" && this.session.desigId != "")
        {

          document.getElementById('budgethead').style.display="none";  
          this.Componentdetails(45);
          this.Componentdetails(1);
          this.Componentdetails(18);
          this.txtbudgetsanction="0";//"15859220";
          this.txtAdditionalbudgetsanction="0";
          this.txtExpenditureamt="0"
          this.txtProgressiveexp="0";//"1321600";
          this.txtbalanceamount="0";//14537620"; 
          this.Todaytenderdetails(); 
        }
    else
        {
          this.router.navigate(['/shared/UnAuthorized']);
        }
  } 
  
  async Componentdetails(id): Promise<void> { 
    try {   
      const reqdistrict={        type:id,ID:this.COMPID         }  ;
      const res = await this.OfficeModuleAPI.office_po_select(reqdistrict); 
      if (res.success) { 
        if(id==45)
        this.componentListdata = res.result; 
        else if(id==1)
        this.districtListdata = res.result; 
        else if(id==18)
        this.SectionListdata = res.result; 
        else if(id==21)
        this.subcomponentListdata = res.result; 

      } else {
        this.toast.info(res.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
  async SubComponentdetails(): Promise<void> { 
    try {   
      const reqdistrict={        type:46,ID:this.COMPID         }  ;
      const res = await this.OfficeModuleAPI.office_po_select(reqdistrict); 
      if (res.success) {             
        this.subcomponentListdata = res.result; 
        if(this.COMPID!=undefined && this.COMPID!="" && this.COMPID!=null &&
        this.SUBCOMPID!=undefined && this.SUBCOMPID!="" && this.SUBCOMPID!=null &&
        this.SANYEAR!=undefined && this.SANYEAR!="" && this.SANYEAR!=null      &&
        this.DISTRICTID!=undefined && this.DISTRICTID!="" && this.DISTRICTID!=null
        )
        {
          this.Districtchanged();
        }
      } else {
        this.toast.info(res.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
  
  async yearchange(): Promise<void> { 
    try {
      if(this.COMPID!=undefined && this.COMPID!="" && this.COMPID!=null &&
        this.SUBCOMPID!=undefined && this.SUBCOMPID!="" && this.SUBCOMPID!=null &&
        this.SANYEAR!=undefined && this.SANYEAR!="" && this.SANYEAR!=null      &&
        this.DISTRICTID!=undefined && this.DISTRICTID!="" && this.DISTRICTID!=null
        )    {  this.Districtchanged();  }
    } catch (error) {
      
    }
  }
  async Districtchanged(): Promise<void> { 
    try {
      if (this.utils.isEmpty(this.COMPID)) {
        this.toast.warning('Select Component');
        return;
      }
      else  if (this.utils.isEmpty(this.SUBCOMPID)) {
        this.toast.warning('Select SubComponent');
        return;
      }
  
      else if (this.utils.isEmpty(this.SANYEAR)) {
        this.toast.warning('Select Year of sanction');
        return;
      }
      else if (this.utils.isEmpty(this.DISTRICTID)) {
        this.toast.warning('Select  DISTRICT');
        return;
      }
     debugger;

      const reqdistrict={        type:47,ID:this.SUBCOMPID ,POID:this.SANYEAR,DISTRICTID:this.DISTRICTID        }  ;
      const res = await this.OfficeModuleAPI.office_po_select(reqdistrict); 
      if (res.success) {             
         
        this.txtbudgetsanction=res.result[0].BUDGETSANCTIONAMOUNT;
        this.txtExpenditureamt=res.result[0].EXPINC;
      } else {
        this.txtbudgetsanction="";
        this.txtExpenditureamt="";

        this.toast.info(res.message);
      }
      this.spinner.hide();
    } catch (error) {
      
    }
  }

  async SubComponentBudgetamtdetails(): Promise<void> { 
    try {   
     // this.subcomponentListdata 
     if(this.subcomponentListdata.length>0)
     {
      for(let i=0;i<this.subcomponentListdata.length;i++)
      {
        if(this.subcomponentListdata[i].SUBCOMPID==this.SUBCOMPID){
          this.txtbudgetsanction=this.subcomponentListdata[i].BUDGETSANCTIONAMOUNT;
          this.txtExpenditureamt=this.subcomponentListdata[i].EXPINC;
        }
      }
     }

    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
 
  public downloadAsPDFgrid() : void {

    let data = document.getElementById('grid1'); 
    var divHeight = $('#grid1').height();
  var divWidth = $('#grid1').width();

    html2canvas(data).then(canvas => {
    const contentDataURL = canvas.toDataURL('image/png')  // 'image/jpeg' for lower quality output.
    let pdf = new jsPDF('l', 'cm', 'a4'); //Generates PDF in landscape mode
    // let pdf = new jspdf('p', 'cm', 'a4'); Generates PDF in portrait mode
    pdf.addImage(contentDataURL, 'PNG', 0, 0, 29.7, 21.0);  
    pdf.save('BudgetSlip'+this.session.getTodayDateString().replace('-','').replace('-','')+'.pdf');   
   // window.location.reload();
  }); 

  // var divHeight = $('#grid1').height();
  // var divWidth = $('#grid1').width();
  // var ratio = divHeight / divWidth;
  // html2canvas(document.getElementById("grid1"), {
  //      height: divHeight,
  //      width: divWidth, onrendered: function(canvas) {
  //           var image = canvas.toDataURL("image/jpeg");
  //           var doc = new jsPDF(); // using defaults: orientation=portrait, unit=mm, size=A4
  //           var width = doc.internal.pageSize.getWidth();    
  //           var height = doc.internal.pageSize.getHeight();
  //           height = ratio * width;
  //           doc.addImage(image, 'JPEG', 0, 0, width-20, height-10);
  //           doc.save('myPage.pdf'); //Download the rendered PDF.
  //      }
  // });




  }
  
   
  public downloadAsPDF() {
    
    document.getElementById('btnsubmit').style.display="none";  
    document.getElementById('budgethead').style.display="block";   
 
document.getElementById('txtProgressiveexp').style.borderColor='white';
document.getElementById('txtProgressiveexp').style.backgroundColor='white';
 
document.getElementById('txtbalanceamount').style.borderColor='white';
document.getElementById('txtbalanceamount').style.backgroundColor='white';

document.getElementById('txtExpenditureamt').style.borderColor='white';
document.getElementById('txtExpenditureamt').style.backgroundColor='white';

document.getElementById('txtAdditionalbudgetsanction').style.borderColor='white';
document.getElementById('txtAdditionalbudgetsanction').style.backgroundColor='white';

document.getElementById('txtbudgetsanction').style.borderColor='white';
document.getElementById('txtbudgetsanction').style.backgroundColor='white';



document.getElementById('COMPID').style.borderColor='white';
document.getElementById('COMPID').style.backgroundColor='white'; 
document.getElementById('COMPID').style.backgroundImage='none';

document.getElementById('SUBCOMPID').style.borderColor='white';
document.getElementById('SUBCOMPID').style.backgroundColor='white'; 
document.getElementById('COMPID').style.backgroundImage='none';


document.getElementById('SANYEAR').style.borderColor='white';
document.getElementById('SANYEAR').style.backgroundColor='white'; 
document.getElementById('SANYEAR').style.backgroundImage='none';

document.getElementById('DISTRICTID').style.borderColor='white';
document.getElementById('DISTRICTID').style.backgroundColor='white'; 
document.getElementById('DISTRICTID').style.backgroundImage='none';

document.getElementById('SECTIONID').style.borderColor='white';
document.getElementById('SECTIONID').style.backgroundColor='white'; 
document.getElementById('SECTIONID').style.backgroundImage='none';

document.getElementById('provisionid').style.borderColor='white';
document.getElementById('provisionid').style.backgroundColor='white'; 
document.getElementById('provisionid').style.backgroundImage='none';

document.getElementById('adminauthority').style.borderColor='white';
document.getElementById('adminauthority').style.backgroundColor='white'; 
document.getElementById('adminauthority').style.backgroundImage='none';

document.getElementById('Documentsstatus').style.borderColor='white';
document.getElementById('Documentsstatus').style.backgroundColor='white'; 
document.getElementById('Documentsstatus').style.backgroundImage='none';

document.getElementById('modeofwork').style.borderColor='white';
document.getElementById('modeofwork').style.backgroundColor='white'; 
document.getElementById('modeofwork').style.backgroundImage='none';



    let data = document.getElementById('budgetbody1');  
    html2canvas(data).then(canvas => {
    const contentDataURL = canvas.toDataURL('image/png')  // 'image/jpeg' for lower quality output.
    let pdf = new jsPDF('l', 'cm', 'a4'); //Generates PDF in landscape mode
    // let pdf = new jspdf('p', 'cm', 'a4'); Generates PDF in portrait mode
    pdf.addImage(contentDataURL, 'PNG', 0, 0, 29.7, 21.0);  
    pdf.save('BudgetSlip'+this.session.getTodayDateString().replace('-','').replace('-','')+'.pdf');   
   // window.location.reload();
  }); 
  this. btnclear();
  }

  async btnclear():Promise<void>{
    try { 


    document.getElementById('txtProgressiveexp').style.borderColor='gray';
document.getElementById('txtProgressiveexp').style.backgroundColor='#ededede6';
 
document.getElementById('txtbalanceamount').style.borderColor='gray';
document.getElementById('txtbalanceamount').style.backgroundColor='#ededede6';

document.getElementById('txtExpenditureamt').style.borderColor='gray';
document.getElementById('txtExpenditureamt').style.backgroundColor='#ededede6';

document.getElementById('txtAdditionalbudgetsanction').style.borderColor='gray';
document.getElementById('txtAdditionalbudgetsanction').style.backgroundColor='#ededede6';

document.getElementById('txtbudgetsanction').style.borderColor='gray';
document.getElementById('txtbudgetsanction').style.backgroundColor='#ededede6';



document.getElementById('COMPID').style.borderColor='gray';
document.getElementById('COMPID').style.backgroundColor='white'; 
document.getElementById('COMPID').style.backgroundImage='block';

document.getElementById('SUBCOMPID').style.borderColor='gray';
document.getElementById('SUBCOMPID').style.backgroundColor='white'; 
document.getElementById('COMPID').style.backgroundImage='block';


document.getElementById('SANYEAR').style.borderColor='gray';
document.getElementById('SANYEAR').style.backgroundColor='white'; 
document.getElementById('SANYEAR').style.backgroundImage='block';

document.getElementById('DISTRICTID').style.borderColor='gray';
document.getElementById('DISTRICTID').style.backgroundColor='white'; 
document.getElementById('DISTRICTID').style.backgroundImage='block';

document.getElementById('SECTIONID').style.borderColor='gray';
document.getElementById('SECTIONID').style.backgroundColor='white'; 
document.getElementById('SECTIONID').style.backgroundImage='block';

document.getElementById('provisionid').style.borderColor='gray';
document.getElementById('provisionid').style.backgroundColor='white'; 
document.getElementById('provisionid').style.backgroundImage='block';

document.getElementById('adminauthority').style.borderColor='gray';
document.getElementById('adminauthority').style.backgroundColor='white'; 
document.getElementById('adminauthority').style.backgroundImage='block';

document.getElementById('Documentsstatus').style.borderColor='gray';
document.getElementById('Documentsstatus').style.backgroundColor='white'; 
document.getElementById('Documentsstatus').style.backgroundImage='block';

document.getElementById('modeofwork').style.borderColor='gray';
document.getElementById('modeofwork').style.backgroundColor='white'; 
document.getElementById('modeofwork').style.backgroundImage='block';
 
//window.location.reload();
    }
    catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
  
  async btnSubmitDetails( ):Promise<void>{
    try { 
  
document.getElementById('budgethead').style.display="none";  
document.getElementById('btnsubmit').style.display="block"; 
//this. downloadAsPDF() ;
    if (this.utils.isEmpty(this.COMPID)) {
      this.toast.warning('Select Component');
      return;
    }
    else  if (this.utils.isEmpty(this.SUBCOMPID)) {
      this.toast.warning('Select SubComponent');
      return;
    }

    else if (this.utils.isEmpty(this.SANYEAR)) {
      this.toast.warning('Select Year of sanction');
      return;
    }
    else if (this.utils.isEmpty(this.DISTRICTID)) {
      this.toast.warning('Select  DISTRICT');
      return;
    }

    else if (this.utils.isEmpty(this.SECTIONID)) {
      this.toast.warning('Select Section');
      return;
    } 
    else  if (this.utils.isEmpty(this.txtpresentbill))
    {
      this.toast.warning('Enter Present Bill');
      return;
    }
    else  if (this.utils.isEmpty(this.provisionid))
    {
      this.toast.warning('Select Budget provision Yes No' );
      return;
    } 
    else  if (this.utils.isEmpty(this.adminauthority))
    {
      this.toast.warning('Select administrative authority Yes No');
      return;
    } 
    else   if (this.utils.isEmpty(this.Documentsstatus))
    {
      this.toast.warning('Select supporting documents are attached Yes No');
      return;
    } 
    else if (this.utils.isEmpty(this.modeofwork))
    {
      this.toast.warning('Select Mode of work awardship Tender/ Quotation');
      return;
    } 

    else{

      const req={
        type:"1",
       id:"0", 
       BUDID:"0",
       COMPID:this.COMPID,
       SUBCOMPID:this.SUBCOMPID,
       YEAROFSANCTION:this.SANYEAR,
       DISTRICTID:this.DISTRICTID,
       SECTIONID:this.SECTIONID,
       BUDSANCTIONAMT: this.txtbudgetsanction,
       ADDLBUDAMT: this.txtAdditionalbudgetsanction,
       EXPINC:  this.txtExpenditureamt,
       PRESENTBILL:this.txtpresentbill,
       PROGEXP: this.txtProgressiveexp,
       BALANCEAMT: this.txtbalanceamount,
       PROVISIONID:this.provisionid,
       ADMINAUTH:this.adminauthority,
       DOCSTATUS:this.Documentsstatus,
       MODEOFWORK:this.modeofwork,
       TXNDATE:this.session.getTodayDateString(),
       ROLE:this.session.desigId,
       INSERTEDBY:this.session.userName,
       UNIQUEID:this.session.uniqueId, 
     }; 
     this.spinner.show();     
     const res =  await this.OfficeModuleAPI.officeBudgetslipSub(req);      
     this.spinner.hide(); 
      if (res.success) {  
        this.toast.info(res.message); 
        window.location.reload();
      
      } else {
        this.toast.info(res.message);
      }
      this.spinner.hide();
    }

    }
    catch (error) {
    this.spinner.hide();
    this.utils.catchResponse(error);
  }
    } 


    // public download(): void {
    //   const documentCreator = new DocumentCreator();
    //   const doc = documentCreator.create();
    //   doc.createParagraph("Test heading1, bold and italicized").heading1();
    //   doc.createParagraph("Some simple content");
    //   const packer = new Packer();
  
    //   packer.toBlob(doc).then(blob => {
    //     console.log(blob);
    //     saveAs(blob, "example.docx");
    //     console.log("Document created successfully");
    //   });
    // }


    async Todaytenderdetails(): Promise<void> {
      try {  
        this.checkList = [];  
          const req = {
            type:"3" 
          };
  
          this.spinner.show();
          const res = await this.OfficeModuleAPI.officeBudgetslipSub(req); 
          this.spinner.hide();
          this.checkList = [];
          if (res.success) {
            
            this.checkList = res.result; 
          } else {
            this.toast.info(res.message);
          }
        
        
      } catch (error) {
        this.spinner.hide();
        this.utils.catchResponse(error);
      }
    } 
  

    async onModeChange(): Promise<void> {
      try {  
        

        if(this.utils.isEmpty(this.txtExpenditureamt)  ){

          if(this.utils.isEmpty(this.txtpresentbill)  )
         {  this.txtProgressiveexp="0"; this.txtbalanceamount=parseInt(this.txtbudgetsanction)-parseInt(this.txtProgressiveexp); }
          else
         { this.txtProgressiveexp= parseInt(this.txtpresentbill); this.txtbalanceamount=parseInt(this.txtbudgetsanction)-parseInt(this.txtProgressiveexp); }
        }
        else{ 
          if(this.utils.isEmpty(this.txtpresentbill)  )
          {this.txtProgressiveexp=this.txtExpenditureamt; this.txtbalanceamount=parseInt(this.txtbudgetsanction)-parseInt(this.txtProgressiveexp);}
          else
         { 
          // this.txtProgressiveexp= parseInt(this.txtExpenditureamt) + parseInt(this.txtpresentbill);
          // this.txtbalanceamount=parseInt(this.txtbudgetsanction)-parseInt(this.txtProgressiveexp);
          if (this.txtbudgetsanction!="0")
          {
          this.txtProgressiveexp= parseInt(this.txtExpenditureamt) + parseInt(this.txtpresentbill);
          this.txtbalanceamount=parseInt(this.txtbudgetsanction)-parseInt(this.txtProgressiveexp); 
         }
         else{ this.txtProgressiveexp= parseInt(this.txtExpenditureamt) + parseInt(this.txtpresentbill);

         }
        
        }
        }
        if(this.utils.isEmpty(this.txtExpenditureamt)  ){ this.txtProgressiveexp="0"; this.txtbalanceamount=parseInt(this.txtbudgetsanction)-parseInt(this.txtProgressiveexp);}


        

        //  if(this.utils.isEmpty(this.totalamount) || this.utils.isEmpty(this.paymodeamount1) || (this.paymodeamount1=="undefined")|| (this.totalamount=="undefined"))   
        //  this.percentageamount1= 0; 
        //  else if(( trim(this.totalamount.toString())==="") && (trim(this.paymodeamount1.toString())==="")   )   
        //  this.percentageamount1= 0;
        //  else
        //  this.percentageamount1= ((this.totalamount) * (parseFloat(this.paymodeamount1)  /100)   ); 
  
  
  
  
        //  if(this.utils.isEmpty(this.totalamount) || this.utils.isEmpty(this.paymodeamount2) || (this.paymodeamount2=="undefined")|| (this.totalamount=="undefined"))   
        //  this.percentageamount2= 0;
        //  else
        //  this.percentageamount2= ((this.totalamount) * (parseFloat(this.paymodeamount2)  /100)   ); 
  
  
  
        //  if(this.utils.isEmpty(this.totalamount) || this.utils.isEmpty(this.paymodeamount3) || (this.paymodeamount3=="undefined")|| (this.totalamount=="undefined"))   
        
        //  this.percentageamount3= 0;
        //  else
        //  this.percentageamount3= ((this.totalamount) * (parseFloat(this.paymodeamount3)  /100)   ); 
  
  
  
        //  if(this.utils.isEmpty(this.totalamount) || this.utils.isEmpty(this.paymodeamount4) || (this.paymodeamount4=="undefined")|| (this.totalamount=="undefined"))   
        
        //  this.percentageamount4= 0;
        //  else
        //  this.percentageamount4= ((this.totalamount) * (parseFloat(this.paymodeamount4)  /100)   ); 
  
   
                
      } catch (error) {
        this.spinner.hide();
        this.utils.catchResponse(error);
      }
    }

    
    async DOWNLOADBUDGET(BUDIDS): Promise<void> {
      try {  
        const req={
          type:"4",
          id:BUDIDS
        };
        this.spinner.show();
        const res = await this.OfficeModuleAPI.officeBudgetslipPrint(req); 
        this.spinner.hide();
        this.checkList = [];
        if (res.success) {
          this.utils.viewPDF(res.result);
         // this.checkList = res.result; 
        this.ngOnInit();
        } else {
          this.toast.info(res.message);
        }

      } catch (error) {
        this.spinner.hide();
        this.utils.catchResponse(error);
      }
    }

}
 