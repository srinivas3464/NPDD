import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { FarmerService } from 'src/app/shared/services/farmer.service';
import { LoggerService } from 'src/app/shared/services/logger.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-volunteer-submitted-farmer-list',
  templateUrl: './volunteer-submitted-farmer-list.component.html',
  styleUrls: ['./volunteer-submitted-farmer-list.component.css'],
})
export class VolunteerSubmittedFarmerListComponent
  implements OnInit, OnDestroy, AfterViewInit {
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onVerifyChange = new EventEmitter<string>();

  dashboardDetails: any;
  pendingList: any[];
  headingText = '';
  reportType = '';

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = this.utils.dataTableOptions();
  dtTrigger: Subject<any> = new Subject();

  constructor(
    private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private router: Router,
    private farmerAPI: FarmerService,
    private utils: UtilsService,
    private logger: LoggerService,
    private session: SessionService
  ) {}

  ngOnInit(): void {
    if(this.session.uniqueId !="" && this.session.desigId != ''){

    }
    else
    {
      this.router.navigate(['/shared/UnAuthorized']);
    }
    this.loadDashboardCounts();
  }

  async loadDashboardCounts(): Promise<void> {
    try {
      this.dashboardDetails = '';
      const req = {
        uniqueId: this.session.rbkGroupId
          ? this.session.rbkGroupId
          : this.session.uniqueId,
        role: this.session.desigId,
      };
      this.spinner.show();
      const result = await this.farmerAPI.vvFarmerDashboardCounts(req);
      if (result.success) {
        this.dashboardDetails = result.result[0];
        this.rerender();
      } else {
        this.toast.info(result.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async loadPendingList(): Promise<void> {
    try {
      this.pendingList = [];
      const req = {
        uniqueId: this.session.rbkGroupId
        ? this.session.rbkGroupId
        : this.session.uniqueId,
        role: this.session.desigId,
      };
      this.spinner.show();
      const result = await this.farmerAPI.farmerListByUniqueId(req);
      if (result.success) {
        this.pendingList = result.result;
        this.rerender();
      } else { this.pendingList =null;  this.rerender();
        this.toast.info(result.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async loadCompletedList(): Promise<void> {
    try {
      this.pendingList = [];
      const req = {
        uniqueId: this.session.rbkGroupId
        ? this.session.rbkGroupId
        : this.session.uniqueId,
        role: this.session.desigId,
      };
      this.spinner.show();
      const result = await this.farmerAPI.vvFarmerCompletedList(req);
      if (result.success) {
        this.pendingList = result.result;
        this.rerender();
      } else {this.pendingList =null;  this.rerender();
        this.toast.info(result.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  btnDashboardDetails(id, count): void {
    if (count !== '0') {
      this.reportType = id;
      if (id === '1') {
        this.headingText = 'COMPLETED ';this.pendingList =null;  this.rerender();
        this.loadCompletedList();
      } else if (id === '2') {
        this.headingText = 'PENDING ';this.pendingList =null;  this.rerender();
        this.loadPendingList();
      }
    }
    else
    {this.pendingList =null;  this.rerender();}
  }

  btnVerify(obj): void {
    const encryptedString = this.utils.encrypt(JSON.stringify(obj));
    // this.router.navigate(['/mentorModule/FarmerDetailsByUid'], {
    //   queryParams: { request: encryptedString },
    // });
    this.onVerifyChange.emit(encryptedString);
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
