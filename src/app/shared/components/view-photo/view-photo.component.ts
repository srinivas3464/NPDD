import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToasterService } from '../../services/toaster.service';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-view-photo',
  templateUrl: './view-photo.component.html',
  styleUrls: ['./view-photo.component.css'],
})
export class ViewPhotoComponent implements OnInit {
  input = '';
  image = '';
  constructor(
    private spinner: NgxSpinnerService,
    private router: Router,
    private toast: ToasterService,
    private route: ActivatedRoute,
    private utils: UtilsService
  ) {
    route.queryParams.subscribe((params) => (this.input = params['request']));
  }

  async ngOnInit(): Promise<void> {
    try {
      this.image = '';
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
        this.image = response.result;
      } else {
        this.toast.info(response.message);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
}
