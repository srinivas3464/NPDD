import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { OfficeserviceService } from '../../services/officeservice.service';

@Component({
  selector: 'app-vendormonthlyprocess',
  templateUrl: './vendormonthlyprocess.component.html',
  styleUrls: ['./vendormonthlyprocess.component.css']
})
export class VendormonthlyprocessComponent implements OnInit {
  fromDate: any;
  constructor(private toast: ToasterService,
    private utils: UtilsService,
    private session: SessionService,
    private OfficeModuleAPI: OfficeserviceService,
    private spinner: NgxSpinnerService,
    private router: Router) { }

  ngOnInit(): void {     this.fromDate =  this.session.getTodayDateString(); 
    if (this.session.uniqueId != "" && this.session.desigId != "") {   }
    else { this.router.navigate(['/shared/UnAuthorized']);  }
  }


  async btnLoadReport(): Promise<void> {
    try {

      const obj = {
        TYPE: "1",
        TRANS_DATE: this.fromDate,
        UNIQUEID:this.session.uniqueId,
        ROLE:this.session.desigId,
        INSERTEDBY:this.session.userName
 
    } ;
    debugger;
      this.spinner.show();
              const res = await  this.OfficeModuleAPI.vendormonthlyprocess(obj);
              this.spinner.hide();
              if (res.success) {

                this.toast.warning(res.message);
              }
              else {
                this.spinner.hide();
                this.toast.warning(res.message);

            }
    }
    catch (error) {
        this.spinner.hide();
        this.utils.catchResponse(error);
    }
}
}
 