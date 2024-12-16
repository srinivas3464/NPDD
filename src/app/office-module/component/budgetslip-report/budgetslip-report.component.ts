import { AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild, } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { OfficeserviceService } from '../../services/officeservice.service';
// import html2canvas from 'html2canvas'; 
// import jspdf from 'jspdf';
 import { Router } from '@angular/router'; 
 
import { DataTableDirective } from 'angular-datatables';
import { DATE } from 'ngx-bootstrap/chronos/units/constants'; 
import { LoggerService } from 'src/app/shared/services/logger.service'; 
 





 

@Component({
  selector: 'app-budgetslip-report',
  templateUrl: './budgetslip-report.component.html',
  styleUrls: ['./budgetslip-report.component.css']
})
export class BudgetslipReportComponent implements OnInit, OnDestroy, AfterViewInit {

  checkList=[];

  excelData: any[] = [];
  // dtOptions: DataTables.Settings = this.utils.dataTableOptions();
  // dtTrigger: Subject<any> = new Subject();
  // pendtTrigger: Subject<any> = new Subject();

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = this.utils.dataTableOptions();
  dtTrigger: Subject<any> = new Subject();


  constructor(private toast: ToasterService,
    private utils: UtilsService, 
    private session: SessionService, 
    private OfficeModuleAPI: OfficeserviceService, 
    private router: Router,
    private spinner: NgxSpinnerService  ) { }

  ngOnInit(): void {
    
    if(this.session.uniqueId !="" && this.session.desigId != ""){
this.Todaytenderdetails();
    }
    else
    {
      this.router.navigate(['/shared/UnAuthorized']);
    }
  }



  async Todaytenderdetails(): Promise<void> {
    try {  debugger;
      this.checkList = []; 
        const req = {
          type:"2" ,
          UNIQUEID: this.session.uniqueId,
          ROLE:this.session.desigId,
        };

        this.spinner.show(); this.excelData = [];  //off_budgetslip_dts
        const res = await this.OfficeModuleAPI.officeBudgetslipSub(req); 
        this.spinner.hide();
        this.checkList = [];
        if (res.success) {
          
          this.checkList = res.result; 
          this.rerender(); 
for (var i = 0; i < res.result.length; i++) { 
                        let SingleRowone = {
                            S_NO: i + 1,
                            BUDSNO: res.result[i].BUDSNO,
                            TXNDATE: res.result[i].TXNDATE,
                            COMPNAME: res.result[i].COMPNAME,
                            SUBCOMPNAME:res.result[i].SUBCOMPNAME,
                            YEARS: res.result[i].YEARS,
                            DISTRICTNAME: res.result[i].DISTRICTNAME,
                            SECTION: res.result[i].SECTION,
                            BUDGETAMOUNT:res.result[i].BUDGETAMOUNT,
                            ADDLBUDAMOUNT: res.result[i].ADDLBUDAMOUNT,
                            EXPINC: res.result[i].EXPINC,
                            PRESENTAMTBILL: res.result[i].PRESENTAMTBILL,
                            PROGEXP:res.result[i].PROGEXP,

                            BALANCEAFTEREXP:res.result[i].BALANCEAFTEREXP,
                            BUDPROVISSION:res.result[i].BUDPROVISSION,
                            ADMAPPROVEDSTATUS:res.result[i].ADMAPPROVEDSTATUS,
                            DOCUSTATUS:res.result[i].DOCUSTATUS,
                            MODEOFWORKAWARDSHIP:res.result[i].MODEOFWORKAWARDSHIP,
                            


                        }
                        this.excelData.push(SingleRowone); 
                }


        } else {
          this.toast.info(res.message);
        }
      
      
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  } 

  public downloadAsPDFgrid() : void {
     
  // //   let data = document.getElementById('grid1'); 
  // //   var divHeight = $('#grid1').height();
  // // var divWidth = $('#grid1').width(); 
  // //   html2canvas(data).then(canvas => {
  // //   const contentDataURL = canvas.toDataURL('image/png', divWidth )  // 'image/jpeg' for lower quality output.
  // //   //const contentDataURL = canvas.toDataURL('image/png') 
  // //   let pdf = new jsPDF('l', 'cm', 'a4'); //Generates PDF in landscape mode
  // //   // let pdf = new jspdf('p', 'cm', 'a4'); Generates PDF in portrait mode
  // //   pdf.addImage(contentDataURL, 'PNG', 0, 0,20,21.7);  
  // //   pdf.save('BudgetSlip'+this.session.getTodayDateString().replace('-','').replace('-','')+'.pdf');   
  // //  // window.location.reload();

  
  //  var data = document.getElementById('grid1');
  //  html2canvas(data).then(canvas => {
  //    // Few necessary setting options
  //    var imgWidth = 208;
  //    var imgHeight = canvas.height * imgWidth / canvas.width;
  //    alert(imgHeight)
  //    const contentDataURL = canvas.toDataURL('image/png')
  //    let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
  //    var position = 0;
  //    pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
  //       pdf.save('new-file.pdf');
  //   // window.open(pdf.output('bloburl', { filename: 'new-file.pdf' }), '_blank');
    

  // }); 

  }

  btnExcel(): void {
    debugger;
    
        this.utils.JSONToCSVConvertor(
            this.excelData,
            'Components',
            true
        );
    
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

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

}
