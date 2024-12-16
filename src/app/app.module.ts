import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ServiceWorkerModule } from '@angular/service-worker';
import { DataTablesModule } from 'angular-datatables';
import { secureInterceptor } from './secure.interceptor';
// import { GlobalErrorHandler } from './global-error-handler';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
 
 
 
 
 
 
@NgModule({
  declarations: [ AppComponent ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    NgxSpinnerModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BsDatepickerModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: secureInterceptor,
      multi: true
    }
    // {
    //   provide: ErrorHandler,
    //   useClass: GlobalErrorHandler,
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
