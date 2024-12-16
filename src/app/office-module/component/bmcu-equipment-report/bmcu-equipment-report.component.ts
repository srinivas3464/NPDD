import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { DataTableDirective } from "angular-datatables";
import { NgxSpinnerService } from "ngx-spinner";
import { Subject } from "rxjs"; 
import { OfficeserviceService } from "src/app/office-module/services/officeservice.service";
import { SessionService } from "src/app/shared/services/session.service";
import { ToasterService } from "src/app/shared/services/toaster.service";
import { UtilsService } from "src/app/shared/services/utils.service"; 

@Component({
  selector: 'app-bmcu-equipment-report',
  templateUrl: './bmcu-equipment-report.component.html',
  styleUrls: ['./bmcu-equipment-report.component.css']
})
export class BmcuEquipmentReportComponent implements OnInit, OnDestroy, AfterViewInit {
  //list variables
  BMCUEquipmentList: any[] = [];   excelData: any[] = [];  Districtlist: any[] = [];  Bmculist: any[] = []; 
//variables
  BMCUID:any;  Districtid:any;
 

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective; 
  dtOptions: DataTables.Settings = this.utils.dataTableOptions();
  dtTrigger: Subject<any> = new Subject(); 
    pendtTrigger: Subject<any> = new Subject();

  constructor(
      private spinner: NgxSpinnerService,
      private toast: ToasterService,
      private router: Router, 
      private utils: UtilsService,  
      private session: SessionService,
      private OfficeModuleAPI:OfficeserviceService
  ) { }

   
  ngOnInit(): void {
      if (this.session.uniqueId != "" && this.session.desigId != "") {
        this.Districtdetails();
      }
      else {
          this.router.navigate(['/shared/UnAuthorized']);
      } 
  }
  async Districtdetails(): Promise<void> {
    try {
      this.Districtlist =[];
        const reqdistrict = {    TYPE: 10,          }; 
          this.spinner.show();
        const res = await this.OfficeModuleAPI.TechnisianDistricts(reqdistrict); 
        if (res.success) {
            this.Districtlist = res.result; 
            this.spinner.hide();
            return;
        } else {
          this.spinner.hide();
            this.toast.warning(res.message); 
        }     
        this.spinner.hide();
    } catch (error) {
        this.spinner.hide();
        this.utils.catchResponse(error);
    }
}
  

  async equipmentdetailsGridList(): Promise<void> {    
      try {
          this.BMCUEquipmentList = []
          const obj = { 
                      TYPE: "6",
                      BMCU:this.BMCUID,
                      DISTRICT:this.Districtid
                       } ; 
           
          this.spinner.show(); 
          const res = await this.OfficeModuleAPI.TechnisianDetails_Select(obj);
          if( res.success )
          {
            if ( res.result.length != 0 ) {
              this.spinner.hide();
              this.BMCUEquipmentList = res.result;
              this.rerender();
              for (let i = 0; i < this.BMCUEquipmentList.length; i++) { 
                  let singleRow = {
                                    S_No: i + 1, 
                                    DISTRICT: this.BMCUEquipmentList[i].DISTRICT_NAME,
                                    BMCU: this.BMCUEquipmentList[i].BMCU_NAME,
                                    EQUIPMENT: this.BMCUEquipmentList[i].EQUIPMENT_NAME,
                                    INVOICENo: this.BMCUEquipmentList[i].INVOICE_NUMBER,
                                    MAKE: this.BMCUEquipmentList[i].DEVICE_MAKER,
                                    InstallationDate: this.BMCUEquipmentList[i].MANUFACTURE_DATE,
                                    CAPACITY: this.BMCUEquipmentList[i].CAPACITY_VALUE,
                                    SERIALNo: this.BMCUEquipmentList[i].SERIAL_NUMBER,
                                    CALIBRATIONSTATUS: this.BMCUEquipmentList[i].CALIBRATION_STATUS,   
                                    INSTALLATIONSTATUS :this.BMCUEquipmentList[i].INSTALLATION_STATUS                               

                                  }
                  this.excelData.push(singleRow);
              }
          }
          else{ this.BMCUEquipmentList = []
            this.spinner.show();
            this.toast.warning("No Data Available to Show !!!");
            this.spinner.hide();
        }
      }
         else {
              this.spinner.hide();
              this.toast.warning(res.message);
          } 
         
      } catch (error) {
          this.spinner.hide();
          this.utils.catchResponse(error);
      }
  } 
 

async bmcudetails(): Promise<void> {
  try {debugger;
    this.Bmculist =[];
      const reqdistrict = {
                TYPE: 11,  
                DISTRICT:this.Districtid,
              };
      const res = await this.OfficeModuleAPI.TechnisianDistricts(reqdistrict); 
      if (res.success) {
          this.Bmculist = res.result; 
          return;

      } else {
          this.toast.warning("Details Not Found"); 
      }
      this.spinner.hide();
  } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
  }
}
 
async btnAllPdf(pdf): Promise<void> {
  try {  
    this.spinner.show();
    const res = await this.utils.EQUIPMENT_DETAILSFileDownload(pdf);
        if (res.success) {
          this.utils.viewEQUIPMENTImage(res.result); 
        } else {
          this.toast.warning(res.message);
        }
    this.spinner.hide();
  } catch (error) {
    this.spinner.hide();
    this.utils.catchResponse(error);
  }
}
btnExcel(): void {

  if ( this.Districtid === '' ||  this.Districtid === null ||  this.Districtid === undefined    ) 
  {    this.toast.warning('Please Select District');      this.Districtid=this.Districtid.focus;      return ;    }

  if ( this.BMCUID === '' ||  this.BMCUID === null ||  this.BMCUID === undefined    ) 
  {    this.toast.warning('Please Select BMCU');      this.BMCUID=this.BMCUID.focus;      return ;    }



    this.utils.JSONToCSVConvertor(
        this.excelData,
        'BMCU Equipment Report',
        true
    );


} 
  ngOnDestroy(): void {
//     // Do not forget to unsubscribe the event
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