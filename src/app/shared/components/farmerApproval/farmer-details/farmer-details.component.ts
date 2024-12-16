import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FarmerService } from 'src/app/shared/services/farmer.service';
import { LoggerService } from 'src/app/shared/services/logger.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-farmer-details',
  templateUrl: './farmer-details.component.html',
  styleUrls: ['./farmer-details.component.css'],
})
export class FarmerDetailsComponent implements OnInit {
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onDetailSub = new EventEmitter<string>();
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onSuccessChange = new EventEmitter<string>();
  input: any;
  @Input() uidNum = '';
  imagePathFlag = '0';
  personDetails: any;
  farmerName: any;
  mobileNo: any;
  districtName: any;
  mandalName: any;
  rbkName: any;
  villageName: any;
  panCard: any;
  bankPinCode: any;
  ifscCode: any;
  bankName: any;
  bankAccLength: any;
  branchName: any;
  micrNo: any;
  insertedBy: any;
  source: any;
  accountNo: any;
  districtId: any;
  mandalId: any;
  rbkId: any;
  villageId: any;
  passBookImg: any;
  updatedBy: any;

  constructor(
    private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private router: Router,
    private farmerAPI: FarmerService,
    private utils: UtilsService,
    private sanitizer: DomSanitizer,
    private logger: LoggerService,
    private session: SessionService,
    private route: ActivatedRoute
  ) {
    route.queryParams.subscribe((params) => (this.input = params['request']));
  }

  ngOnInit(): void {
    if(this.session.uniqueId !="" && this.session.desigId != ''){

    }
    else
    {
      this.router.navigate(['/shared/UnAuthorized']);
    }
    const decString = JSON.parse(this.utils.decrypt(this.input));
    this.uidNum = decString.UID_NUM;
    this.loadPersonDetails();
  }

