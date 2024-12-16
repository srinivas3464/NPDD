import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { interval } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoggerService } from './shared/services/logger.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], 
}) 
export class AppComponent {  


  noInterNetPopUp = false;

  constructor(public updates: SwUpdate,private logger : LoggerService) {

    let val = 0;
    window.addEventListener('online', () => { 
      if (val === 1) {
        val = 0;
        this.noInterNetPopUp = false;
      }
    });

    window.addEventListener('offline', () => {
      val = 1;
      this.noInterNetPopUp = true;
    });

    // if ('serviceWorker' in navigator && environment.production) {
    //   updates.available.subscribe((event) => {
    //     this.logger.log('update available : ', event);
    //     updates.activateUpdate().then(() => {
    //       document.location.reload();
    //     });
    //   });
    //   updates.checkForUpdate();
    // }

    if (updates.isEnabled) {
      interval(6 * 60 * 60).subscribe(() => updates.checkForUpdate()
        .then(() => console.log('checking for updates')));
    }

    this.checkForUpdates();
    
    updates.activated.subscribe(event => {
      console.log('old version was', event.previous);
      console.log('new version is', event.current);
    });

  }

  checkForUpdates(): void {  
    this.updates.available.subscribe(event => {
      console.log('current version is', event.current);
      console.log('available version is', event.available);
      this.promptUser();
    });
  }

  promptUser(): void {
    console.log('updating to new version');
    this.updates.activateUpdate().then(() => this.updateApp());
  }

  updateApp(){
    document.location.reload();
    console.log("The app is updating right now");
   }


}
