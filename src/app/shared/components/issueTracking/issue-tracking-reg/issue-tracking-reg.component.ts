import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
//import { FarmerService } from 'src/app/FarmerModule/services/farmer.service';
import { CommonService } from '../../../services/common.service';
import { LoggerService } from '../../../services/logger.service';
import { SessionService } from '../../../services/session.service';
import { ToasterService } from '../../../services/toaster.service';
import { UtilsService } from '../../../services/utils.service';

@Component({
  selector: 'app-issue-tracking-reg',
  templateUrl: './issue-tracking-reg.component.html',
  styleUrls: ['./issue-tracking-reg.component.css'],
})
export class IssueTrackingRegComponent implements OnInit {
  videoFile: File = null;docUpload = '';

  loginType = {
    mentorLogin: false,
    secLogin: false,
    AssistantSec: false,
    functionaryLogin: false,
  };

  @Input() rbkList = [];
  @Input() villageList = [];
  @Input() moduleList = [];
  @ViewChild('issueTrackingImgUpload') issueTrackingImgUpload: ElementRef;
  @ViewChild('videoFile') videoFiles: ElementRef;
  trackingData = {
    issueTitle: '',
    moduleId: '',
    description: '',
    issueImg: '',
    insertedBy: '',
    role: '',
    districtId: '',
    mandalId: '',
    rbkId: '',
    villageId: '',
    issueType: '',
    isFarmerIssue: '',
    farmerId: '',
    docPath: '',
    docTitle: '',
  };
  constructor(
    private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private router: Router,
    private trackingAPI: CommonService,
    private utils: UtilsService,
    private logger: LoggerService,
    private session: SessionService,
    private sanitizer: DomSanitizer,
   // private farmerModule: FarmerService
  ) {}

  ngOnInit(): void {
    if(this.session.uniqueId !="" && this.session.desigId != ''){

    }
    else
    {
      this.router.navigate(['/shared/UnAuthorized']);
    }
    if (this.session.desigId === '101') {
      this.loginType.mentorLogin = true;
    } else if (this.session.desigId === '901') {
      this.loginType.secLogin = true;
    } else if (this.session.desigId === '902') {
      this.loginType.AssistantSec = true;
    } else if (
      this.session.desigId === '501' ||
      this.session.desigId === '502' ||
      this.session.desigId === '503'
    ) {
      this.loginType.functionaryLogin = true;
    }
    if (this.loginType.mentorLogin) {
      this.loadRbkList();
    }
  }