  async loadPersonDetails(): Promise<void> {
    try {
      const req = {
        uidNum: this.uidNum,
      };
      this.spinner.show();
      const result = await this.farmerAPI.vvFarmerDetailsByUid(req);

      if (result) {
        this.personDetails = result.result[0];
        if (
          this.personDetails.PASSBOOK_IMG !== null &&
          this.personDetails.PASSBOOK_IMG !== undefined &&
          this.personDetails.PASSBOOK_IMG !== ''
        ) {
          this.loadBankImage(this.personDetails.PASSBOOK_IMG);
        }
        this.farmerName = this.personDetails.FARMER_NAME;
        this.mobileNo = this.personDetails.MOBILE_NUMBER;
        this.districtName = this.personDetails.DISTRICT;
        this.mandalName = this.personDetails.MANDAL_NAME;
        this.rbkName = this.personDetails.RBK_NAME;
        this.villageName = this.personDetails.VILLAGE_NAME;
        this.panCard = this.personDetails.PAN_CARD;
        this.bankPinCode = this.personDetails.BANK_PINCODE;
        this.uidNum = this.personDetails.UID_NUM;
        this.bankName = this.personDetails.BANK_NAME;
        this.branchName = this.personDetails.BANK_BRANCH;
        this.accountNo = this.personDetails.ACCOUNT_NUMBER;
        this.ifscCode = this.personDetails.IFSC_CODE;
        this.districtId = this.personDetails.DIST_CODE;
        this.mandalId = this.personDetails.MANDAL_CODE;
        this.rbkId = this.personDetails.RBK_CODE;
        this.villageId = this.personDetails.VILLAGE_CODE;
      } else {
        this.toast.info(result.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async btnVerifyIfscCode(): Promise<void> {
    try {
      if (
        this.accountNo === '' ||
        this.accountNo === null ||
        this.accountNo === undefined
      ) {
        this.toast.warning('Please Enter Bank Account Number');
        return;
      }

      if (
        this.ifscCode === '' ||
        this.ifscCode === null ||
        this.ifscCode === undefined
      ) {
        this.toast.warning('Please Enter IFSC CODE');
        return;
      }

      this.ifscCode = this.ifscCode;
      this.bankName = '';
      this.branchName = '';
      this.accountNo = '';
      this.bankPinCode = '';
      this.passBookImg = '';

      const req = {
        ifscCode: this.ifscCode,
      };
      this.spinner.show();
      const response = await this.farmerAPI.searchByIFSC(req);
      if (response.success) {
        let count = 0;
        for (let i = 0; i < response.result.length; i++) {
          if (
            this.accountNo.length.toString() ===
            response.result[i].ACCOUNTLENGTH
          ) {
            this.bankName = response.result[i].BANK;
            this.branchName = response.result[i].BRANCH;
            this.bankAccLength = response.result[i].ACCOUNTLENGTH;
            this.micrNo = response.result[i].MICR_CODE;
            count++;
            break;
          }
        }
        if (count < 1) {
          this.toast.info('Invalid bank account number for entered IFSC Code');
        }
      } else {
        this.toast.info(response.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async btnFarmerUpdate(recordStatus): Promise<void> {
    try {
      if (!this.mobileNo) {
        this.toast.warning('Please Enter Mobile Number');
        return;
      }
      if (!this.utils.mobileNumCheck(this.mobileNo)) {
        this.toast.warning('Please Enter Valid  Mobile Number');
        return;
      }

      if (
        this.accountNo === '' ||
        this.accountNo === null ||
        this.accountNo === undefined
      ) {
        this.toast.warning('Please Enter Bank Account Number');
        return;
      }
      if (
        this.ifscCode === '' ||
        this.ifscCode === null ||
        this.ifscCode === undefined
      ) {
        this.toast.warning('Please Enter IFSC CODE');
        return;
      }
      if (
        this.bankPinCode === '' ||
        this.bankPinCode === null ||
        this.bankPinCode === undefined
      ) {
        this.toast.warning('Please Bank PinCode Is Not Available');
        return;
      }
      if (
        this.passBookImg === '' ||
        this.passBookImg === null ||
        this.passBookImg === undefined
      ) {
        this.toast.warning('Please Upload Bank Passbook Image');
        return;
      }

      const req = {
        status: recordStatus,
        uidNum: this.uidNum,
        imagePathFlag: this.imagePathFlag,
        districtId: this.districtId,
        mandalId: this.mandalId,
        rbkId: this.rbkId,
        villageId: this.villageId,
        citizenName: this.farmerName,
        mobileNum: this.mobileNo,
        bankPinCode: this.bankPinCode,
        bankName: this.bankName,
        branchName: this.branchName,
        ifscCode: this.ifscCode,
        micrNo: this.micrNo,
        accountNo: this.accountNo,
        panNo: this.panCard,
        source: 'web',
        passBookImg: this.passBookImg,
        insertedBy: this.session.userName,
        updatedBy: this.session.userName,
        isAnimalsAvailable: this.personDetails.IS_ANIMAL_AVAILABLE,
        milkPotentialBuffalo: this.personDetails.MILK_POTENTIAL_BUFFALO,
        milkPotentialCow: this.personDetails.MILK_POTENTIAL_COW,
        noOfBuffaloFemale: this.personDetails.NOOFBUFFALOFEMALE,
        noOfBuffaloMale: this.personDetails.NOOFBUFFALOMALE,
        noOfWhiteCattleFemale: this.personDetails.NOOFWHITECALLTEFEMALE,
        noOfWhiteCattleMale: this.personDetails.NOOFWHITECATTLEMALE,
        noOfMilchAnimalsBuffalo: this.personDetails.NO_OF_MILCH_ANIMALS_BUFFALO,
        noOfMilchAnimalsCow: this.personDetails.NO_OF_MILCH_ANIMALS_COW,
      };
      this.spinner.show();
      const response = await this.farmerAPI.farmerApprovalSub(req);
      if (response.success) {
        alert(response.message);
        this.onSuccessChange.emit();
      } else {
        this.toast.info(response.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async onpassbookImgChange(event): Promise<void> {
    try {
      const res = await this.utils.encodedString(
        event,
        this.utils.fileType.IMAGE,
        this.utils.fileSize.hundredKB
      );
      if (res) {
        this.passBookImg = res.replace('data:image/jpeg;base64,', '');
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }

  btnImage(image): void {
    this.utils.viewImage(image);
    // this.toast.showImage(image);
  }

  async loadBankImage(imagePath: any): Promise<void> {
    try {
      this.spinner.show();
      const res = await this.utils.DMSVolunteerFileDownload(imagePath);
      if (res.success) {
        this.passBookImg = (
          this.sanitizer.bypassSecurityTrustResourceUrl(res.result) as any
        ).changingThisBreaksApplicationSecurity;
      } else {
        this.toast.info(res.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  btnback(): void {
    this.router.navigate(['/mentorModule/FarmerListByVolunteers']);
  }
}
