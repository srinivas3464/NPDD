import { Injectable } from '@angular/core';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  constructor(private utils: UtilsService) {}

  info(message:any, event: any = null): void {
    if (this.utils.env.logger) {
      if (event !== null && event !== undefined && event !== '') {
        console.info(message, event);
      } else {
        console.info(message);
      }
    }
  }

  error(message: any, event: any = null): void {
    if (this.utils.env.logger) {
      if (event !== null && event !== undefined && event !== '') {
        console.error(message, event);
      } else {
        console.error(message);
      }
    }
  }

  log(message: any, event: any = null): void {
    if (this.utils.env.logger) {
      if (event !== null && event !== undefined && event !== '') {
        console.log(message, event);
      } else {
        console.log(message);
      }
    }
  }

  warning(message: any, event: any = null): void {
    if (this.utils.env.logger) {
      if (event !== null && event !== undefined && event !== '') {
        console.warn(message, event);
      } else {
        console.warn(message);
      }
    }
  }
}
