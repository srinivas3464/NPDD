import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry } from 'rxjs/operators';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Injectable({
  providedIn: 'root'
})
export class OfficeserviceService { 
          dairyapp = '';          baseURL='';          officemenu='';          offtenderdetailsURL ='';
          techurl='';             offbudgetURL='';     officeQuotURL='';       officeapprovalsURL='';
          farmerdatapushurl='';officeScheduleAttendanceurl='';

  constructor(private httpClient: HttpClient, private utils: UtilsService) {     
      this.dairyapp = utils.baseUrl() + 'api/officeModule/';
      this.officemenu = utils.baseUrl() + 'api/officemenu/';   
      this.offtenderdetailsURL = utils.baseUrl() + 'api/OffTenderDetailsModule/';
      this.offbudgetURL = utils.baseUrl() + 'api/officeBudget/';
      this.officeQuotURL = utils.baseUrl() + 'api/officeQuotation/';
      this.officeapprovalsURL = utils.baseUrl() + 'api/officeApproval/';
      this.techurl = utils.baseUrl() + 'api/TechnicianDetails/';
      this.farmerdatapushurl=utils.baseUrl()+'api/FarmerDataPush/';

      this.officeScheduleAttendanceurl=utils.baseUrl()+'api/officeScheduleAttendance/';



// this.baseURL = utils.AdminUrl() + 'api/farmerModule/';
  }

