import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  constructor() {}

  info(message: string): void {
    Swal.fire('Information', message, 'info');
  }

  error(message: string): void {
    Swal.fire('error', message, 'error');
  }

  success(message: string): void {
    Swal.fire('info', message, 'success');
  }

  warning(message: string): void {
    Swal.fire('info', message, 'warning');
  }

  question(message: string): void {
    Swal.fire('info', message, 'question');
  }
  //confirm(message: {onOk: () => { console.log('ok') }, onCancel: () => { console.log('cancel')}})

  showImage(image: string): void {
    Swal.fire({
      imageUrl: 'data:image/jpeg;base64,' + image,
      imageWidth: 600,
      imageHeight: 300,
    });
  }
}
