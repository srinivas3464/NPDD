import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
//import { DcModuleService } from 'src/app/dcModule/services/dc-module.service';
import { LoggerService } from '../../../services/logger.service';
import { SessionService } from '../../../services/session.service';
import { ToasterService } from '../../../services/toaster.service';
import { UtilsService } from '../../../services/utils.service';

@Component({
  selector: 'app-view-issue-details',
  templateUrl: './view-issue-details.component.html',
  styleUrls: ['./view-issue-details.component.css'],
})
export class ViewIssueDetailsComponent implements OnInit {
  @Input() issueId;
  @Output() onIssueClosedChange = new EventEmitter<string>();

  videoPlayer = {
    popUp: false,
    filePath: '',
  };

  input: any;
  issueDetails: any;
  remarks: any;
  issueImage = '';
  documentPdf = '';
  constructor(
    private sanitizer: DomSanitizer,
    private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private router: Router,
    //private servicesApi: DcModuleService,
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
    this.loadIssueDetails();
  }
  async loadIssueDetails(): Promise<void> {
    try {
      const req = {
        issueId: this.issueId,
      };
      this.issueDetails = '';
      this.spinner.show();
      const res =null;// await this.servicesApi.detailsByIssueId(req);

      if (res.success) {
        this.issueDetails = res.result[0];
        if (
          this.issueDetails.ISSUE_IMG !== null &&
          this.issueDetails.ISSUE_IMG !== undefined &&
          this.issueDetails.ISSUE_IMG !== ''
        ) {
          this.issueImage = await this.getBaseFile(this.issueDetails.ISSUE_IMG);
        }
        if (this.issueDetails.DOCUMENT_PATH !== 'NA') {
          this.documentPdf = await this.getBaseFile(
            this.issueDetails.DOCUMENT_PATH
          );
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

  async getBaseFile(path): Promise<string> {
    try {
      if (!this.utils.isEmpty(path)) {
        this.spinner.show();
        const res = await this.utils.DMSFileDownload(path);
        this.spinner.hide();
        if (res.success) {
          return res.result;
        }
      }
      return '';
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  btnImage(image): void {
    this.utils.viewImage(image);
  }

  btnViewPDF(pdfFile): void {
    if (!this.utils.isEmpty(pdfFile)) {
      this.utils.viewPDF(pdfFile);
    } else {
      this.toast.warning('PDF is Not Available');
    }
  }

  async btnUpdateIssueStatus(): Promise<void> {
    try {
      if (
        this.remarks === '' ||
        this.remarks === null ||
        this.remarks === undefined
      ) {
        this.toast.warning('Please Enter Remarks');
        return;
      }

      const req = {
        role: this.session.desigId,
        issueId: this.issueId,
        remarks: this.remarks,
        updatedBy: this.session.userName,
      };
      this.spinner.show();

      const response =null;// await this.servicesApi.openIssueByIssueId(req);
      if (response.success) {
        alert(response.message);
        this.onIssueClosedChange.emit();
      } else {
        this.toast.info(response.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  btnViewVideo(videoFile): void {
    if (!this.utils.isEmpty(videoFile)) {
      this.videoPlayer.filePath =
        this.utils.baseUrl() + 'api/common/getVideo?request=' + videoFile;
      this.videoPlayer.popUp = true;
    } else {
      this.toast.warning('Video is Not Available');
    }
  }
}