  public tenderdetails(req): Promise<any> {
    const result: any = this.httpClient
        .post(
            `${this.offtenderdetailsURL}TrenderDetails`,
            req,
            this.utils.getPostHttpOptionstoken()//getPostHttpOptions
        )
        .pipe(retry(this.utils.env.API_RETRY_COUNT))
        .toPromise();
    return result;
}


public vendormonthlyprocess(req): Promise<any> {
  const result: any = this.httpClient
      .post(
          `${this.officeScheduleAttendanceurl}vendormonthlyprocess`,
          req,
          this.utils.getPostHttpOptionstoken()//getPostHttpOptions
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
  return result;
}





public Commercialdetails(req): Promise<any> {
    const result: any = this.httpClient
        .post(
            `${this.offtenderdetailsURL}TrenderCommercialStageDetailsList`,
            req,
            this.utils.getPostHttpOptionstoken()//getPostHttpOptions()
        )
        .pipe(retry(this.utils.env.API_RETRY_COUNT))
        .toPromise();
    return result;
}


 
public Commstage_select(req): Promise<any> {
  const result: any = this.httpClient
      .post(
          `${this.offtenderdetailsURL}Commstage_select`,
          req,
          this.utils.getPostHttpOptionstoken()//getPostHttpOptions
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
  return result;
}
public TrenderDetails_select(req): Promise<any> {
  const result: any = this.httpClient
      .post(
          `${this.offtenderdetailsURL}TrenderDetails_select`,
          req,
          this.utils.getPostHttpOptionstoken()//getPostHttpOptions() //getPostHttpOptions  
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
  return result;
}
public Reverseauction_select(req): Promise<any> {
  const result: any = this.httpClient
      .post(
          `${this.offtenderdetailsURL}Reverseauction_select`,
          req,
          this.utils.getPostHttpOptionstoken()//getPostHttpOptions
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
  return result;
}

public Tendersaction_select(req): Promise<any> {
  const result: any = this.httpClient
      .post(
          `${this.offtenderdetailsURL}Tendersaction_select`,
          req,
          this.utils.getPostHttpOptionstoken()//getPostHttpOptions
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
  return result;
}

public Emdrefund_select(req): Promise<any> {
  const result: any = this.httpClient
      .post(
          `${this.offtenderdetailsURL}Emdrefund_select`,
          req,
          this.utils.getPostHttpOptionstoken()//getPostHttpOptions
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
  return result;
}

  public office_po_select(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.dairyapp}office_po_select`,
        req,
        this.utils.getPostHttpOptionstoken()//getPostHttpOptions
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  
  public TenderSubNames(req): Promise<any> {
    const result: any = this.httpClient
        .post(
            `${this.offtenderdetailsURL}TenderNameOftheParticipatesSub`,
            req,
            this.utils.getPostHttpOptionstoken()//getPostHttpOptions()
        )
        .pipe(retry(this.utils.env.API_RETRY_COUNT))
        .toPromise();
    return result;
}

public TenderNameOftheParticipatesSub(req): Promise<any> {
  const result: any = this.httpClient
      .post(
          `${this.offtenderdetailsURL}TenderNameOftheParticipatesSub`,
          req,
          this.utils.getPostHttpOptionstoken()//getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
  return result;
}

public TenderSubComponent(req): Promise<any> {
    const result: any = this.httpClient
        .post(
            `${this.offtenderdetailsURL}TenderSubComponentsSub`,
            req,
            this.utils.getPostHttpOptionstoken()//getPostHttpOptions()
        )
        .pipe(retry(this.utils.env.API_RETRY_COUNT))
        .toPromise();
    return result;
}
  
  
  public office_TenderPayment_Sub(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.offtenderdetailsURL}office_TenderPayment_Sub`,
        req,
        this.utils.getPostHttpOptionstoken()//getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public office_Tenderdetails_select(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.offtenderdetailsURL}office_Tenderdetails_select`,
        req,
        this.utils.getPostHttpOptionstoken()//getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public officemenu_Submition(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.officemenu}officemenu_Submition`,
        req,
        this.utils.getPostHttpOptionstoken()//getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }



 public officereport3(req): Promise<any> {
  const result: any = this.httpClient
    .post(
      `${this.officemenu}officereport3`,
      req,
      this.utils.getPostHttpOptionstoken()//getPostHttpOptions()
    )
    .pipe(retry(this.utils.env.API_RETRY_COUNT))
    .toPromise();
  return result;
}
 public officereport2(req): Promise<any> {
  const result: any = this.httpClient
    .post(
      `${this.officemenu}officereport2`,
      req,
      this.utils.getPostHttpOptionstoken()//getPostHttpOptions()
    )
    .pipe(retry(this.utils.env.API_RETRY_COUNT))
    .toPromise();
  return result;
}
 public officereport1(req): Promise<any> {
  const result: any = this.httpClient
    .post(
      `${this.officemenu}officereport1`,
      req,
      this.utils.getPostHttpOptionstoken()//getPostHttpOptions()
    )
    .pipe(retry(this.utils.env.API_RETRY_COUNT))
    .toPromise();
  return result;
}

 public officemenu3(req): Promise<any> {
  const result: any = this.httpClient
    .post(
      `${this.officemenu}officemenu3`,
      req,
      this.utils.getPostHttpOptionstoken()//getPostHttpOptions()
    )
    .pipe(retry(this.utils.env.API_RETRY_COUNT))
    .toPromise();
  return result;
}
 public officemenu2(req): Promise<any> {
  const result: any = this.httpClient
    .post(
      `${this.officemenu}officemenu2`,
      req,
      this.utils.getPostHttpOptionstoken()//getPostHttpOptions()
    )
    .pipe(retry(this.utils.env.API_RETRY_COUNT))
    .toPromise();
  return result;
}


  public officemenu1(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.officemenu}officemenu1`,
        req,
        this.utils.getPostHttpOptionstoken()//getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public officemenu_select(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.officemenu}officemenu_select`,
        req,
        this.utils.getPostHttpOptionstoken()//getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  

  public officeTenderPriceDetailsSub(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.dairyapp}officeTenderPriceDetailsSub`,
        req,
        this.utils.getPostHttpOptionstoken()//getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  public officeSecuDepositSub(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.dairyapp}officeSecuDepositSub`,
        req,
        this.utils.getPostHttpOptionstoken()//getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  
  public officeTenderPriceSelect(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.dairyapp}officeTenderPriceSelect`,
        req,
        this.utils.getPostHttpOptionstoken()//getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public firmdetailsSub(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.dairyapp}firmdetailsSub`,
        req,
        this.utils.getPostHttpOptionstoken()//getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public office_Budget_Sub(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.offbudgetURL}office_Budget_Sub`,
        req,
        this.utils.getPostHttpOptionstoken()//getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }



  public office_Budget_masters_Select(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.offbudgetURL}office_Budget_masters_Select`,
        req,
        this.utils.getPostHttpOptionstoken()//getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }


  public office_Budget_nomination_Select(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.offbudgetURL}office_Budget_nomination_Select`,
        req,
        this.utils.getPostHttpOptionstoken()//getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public office_Budget_Select(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.offbudgetURL}office_Budget_Select`,
        req,
        this.utils.getPostHttpOptionstoken()//getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }


  public searchByIFSC(req): Promise<any> {
    const result: any = this.httpClient
      .post(`${this.dairyapp}searchByIFSC`, req, this.utils.getPostHttpOptionstoken()//getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public tenderdetailsSub(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.dairyapp}tenderdetailsSub`,
        req,
        this.utils.getPostHttpOptionstoken()//getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public officePomasterSub(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.dairyapp}officePomasterSub`,
        req,
        this.utils.getPostHttpOptionstoken()//getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  
  
  public office_Quotion_Sub(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.officeQuotURL}office_Quotion_Sub`,
        req,
        this.utils.getPostHttpOptionstoken()//getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public office_QuotionRequirement_Select(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.officeQuotURL}office_QuotionRequirement_Select`,
        req,
        this.utils.getPostHttpOptionstoken()//getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public office_QuotionRise_Select(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.officeQuotURL}office_QuotionRise_Select`,
        req,
        this.utils.getPostHttpOptionstoken()//getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  
  public office_OffersReceived_Select(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.officeQuotURL}office_OffersReceived_Select`,
        req,
        this.utils.getPostHttpOptionstoken()//getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }


  public office_PaymentTerms_Select(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.officeQuotURL}office_PaymentTerms_Select`,
        req,
        this.utils.getPostHttpOptionstoken()//getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }


  public office_Approvals_Select(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.officeQuotURL}office_Approvals_Select`,
        req,
        this.utils.getPostHttpOptionstoken()//getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }


  
  public tenderdetailsSelect(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.dairyapp}tenderdetailsSelect`,
        req,
        this.utils.getPostHttpOptionstoken()//getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  
  public officeInvoiceReports(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.dairyapp}officeInvoiceReports`,
        req,
        this.utils.getPostHttpOptionstoken()//getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  

  
  public stockEntryMasterSub(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.dairyapp}stockEntryMasterSub`,
        req,
        this.utils.getPostHttpOptionstoken()//getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  
  public officescheduletestingSub(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.dairyapp}officescheduletestingSub`,
        req,
        this.utils.getPostHttpOptionstoken()//getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

   
  public stockEntryReportpdf(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.dairyapp}stockEntryReportpdf`,
        req,
        this.utils.getPostHttpOptionstoken()//getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
    
  public paymentDetailsSub(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.dairyapp}paymentDetailsSub`,
        req,
        this.utils.getPostHttpOptionstoken()//getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  
  public officeInvoicedetailsSub(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.dairyapp}officeInvoicedetailsSub`,
        req,
        this.utils.getPostHttpOptionstoken()//getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  

  public PoqtyupdateSub(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.officeapprovalsURL}PoqtyupdateSub`,
        req,
        this.utils.getPostHttpOptionstoken()//getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  
  public ApprovalDetailsSub(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.officeapprovalsURL}ApprovalDetailsSub`,
        req,
        this.utils.getPostHttpOptionstoken()//getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  public ApprovalDocumentSub(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.officeapprovalsURL}ApprovalDocumentSub`,
        req,
        this.utils.getPostHttpOptionstoken()//getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  
  public ApprovalDetails_Select(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.officeapprovalsURL}ApprovalDetails_Select`,
        req,
        this.utils.getPostHttpOptionstoken()//getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public proceedingDetailsSub(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.dairyapp}proceedingDetailsSub`,
        req,
        this.utils.getPostHttpOptionstoken()//getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }


  public officeBudgetslipSub(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.dairyapp}officeBudgetslipSub`,
        req,
        this.utils.getPostHttpOptionstoken()//getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  

  public officeBudgetslipPrint(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.dairyapp}officeBudgetslipPrint`,
        req,
        this.utils.getPostHttpOptionstoken()//getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }


  
  public officeInvoiceDocumentsSub(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.dairyapp}officeInvoiceDocumentsSub`,
        req,
        this.utils.getPostHttpOptionstoken()//getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }


  public DistrictSelect(req): Promise<any> {
    const result: any = this.httpClient
        .post(
            `${this.officeapprovalsURL}DistrictSelect`,
            req,
            this.utils.getPostHttpOptionstoken()//getPostHttpOptions()  
        )
        .pipe(retry(this.utils.env.API_RETRY_COUNT))
        .toPromise();
    return result;
}
public MandalSelect(req): Promise<any> {
    const result: any = this.httpClient
        .post(
            `${this.officeapprovalsURL}MandalSelect`,
            req,
            this.utils.getPostHttpOptionstoken()//getPostHttpOptions()  
        )
        .pipe(retry(this.utils.env.API_RETRY_COUNT))
        .toPromise();
    return result;
}
public BMCUSelect(req): Promise<any> {
    const result: any = this.httpClient
        .post(
            `${this.officeapprovalsURL}MandalSelect`,
            req,
            this.utils.getPostHttpOptionstoken()//getPostHttpOptions()  
        )
        .pipe(retry(this.utils.env.API_RETRY_COUNT))
        .toPromise();
    return result;
}
public InvoiceSelect(req): Promise<any> {
    const result: any = this.httpClient
        .post(
            `${this.officeapprovalsURL}MandalSelect`,
            req,
            this.utils.getPostHttpOptionstoken()//getPostHttpOptions()  
        )
        .pipe(retry(this.utils.env.API_RETRY_COUNT))
        .toPromise();
    return result;
}
public ApprovalSub(req): Promise<any> {
    const result: any = this.httpClient
        .post(
            `${this.officeapprovalsURL}ApprovalSub`,
            req,
            this.utils.getPostHttpOptionstoken()//getPostHttpOptions()  
        )
        .pipe(retry(this.utils.env.API_RETRY_COUNT))
        .toPromise();
    return result;
}


  public officescheduletestingSelect(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.dairyapp}officescheduletestingSelect`,
        req,
        this.utils.getPostHttpOptionstoken()//getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  


  public PromptFarmerDataPush(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.farmerdatapushurl}PromptFarmerDataPush`,
        req,
        this.utils.getPostHttpOptionstoken()//getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  
  public FarmerDataPush(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.farmerdatapushurl}FarmerDataPush`,
        req,
        this.utils.getPostHttpOptionstoken()//getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }


  

  public AkashGangaFarmerDataPush(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.farmerdatapushurl}AkashGangaFarmerDataPush`,
        req,
        this.utils.getPostHttpOptionstoken()//getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  
  public TechnisianDistricts(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.techurl}TechnisianDistricts`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  
  
  public TechnisianDetails_Select(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.techurl}TechnisianDetails_Select`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

}