  async loadRbkList(): Promise<void> {
    try {
      const req = {
        uniqueId: this.session.rbkGroupId,
      };
      this.spinner.show();
      const response =null;// await this.farmerModule.rbkListByMentorId(req);
      if (response.success) {
        this.rbkList = response.result;
      } else {
        this.toast.info(response.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
  

  async onRbkChange(): Promise<void> {
    try {
      this.trackingData.villageId = '';
      this.trackingData.issueType = '';
      this.trackingData.moduleId = '';
      this.trackingData.issueTitle = '';
      this.trackingData.isFarmerIssue = '';
      this.trackingData.farmerId = '';
      this.trackingData.description = '';
      this.issueTrackingImgUpload.nativeElement.value = '';
      this.villageList = [];
      if (this.trackingData.rbkId === '') {
        return;
      }

      let mentorId = '';
      if (
        this.session.rbkGroupId === '' ||
        this.session.rbkGroupId === undefined ||
        this.session.rbkGroupId === null
      ) {
        mentorId = '1';
      } else {
        mentorId = this.session.rbkGroupId;
      }
      const req = {
        districtId: this.session.districtId,
        rbkId: this.trackingData.rbkId,
        uniqueId: mentorId,
      };
      this.spinner.show();
      const response =null;// await this.farmerModule.villageListByRbkId(req);
      if (response.success) {
        this.villageList = response.result;
      } else {
        this.toast.info(response.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  onVillageChange(): void {
    this.trackingData.issueType = '';
    this.trackingData.moduleId = '';
    this.trackingData.issueTitle = '';
    this.trackingData.isFarmerIssue = '';
    this.trackingData.farmerId = '';
    this.trackingData.description = '';
    this.issueTrackingImgUpload.nativeElement.value = '';
  }

  onIssueTypeChange(): void {
    if (this.trackingData.issueType === '') {
      return;
    }
    this.trackingData.isFarmerIssue = '';
    this.trackingData.farmerId = '';
    this.trackingData.issueTitle = '';
    this.trackingData.description = '';
    this.issueTrackingImgUpload.nativeElement.value = '';
    this.loadModuleList();
  }

  async loadModuleList(): Promise<void> {
    try {
      const req = {
        issueType: this.trackingData.issueType,
      };
      this.spinner.show();
      const response = await this.trackingAPI.moduleList(req);
      if (response.success) {
        this.moduleList = response.result;
      } else {
        this.toast.info(response.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  onmoduleNameChange(): void {
    this.trackingData.issueTitle = '';
    this.trackingData.isFarmerIssue = '';
    this.trackingData.farmerId = '';
    this.trackingData.description = '';
    this.issueTrackingImgUpload.nativeElement.value = '';
  }

  async btnSubmit(): Promise<void> {
    try {
      if (this.validate()) {
        this.trackingData.role = this.session.desigId;
        this.trackingData.insertedBy = this.session.userName;
        this.trackingData.districtId = this.session.districtId;
        this.trackingData.mandalId = this.session.mandalId;

        this.spinner.show();
        const response = await this.trackingAPI.issueTrackingVideo(
          this.trackingData,
          this.videoFile
        );
        if (response.success) {
          alert(response.message);
          window.location.reload();
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

  async onVideoChange( files: FileList): Promise<void> {
    try {
        
      var res1=files.item(0).name.split('.')
            if(res1.length===2)
            {
              if(res1[1]==='mp4'||res1[1]==='mov'||res1[1]==='webm'||res1[1]==='avi'||res1[1]==='wmv'    )
              {   
                if(files.item(0).size <= 10485760.0) {
                  this.videoFile = files.item(0);
                }
                else
                {   this.videoFiles.nativeElement.value = ''; 
                  this.toast.warning('Please Upload Video files size below 10mb');  
                  return;
                }
                
                } else
                { this.videoFiles.nativeElement.value = ''; 
                 
                   
                this.toast.warning('Please Upload Video files only');  
                  return;
                }
          }
          else
          {  this.videoFiles.nativeElement.value = ''; 
            this.toast.warning('Please Upload Video files only'); 
            return;
          }
    } catch (error) { this.videoFiles.nativeElement.value = ''; 
    this.toast.warning('Please Upload Video files only'); 
      return;//this.utils.catchResponse(error);
    }
  }
   

  async onIssueTrackingImageChange(event): Promise<void> {
    try {
       
      const element = event.currentTarget as HTMLInputElement;
        let fileList: FileList | null = element.files;
      // if (fileList) {
      //   console.log("FileUpload -> files", fileList);
      // }
      if(element.files[0].name.split('.').length.toString()!=='2')      
      { this.toast.warning('Please Upload image files only');  
    //  c this.trackingData.issueImg ='';this.docUpload='';
    //   doument.getElementById('issueTrackingImgUpload').style.display='';
      event.target.value = '';
    return;
      }else{

      const res = await this.utils.encodedString(
        event,
        this.utils.fileType.IMAGE,
        this.utils.fileSize.hundredKB
      );
      if (res) {
        this.trackingData.issueImg = res.replace('data:image/jpeg;base64,', '');
      }
    }
    } catch (error) {
      return;//this.utils.catchResponse(error);
    }
  }

  
  async onIssueTrackingpdfChange(event): Promise<void> {
    try {
       
      const element = event.currentTarget as HTMLInputElement;
        let fileList: FileList | null = element.files;
      // if (fileList) {
      //   console.log("FileUpload -> files", fileList);
      // }
      if(element.files[0].name.split('.').length.toString()!=='2')      
      { this.toast.warning('Please Upload pdf files only');  
    
      event.target.value = '';
    return;
      }else{

      const res = await this.utils.encodedString(
        event,
        this.utils.fileType.PDF,
        this.utils.fileSize.oneMB
      );
      if (res) {
        this.trackingData.issueImg = res.replace('data:application/pdf;base64,', '');
      }
    }
    } catch (error) {
      return;//this.utils.catchResponse(error);
    }
  }
  validate(): boolean {
    if (this.utils.isEmpty(this.trackingData.rbkId)) {
      this.toast.warning('Please Select RBK ');
      return false;
    }
    if (this.utils.isEmpty(this.trackingData.villageId)) {
      this.toast.warning('Please Select Village ');
      return false;
    }
    if (this.utils.isEmpty(this.trackingData.issueType)) {
      this.toast.warning('Please Select Issue Type ');
      return false;
    }
    if (this.utils.isEmpty(this.trackingData.moduleId)) {
      this.toast.warning('Please Select Module Name');
      return false;
    }
    if (this.trackingData.issueType === '1') {
      if (this.utils.isEmpty(this.trackingData.isFarmerIssue)) {
        this.toast.warning('Please Select Farmer Issue ');
        return false;
      }
    }

    if (this.trackingData.isFarmerIssue === '1') {
      if (this.utils.isEmpty(this.trackingData.farmerId)) {
        this.toast.warning('Please Enter Farmer ID ');
        return false;
      }
    }
    if (this.utils.isEmpty(this.trackingData.issueTitle)) {
      this.toast.warning('Please Enter Issue Title');
      return false;
    }

    if (this.utils.isEmpty(this.trackingData.description)) {
      this.toast.warning('Please Enter Description');
      return false;
    }

    if (this.utils.isEmpty(this.trackingData.issueImg)) {
      this.toast.warning('Please Upload Issue Tracking Image');
      return false;
    }

    if (this.utils.isEmpty(this.trackingData.docTitle)) {
      this.toast.warning('Please Enter Document Title');
      return false;
    }

    if (this.utils.isEmpty(this.trackingData.docPath)) {
      this.toast.warning('Please Upload Document');
      return false;
    }

    if (!this.videoFile) {
      this.toast.warning('Please Upload Video');
      return false;
    }

    return true;
  }
 

  async onDocChange(event): Promise<void> {
    try {
      const res = await this.utils.encodedString(
        event,
        this.utils.fileType.PDF,
        this.utils.fileSize.oneMB
      );
      if (res) {
        const doc = (this.sanitizer.bypassSecurityTrustResourceUrl(res) as any)
          .changingThisBreaksApplicationSecurity;
        this.trackingData.docPath = doc.replace(
          'data:application/pdf;base64,',
          ''
        );
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }
}
