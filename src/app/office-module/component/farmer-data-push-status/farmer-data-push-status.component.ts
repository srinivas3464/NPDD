import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from "@angular/core";
 
import { NgxSpinnerService } from "ngx-spinner";
 
 
import { LoggerService } from "src/app/shared/services/logger.service";
import { SessionService } from "src/app/shared/services/session.service";
import { ToasterService } from "src/app/shared/services/toaster.service";
import { UtilsService } from "src/app/shared/services/utils.service";
import { OfficeserviceService } from "../../services/officeservice.service";
 
import { Subject } from "rxjs";
import { DataTableDirective } from "angular-datatables/src/angular-datatables.directive";
 

@Component({
  selector: 'app-farmer-data-push-status',
  templateUrl: './farmer-data-push-status.component.html',
  styleUrls: ['./farmer-data-push-status.component.css']
})
export class FarmerDataPushStatusComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective; 
  dtOptions: DataTables.Settings = this.utils.dataTableOptions();
  dtTrigger: Subject<any> = new Subject(); 
    pendtTrigger: Subject<any> = new Subject();

  DataPushType: any;
    SocietyCode: any;
    FarmerCode: any;
    DistrictCode: any
    FarmerDataList: any[] = [];   FarmerDataList1: any[] = [];   FarmerDataListorg: any[] = [];   
    OutPutRes: any;
    IsHideDetails: boolean = false;
    IsResult: boolean = false;
    DistrictList: any;
    SocietyList: any[] = [];
    SocietyType: any;
    Farmer: any;
    isFarmer: boolean = false; 

    constructor(
        private spinner: NgxSpinnerService,
        private toast: ToasterService,
         
         
        private farmerModuleAPI: OfficeserviceService,
        private utils: UtilsService,
        private logger: LoggerService,
        private session: SessionService
    ) { }

    ngOnInit(): void {
        //this.LoadDistricts();
        //this.LoadSocietyCodes();

        this.DistrictCode=0;
        this.SocietyCode=0;



    }

    FarmerDataChange() {
        if (this.Farmer == "1") {
            this.isFarmer = true;
            return;
        }
        else {
            this.isFarmer = false;
            this.FarmerCode = '';
            return;
        }


    }

    async FindData(): Promise<void> {
        try {debugger;
            const value = false;
            if ((this.DistrictCode==undefined)) {
                this.toast.info("Please Select District");
                return;
            }

            if ( (this.SocietyCode==undefined)) {
                this.toast.info("Please Select Society");
                return;
            }
            if (this.utils.isEmpty(this.Farmer)) {
                this.toast.info("Please Select Farmer");
                return;
            }
            if ((this.Farmer == "1")) {
                if (this.utils.isEmpty(this.FarmerCode)) {
                    this.toast.info("Please Select Farmer Code");
                    return;
                }
            }
            if (value) {

            }
            else {
                this.FarmerDataList = [];
                let typeid=1;
                if (this.Farmer == "1")   
                  typeid=0;
debugger;
if (this.Farmer == "0")  this.FarmerCode="0"; 
 

if(this.DataPushType==7)  {

  const req = {

    type: "12",
    districtId: this.DistrictCode,
    societyCode: this.SocietyCode,
    FARMER_CODE: this.FarmerCode,
    DATA_TYPE: typeid,
};

this.spinner.show();  
const res=await this.farmerModuleAPI.FarmerDataPush(req);
// let  res =null;
// if(this.DataPushType==7)                 
//      res = await this.farmerModuleAPI.PromptFarmerDataPush(req);  
// else 
//      res = await this.farmerModuleAPI.AkashGangaFarmerDataPush(req);
if (res.success) {
    // if(this.Farmer=="0")
      this.FarmerDataList = res.result;
    // else{
      let obj = this.FarmerDataList.find(data => data.FARMER_CODE == this.FarmerCode);
                    if (obj != null) {
                        this.FarmerDataList = [];
                        this.FarmerDataList.push(obj);
                      }
                      this.OutPutRes="";   
  // this.FarmerDataList=( res.result.find(data=>data.FARMER_CODE==this.FarmerCode));
  // this.FarmerDataList=this.FarmerDataList;
 //   }
 // this.rerender();
 // this.OutPutRes=res.result[0].Message;
  //console.log(this.FarmerDataList);
  this.IsHideDetails = true;
  this.spinner.hide();
} else {
  this.spinner.hide();

if(res.result.length>0){
  this.OutPutRes=res.result[0].Message;this.IsHideDetails = true;}
else
this.OutPutRes=res.Message;
  this.toast.info(res.Message);
}


}
if(this.DataPushType==8)  {

  const req = {

    type: "11",
    districtId: this.DistrictCode,
    societyCode: this.SocietyCode,
    FARMER_CODE: this.FarmerCode,
    DATA_TYPE: typeid,
};

this.spinner.show();  
const res=await this.farmerModuleAPI.FarmerDataPush(req);
 
//      res = await this.farmerModuleAPI.AkashGangaFarmerDataPush(req);
if (res.success) {
  //  if(this.Farmer=="0")
    this.FarmerDataList = res.result;
  //  else{
      

      let obj = this.FarmerDataList.find(data => data.FARMER_CODE == this.FarmerCode);
      if (obj != null) {
          this.FarmerDataList = [];
          this.FarmerDataList.push(obj);
      }
      this.OutPutRes="";    

  // this.FarmerDataList=( res.result.find(data=>data.FARMER_CODE==this.FarmerCode));
  // this.FarmerDataList=this.FarmerDataList;
  //  }
 // this.rerender();
 // this.OutPutRes=res.result[0].Message;
  //console.log(this.FarmerDataList);
  this.IsHideDetails = true;
  this.spinner.hide();
} else {
  this.spinner.hide();

if(res.result.length>0){
  this.OutPutRes=res.result[0].Message;this.IsHideDetails = true;}
else
this.OutPutRes=res.message; 
  
  this.toast.info(res.message);
}

}
                


                 
              





            }
        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
    }
    get jsonData(): string {
         
        return JSON.stringify(this.FarmerDataList, null, 2);
    }
    async SendFarmerData(): Promise<void> {
        try {
            debugger;
            if (this.utils.isEmpty(this.DistrictCode)) {
                this.toast.info("Please Select District");
                return;
            }
            if (this.utils.isEmpty(this.SocietyCode)) {
                this.toast.info("Please Select Society");
                return;
            }

            if ((this.Farmer == "1")) {
              if (this.utils.isEmpty(this.FarmerCode)) {
                  this.toast.info("Please Select Farmer Code");
                  return;
              }
          }


            if (this.utils.isEmpty(this.Farmer)) {
                this.toast.info("Please Select Farmer");
                return;
            }




            else {

if(this.DataPushType=="7")
{
             if(this.Farmer != "1")  this.FarmerCode="0";

                const req = {
                    type: "12",
                    districtId: this.DistrictCode,
                    societyCode: this.SocietyCode,
                    FARMER_CODE: this.FarmerCode,

                };
                this.spinner.show();
                const res = await this.farmerModuleAPI.PromptFarmerDataPush(req);
                if (res.sucess) {
                    this.spinner.hide();

                    for(let i=0;i<res.result.length;i++)
                    {
                      this.OutPutRes = "SOCIETY CODE="+  res.result[i].VDCS_CODE +   ", FARMER CODE="+  res.result[i].FARMER_CODE +", Message="+ res.result[i].Message   +'\n'+ this.OutPutRes;
                    }
                    



                    //this.FarmerDataList = [];
                    this.IsResult = true;
                    //this.Clear();

                } else {
                    this.spinner.hide();
                    for(let i=0;i<res.result.length;i++)
                    {
                      this.OutPutRes = "SOCIETY CODE="+  res.result[i].VDCS_CODE +   ", FARMER CODE="+  res.result[i].FARMER_CODE +", Message="+ res.result[i].Message   +'\n'+ this.OutPutRes;
                    }
                    
                    this.IsResult = true;
                    //this.Clear();


                }
              }
              if(this.DataPushType=="8")
              {


                if(this.Farmer != "1")  this.FarmerCode="0";

                const req = {
                    type: "11",                    
                    districtId: this.DistrictCode,
                    societyCode: this.SocietyCode,
                    FARMER_CODE: this.FarmerCode,

                };
                this.spinner.show();
                const res = await this.farmerModuleAPI.AkashGangaFarmerDataPush(req);
                if (res.sucess) {
                    this.spinner.hide();
debugger;
 

                    for(let i=0;i<res.result.Data.length;i++)
                    {
                      this.OutPutRes = "Acknowledgement="+  res.result.Data[i].Acknowledgement +   ", FARMER CODE="+  res.result.Data[i].FarmerCode +", Message="+ res.result.Data[i].Message   +'\n'+ this.OutPutRes;
                    } 
                    //this.FarmerDataList = [];
                    this.IsResult = true;
                    //this.Clear();

                } else { debugger;
                    this.spinner.hide();
                    for(let i=0;i<res.result.Data.length;i++)
                    {
                      this.OutPutRes = "Acknowledgement="+  res.result.Data[i].Acknowledgement +   ", FARMER CODE="+  res.result.Data[i].FarmerCode +", Message="+ res.result.Data[i].Message   +'\n'+ this.OutPutRes;
                    }
                    
                    this.IsResult = true;
                    //this.Clear();


                }


              }









            }
        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
    }

    async LoadDistricts(): Promise<void> {
        try {
            this.DistrictList = [];
            const req = {
                type: this.DataPushType 
            };
            this.spinner.show();
            const res = await this.farmerModuleAPI.FarmerDataPush(req);
            if (res.success) {
                this.spinner.hide();
                this.DistrictList = res.result;
                //console.log(this.DistrictList);
                // document.addEventListener("DOMContentLoaded", () => {
                //     const searchInput = document.getElementById("searchInput") as HTMLInputElement;

                //     searchInput.addEventListener("input", () => {
                //         this.LoadSocietyCodes(searchInput.value);
                //     });

                //     this.LoadSocietyCodes(); // Populate the dropdown initially
                // });



            } else {
                this.spinner.hide();
                this.toast.info(res.message);
            }

        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
    }

    async LoadSocietyCodes(searchTerm: string = ""): Promise<void> {
        try {
            debugger
            this.SocietyList = [];
            const req = {
                type: parseInt(this.DataPushType) + 2,
                districtId: this.DistrictCode,

            };
            this.spinner.show();
            const res = await this.farmerModuleAPI.FarmerDataPush(req);
            if (res.success) {
                this.spinner.hide();
                this.SocietyList = res.result;


                // const SocietyCode = document.getElementById("SocietyCode") as HTMLSelectElement;
                // SocietyCode.innerHTML = "";

                // const filteredrbkList = this.SocietyList.filter(SocietyList =>
                //     SocietyList.SOCIETY_NAME.toLowerCase().includes(searchTerm.toLowerCase())
                // );

                // filteredrbkList.forEach(SocietyList => {
                //     const option = document.createElement("option");
                //     option.value = SocietyList.SOCIETY_CODE.toString();
                //     option.text = SocietyList.SOCIETY_NAME;
                //     SocietyCode.add(option);
                // });
                //console.log(this.SocietyList);

            } else {
                this.spinner.hide();
                this.toast.info(res.message);
            }

        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
    }


    Clear() {
        this.DistrictCode = ''
        this.SocietyCode = ''
        this.FarmerCode = ''
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
