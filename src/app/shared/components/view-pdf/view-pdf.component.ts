import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToasterService } from '../../services/toaster.service';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-view-pdf',
  templateUrl: './view-pdf.component.html',
  styleUrls: ['./view-pdf.component.css'],
})
export class ViewPDFComponent implements OnInit {
  input = '';
  pdf: any = '';
  constructor(
    private spinner: NgxSpinnerService,
    private router: Router,
    private toast: ToasterService,
    private route: ActivatedRoute,
    private utils: UtilsService,
    private sanitizer: DomSanitizer
  ) {
    route.queryParams.subscribe((params) => (this.input = params['request']));
  }

  async ngOnInit(): Promise<void> {
    try {
      this.pdf = '';
      if (this.utils.isEmpty(this.input)) {
        alert('File Not Found');
        this.router.navigate(['/']);
        return;
      }
      const decString = JSON.parse(this.utils.decrypt(this.input));
      if (this.utils.isEmpty(decString)) {
        alert('File Not Found');
        this.router.navigate(['/']);
        return;
      }
      const filePath = decString.FileName;
      if (this.utils.isEmpty(filePath)) {
        alert('File Not Found');
        this.router.navigate(['/']);
        return;
      }
      this.spinner.show();
      const response = await this.utils.DMSFileDownload(filePath);
      this.spinner.hide();
      if (response.success) {
        this.pdf = this.sanitizer.bypassSecurityTrustResourceUrl(
          'data:application/pdf;base64,' + response.result
        );
      } else {
        this.toast.info(response.message);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
}
