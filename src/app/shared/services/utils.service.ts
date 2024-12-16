import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ElementRef, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { retry } from 'rxjs/operators';
import * as CryptoJS from '../../../assets/js/crypto-js';
import { MastersService } from './masters.service';
import { SessionService } from 'src/app/shared/services/session.service';
@Injectable({
    providedIn: 'root',
})
export class UtilsService {
    env = {
        prod: 2,
        logger: true,
        API_RETRY_COUNT: 2,
    };

    fileType = {
        PDF: 'PDF',
        IMAGE: 'IMAGE',
        Vedio: 'Vedio',
    };

    fileSize = {
        twentyKB: 20480,
        thirtyKB: 30720,
        hundredKB: 102400,
        twoHundredKB: 204800,
        oneMB: 1024000,
        twoMB: 2048000,
        threeMB: 3145728,
        //tenMB: 1024000,
        fiftyMB: 52428800,
        vediobyes: 10485760,
    };

    constructor(
        private httpClient: HttpClient,
        private router: Router,
        private master: MastersService,
        private session: SessionService
    ) { }

    baseUrl(): string {
        if (this.env.prod === 0) {
            return 'http://localhost:61111/';
        } else if (this.env.prod === 2) {
            return 'https://apiapddcf.ap.gov.in/jpv/';
            //return 'https://apiapddcf.ap.gov.in/';
        }
    }

    // AdminUrl(): string {
    //   return 'https://apiapddcf.ap.gov.in/jpv/';
    // //   return 'https://apiapddcf.ap.gov.in/Admin/';
    // //  return 'http://localhost:61111/';
    // } 
    volunteerUrl(): string {
        return '';
        // //  return 'https://apiapddcf.ap.gov.in/jpvVolunteer/';
    }
    mdssUrl(): string {
        return '';
        //  return 'https://apiapddcf.ap.gov.in/mdss/';
    }
    getFileHttpOptions(): any {
        const httpOptions = {
            headers: new HttpHeaders({
                Authorization: `Bearer ` + this.getToken(),
                antival: this.session.cookie(),
            }),
        };
        return httpOptions;
    }

    getPostHttpOptions(): any {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
        };
        return httpOptions;
    }

    getPostHttpOptionstoken(): any {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: `Bearer ` + this.getToken(),
            }),
        };
        return httpOptions;
    }


    getPostCaptch(): any {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: `Bearer `,
            }),
        };
        return httpOptions;
    }


    getGetHttpOptions(): any {
        const gethttpOptions = {
            headers: new HttpHeaders({
                Authorization: `Bearer ` + this.getToken(),
            }),
        };
        return gethttpOptions;
    }

    getToken(): string {
        let token = '';
        while (token === '') {
            token = sessionStorage.getItem('accessToken');
        }
        return token;
    }

    getTokencaptch(): string {
        let token = '123456';

        return token;
    }
    isEmpty(data: any): boolean {
        if (data === undefined || data === null || data === '') {
            return true;
        }
        const dataType = typeof data;
        if (dataType === 'string') {
            if (data === '') {
                return true;
            }
        } else if (dataType === 'number') {
            if (data === 0) {
                return true;
            }
        }
        return false;
    }

    isNumber(data): boolean {
        if (this.isEmpty(data)) {
            return false;
        }

        const regexPattren = new RegExp('^[0-9]+([.][0-9]+)?$');
        const response = regexPattren.test(data);

        if (response) {
            return true;
        } else {
            return false;
        }
    }

    DataValidationNullorEmptyorUndefined(data: string): boolean {
        if (data === null || data === undefined || data === '' || data === 'null' || data === 'undefined' || data === "''") {
            return true;
        }
        return false;
    }

    isValidDate(data): boolean {
        if (this.isEmpty(data)) {
            return false;
        }

        const regexPattren = new RegExp(
            '^([0]{1}[1-9]{1}|[1-2]{1}[0-9]{1}|[3]{1}[0-1]{1})-([0]{1}[1-9]{1}|[1]{1}[0-2]{1})-[1-2]{1}[0-9]{3}$'
        );
        const response = regexPattren.test(data);

        if (response) {
            return true;
        } else {
            return false;
        }
    }

    pinCodeCheck(data): boolean {
        const regexPattren = new RegExp('^[5]{1}[0-9]{5}$');
        const response = regexPattren.test(data);

        if (response) {
            return true;
        } else {
            return false;
        }
    }

    panCardNoCheck(data): boolean {
        const regexPattren = new RegExp('^[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}$');
        const response = regexPattren.test(data);
        if (response) {
            return true;
        } else {
            return false;
        }
    }

    dateFormatConversion(date): string {
        let result = '';
        const tempVal = date.split('-');
        result = tempVal[2] + '-' + tempVal[1] + '-' + tempVal[0];
        return result;
    }

    updatePassword(role: string): void {
        if (role === '101') {
            const route = '/mentorModule';
            const requestData = { routeId: route };
            const encryptedString = this.encrypt(JSON.stringify(requestData));
            this.router.navigate(['/shared/PasswordUpdate'], {
                queryParams: { request: encryptedString },
            });
        } else if (role === '103') {
            const route = '/ahModule';
            const requestData = { routeId: route };
            const encryptedString = this.encrypt(JSON.stringify(requestData));
            this.router.navigate(['/shared/PasswordUpdate'], {
                queryParams: { request: encryptedString },
            });
        } else if (role === '201') {
            const route = '/districtModule';
            const requestData = { routeId: route };
            const encryptedString = this.encrypt(JSON.stringify(requestData));
            this.router.navigate(['/shared/PasswordUpdate'], {
                queryParams: { request: encryptedString },
            });
        } else if (role === '202') {
            const route = '/jcModule';
            const requestData = { routeId: route };
            const encryptedString = this.encrypt(JSON.stringify(requestData));
            this.router.navigate(['/shared/PasswordUpdate'], {
                queryParams: { request: encryptedString },
            });
        } else if (role === '203') {
            const route = '/dcModule';
            const requestData = { routeId: route };
            const encryptedString = this.encrypt(JSON.stringify(requestData));
            this.router.navigate(['/shared/PasswordUpdate'], {
                queryParams: { request: encryptedString },
            });
        } else if (role === '601') {
            const route = '/technician';
            const requestData = { routeId: route };
            const encryptedString = this.encrypt(JSON.stringify(requestData));
            this.router.navigate(['/shared/PasswordUpdate'], {
                queryParams: { request: encryptedString },
            });
        } else if (role === '901' || role === '902') {
            const route = '/SecAssModule';
            const requestData = { routeId: route };
            const encryptedString = this.encrypt(JSON.stringify(requestData));
            this.router.navigate(['/shared/PasswordUpdate'], {
                queryParams: { request: encryptedString },
            });
        } else if (role === '204' || role === '207') {
            const route = '/districtHOModule';
            const requestData = { routeId: route };
            const encryptedString = this.encrypt(JSON.stringify(requestData));
            this.router.navigate(['/shared/PasswordUpdate'], {
                queryParams: { request: encryptedString },
            });
        } else if (role === '206') {
            const route = '/collectorModule';
            const requestData = { routeId: route };
            const encryptedString = this.encrypt(JSON.stringify(requestData));
            this.router.navigate(['/shared/PasswordUpdate'], {
                queryParams: { request: encryptedString },
            });
        } else if (role === '1001') {
            const route = '/dlcoModule';
            const requestData = { routeId: route };
            const encryptedString = this.encrypt(JSON.stringify(requestData));
            this.router.navigate(['/shared/PasswordUpdate'], {
                queryParams: { request: encryptedString },
            });
        } else if (role === '1002') {
            const route = '/dcoModule';
            const requestData = { routeId: route };
            const encryptedString = this.encrypt(JSON.stringify(requestData));
            this.router.navigate(['/shared/PasswordUpdate'], {
                queryParams: { request: encryptedString },
            });
        } else if (role === '1003') {
            const route = '/gmModule';
            const requestData = { routeId: route };
            const encryptedString = this.encrypt(JSON.stringify(requestData));
            this.router.navigate(['/shared/PasswordUpdate'], {
                queryParams: { request: encryptedString },
            });
        } else if (role === '1004') {
            const route = '/commissionerModule';
            const requestData = { routeId: route };
            const encryptedString = this.encrypt(JSON.stringify(requestData));
            this.router.navigate(['/shared/PasswordUpdate'], {
                queryParams: { request: encryptedString },
            });
        }
        else if (role === '10') {
            const route = '/officeModule';
            const requestData = { routeId: route };
            const encryptedString = this.encrypt(JSON.stringify(requestData));
            this.router.navigate(['/shared/PasswordUpdate'], {
                queryParams: { request: encryptedString },
            });
        }


        else if (role === '20') {
            const route = '/projectsModule';
            const requestData = { routeId: route };
            const encryptedString = this.encrypt(JSON.stringify(requestData));
            this.router.navigate(['/shared/PasswordUpdate'], {
                queryParams: { request: encryptedString },
            });
        }

        else if (role === '30') {
            const route = '/qualityModule';
            const requestData = { routeId: route };
            const encryptedString = this.encrypt(JSON.stringify(requestData));
            this.router.navigate(['/shared/PasswordUpdate'], {
                queryParams: { request: encryptedString },
            });
        }


        else if (role === '40') {
            const route = '/civilModule';
            const requestData = { routeId: route };
            const encryptedString = this.encrypt(JSON.stringify(requestData));
            this.router.navigate(['/shared/PasswordUpdate'], {
                queryParams: { request: encryptedString },
            });
        }

        else if (role === '50') {
            const route = '/mechanicalModule';
            const requestData = { routeId: route };
            const encryptedString = this.encrypt(JSON.stringify(requestData));
            this.router.navigate(['/shared/PasswordUpdate'], {
                queryParams: { request: encryptedString },
            });
        }




        else if (role === '60') {
            const route = '/accountsmodule';
            const requestData = { routeId: route };
            const encryptedString = this.encrypt(JSON.stringify(requestData));
            this.router.navigate(['/shared/PasswordUpdate'], {
                queryParams: { request: encryptedString },
            });
        }

        else if (role === '70') {
            const route = '/vendorsModule';
            const requestData = { routeId: route };
            const encryptedString = this.encrypt(JSON.stringify(requestData));
            this.router.navigate(['/shared/PasswordUpdate'], {
                queryParams: { request: encryptedString },
            });
        }

        else if (role === '80') {
            const route = '/DistrictInchargeModule';
            const requestData = { routeId: route };
            const encryptedString = this.encrypt(JSON.stringify(requestData));
            this.router.navigate(['/shared/PasswordUpdate'], {
                queryParams: { request: encryptedString },
            });
        }






    }

    encryptionKeys(): any {
        return {
            key: '7061737323313233',
            iv: '7061737323313233',
        };
    }

    encrypt(input): string {
        const keyVal = CryptoJS.enc.Utf8.parse(this.encryptionKeys().key);
        const ivVal = CryptoJS.enc.Utf8.parse(this.encryptionKeys().iv);
        const encrypted = CryptoJS.AES.encrypt(
            CryptoJS.enc.Utf8.parse(input),
            keyVal,
            {
                keySize: 128 / 8,
                iv: ivVal,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7,
            }
        ).toString();
        return encrypted;
    }




    decrypt(input): string {
        const keyVal = CryptoJS.enc.Utf8.parse(this.encryptionKeys().key);
        const ivVal = CryptoJS.enc.Utf8.parse(this.encryptionKeys().iv);
        const decrypted = CryptoJS.AES.decrypt(input, keyVal, {
            keySize: 128 / 8,
            iv: ivVal,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        }).toString(CryptoJS.enc.Utf8);
        return decrypted;
    }

    dataTableOptions(): any {
        return {
            pagingType: 'full_numbers',
            pageLength: 10,
            lengthMenu: [
                [10, 25, 50, -1],
                [10, 25, 50, 'ALL'],
            ],
        };
    }


     JSONToXLSXConvertor(JSONData, ReportTitle, ShowLabel): void {
    //     //JSONTO EXCEL CONVERTOR
    //     debugger;
      
     //     const workBook = XLSX.utils.book_new(); // create a new blank book
    //     const workSheet = XLSX.utils.json_to_sheet(JSONData);

    //     XLSX.utils.book_append_sheet(workBook, workSheet, 'data'); // add the worksheet to the book
    //     // XLSX.writeFile(workBook, 'temp.xlsx');
    //     const FileName = ReportTitle + ".xlsx"
    //     XLSX.writeFile(workBook, FileName);


      }


    JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel): void {
        // If JSONData is not an object then JSON.parse will parse the JSON string in an Object
        const arrData =
            typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;

        let CSV = 'sep=,' + '\r\n\n';

        // This condition will generate the Label/Header
        if (ShowLabel) {
            let row = '';

            // This loop will extract the label from 1st index of on array
            for (let index in arrData[0]) {
                // Now convert each value to string and comma-seprated
                row += index + ',';
            }

            row = row.slice(0, -1);

            // append Label row with line break
            CSV += row + '\r\n';
        }

        // 1st loop is to extract each row
        for (let i = 0; i < arrData.length; i++) {
            let row = '';

            // 2nd loop will extract each column and convert it in string comma-seprated
            for (let index in arrData[i]) {
                row += '"' + arrData[i][index] + '",';
            }

            row.slice(0, row.length - 1);

            // add a line break after each row
            CSV += row + '\r\n';
        }

        if (CSV == '') {
            alert('Invalid data');
            return;
        }

        // Generate a file name
        let fileName = '';
        // this will remove the blank-spaces from the title and replace it with an underscore
        fileName += ReportTitle.replace(/ /g, '_');

        // Initialize file format you want csv or xls
        const uri = 'data:text/csv;charset=utf-8,' + escape(CSV);

        // Now the little tricky part.
        // you can use either>> window.open(uri);
        // but this will not work in some browsers
        // or you will not get the correct file extension

        // this trick will generate a temp <a /> tag
        const link = document.createElement('a');
        link.href = uri;

        // set the visibility hidden so it will not effect on your web-layout

        // link.style = 'visibility:hidden';
        link.download = fileName + '.csv';

        // this part will append the anchor tag and remove it after automatic click
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    catchResponse(error: any): void {
        console.log(error);
        if (error.status === 401) {
            sessionStorage.clear();
            this.router.navigate(['/shared/UnAuthorized']);
        } else if (error.status === 403) {
            sessionStorage.clear();
            this.router.navigate(['/shared/UnAuthorized']);
        } else if (error.status >= 500 && error.status < 600) {
            sessionStorage.clear();
            this.router.navigate(['/shared/ServerUnavailable']);
        } else {
            alert(error.statusText);
        }
    }

    getRandomId(): string {
        return Math.random().toString().slice(2, 12);
    }


    encodedString(event: any, fileType: string, size: number): any {
        return new Promise((resolve, reject) => {

            const element = event.currentTarget as HTMLInputElement;
            let fileList: FileList | null = element.files;

            if (element.files[0].name.split('.').length.toString() !== '2') {
                alert('Invalid File Format !!!');

                event.target.value = '';

            } else {

                if (event.target.files.length > 0) {
                    if (
                        event.target.files[0].type === 'image/jpeg' &&
                        fileType === this.fileType.IMAGE
                    ) {
                        if (event.target.files[0].size < size) {
                            const file: File = event.target.files[0];
                            const reader = new FileReader();
                            reader.readAsDataURL(file);
                            reader.onload = () => resolve(reader.result);
                            reader.onerror = (error) => reject(error);
                        } else {
                            alert('Uploaded image must be less than 100KB');
                            event.target.value = '';
                        }
                    } else if (
                        event.target.files[0].type === 'application/pdf' &&
                        fileType === this.fileType.PDF
                    ) {
                        if (event.target.files[0].size < size) {
                            const file: File = event.target.files[0];
                            const reader = new FileReader();
                            reader.readAsDataURL(file);
                            reader.onload = () => resolve(reader.result);
                            reader.onerror = (error) => reject(error);
                        } else {
                            alert('Uploaded file must be less than 1MB');
                            event.target.value = '';
                        }
                    } else {
                        alert('Invalid File Format !!!');
                        event.target.value = '';
                    }
                } else {
                    alert('file is Empty !!!, Please try again.');
                    event.target.value = '';
                }
            }
        });
    }

    downloadPdfFile(input, fileName): void {
        const linkSource = `data:application/pdf;base64,${input}`;
        const downloadLink = document.createElement('a');
        fileName = fileName + '.pdf';
        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();
    }


    viewPDF(input): void {
        //var input=input.replace("'","");
        debugger;
        let pdfWindow = window.open('', '_blank');
        pdfWindow.document.write(
            `<iframe width='100%' height='100%' src='data:application/pdf;base64, ${encodeURI(
                input
            )}'></iframe>`
        );

    }
    downloadPdf(base64: string, filename: string) {
        const byteArray = new Uint8Array(
            atob(base64)
                .split("")
                .map(char => char.charCodeAt(0))
        );
        const file = new Blob([byteArray], { type: "application/pdf" });
        const fileURL = URL.createObjectURL(file);
        let pdfName = filename + ".pdf";
        // Construct the 'a' element
        let link = document.createElement("a");
        link.download = pdfName;
        link.target = "_blank";

        // Construct the URI
        link.href = fileURL;
        document.body.appendChild(link);
        link.click();

        // Cleanup the DOM
        document.body.removeChild(link);
    }

    viewImage(input): void {
        const image = new Image();
        image.src = 'data:image/jpg;base64,' + input;
        const w = window.open(
            '',
            '_blank',
            'toolbar=yes,scrollbars=yes,resizable=yes,top=200,left=500,width=600,height=400'
        );
        w.document.write(image.outerHTML);
    }

    view_Image(input): void {
        const image = new Image();
        image.src = 'data:image/jpg;base64,' + this.mdssUrl + '\\' + input;
        const w = window.open(
            '',
            '_blank',
            'toolbar=yes,scrollbars=yes,resizable=yes,top=200,left=500,width=600,height=400'
        );
        w.document.write(image.outerHTML);
    }
    view_bankImage(input): void {
        const str = this.mdssUrl + '\\' + input;
        const image = new Image();
        // image.src = 'data:image/jpg;base64,' + str;
        // const w = window.open(
        //   '',
        //   '_blank',
        //   'toolbar=yes,scrollbars=yes,resizable=yes,top=200,left=500,width=600,height=400'
        // );
        // w.document.write(image.outerHTML);
        var windowObjectReference;
        image.src = 'data:image/jpeg;base64,' + this.mdssUrl + '\\' + input;;
        windowObjectReference = window.open(
            '',
            "BANKIMAGE",
            'toolbar=yes,scrollbars=yes,resizable=yes,top=200,left=500,width=600,height=400'
        );
        windowObjectReference.document.write(image.outerHTML);

    }


    mobileNumCheck(data): boolean {
        const response = String(data).match('[6-9]{1}[0-9]{9}');
        if (response) {
            // tslint:disable-next-line: prefer-for-of
            for (let i = 0; i < this.master.invalidNumbers.length; i++) {
                if (data === this.master.invalidNumbers[i]) {
                    return false;
                }
            }
            return true;
        } else {
            return false;
        }
    }

    validatemobileno(num): boolean {
        if (!this.isNumber(num)) {
            return false;
        }

        if (num.length < 10 || num.length > 10) {
            return false;
        }
        if (
            num === '0000000000' ||
            num === '1111111111' ||
            num === '2222222222' ||
            num === '3333333333' ||
            num === '4444444444' ||
            num === '5555555555' ||
            num === '6666666666' ||
            num === '7777777777' ||
            num === '8888888888' ||
            num === '9999999999'
        ) {
            return false;
        }
    }

    validatebankaccount(num): boolean {
        if (!this.isNumber(num)) {
            return false;
        }

        if (num.length < 11) {
            return false;
        }
        if (
            num === '00000000000' ||
            num === '11111111111' ||
            num === '22222222222' ||
            num === '33333333333' ||
            num === '44444444444' ||
            num === '55555555555' ||
            num === '66666666666' ||
            num === '77777777777' ||
            num === '88888888888' ||
            num === '99999999999'
        ) {
            return false;
        }

        const d = [
            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
            [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
            [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
            [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
            [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
            [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
            [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
            [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
            [9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
        ];

        // The permutation table
        const p = [
            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
            [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
            [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
            [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
            [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
            [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
            [7, 0, 4, 6, 9, 1, 3, 2, 5, 8],
        ];

        // The inverse table
        const inv = [0, 4, 3, 2, 1, 5, 6, 7, 8, 9];

        let cc;
        let c = 0;
        const myArray = this.StringToReversedIntArray(num);
        for (let i = 0; i < myArray.length; i++) {
            c = d[c][p[i % 8][myArray[i]]];
        }
        cc = c;
        if (cc === 0) {
            return true;
        } else {
            return false;
        }
    }


    validateVerhoeff(num): boolean {
        if (!this.isNumber(num)) {
            return false;
        }

        if (num.length !== 12) {
            return false;
        }
        if (
            num === '333333333333' ||
            num === '666666666666' ||
            num === '999999999999'
        ) {
            return false;
        }

        const d = [
            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
            [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
            [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
            [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
            [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
            [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
            [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
            [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
            [9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
        ];

        // The permutation table
        const p = [
            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
            [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
            [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
            [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
            [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
            [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
            [7, 0, 4, 6, 9, 1, 3, 2, 5, 8],
        ];

        // The inverse table
        const inv = [0, 4, 3, 2, 1, 5, 6, 7, 8, 9];

        let cc;
        let c = 0;
        const myArray = this.StringToReversedIntArray(num);
        for (let i = 0; i < myArray.length; i++) {
            c = d[c][p[i % 8][myArray[i]]];
        }
        cc = c;
        if (cc === 0) {
            return true;
        } else {
            return false;
        }
    }

    /*
     * Converts a string to a reversed integer array.
     */
    StringToReversedIntArray(num): any {
        let myArray = [num.length];
        for (let i = 0; i < num.length; i++) {
            myArray[i] = num.substring(i, i + 1);
        }
        myArray = this.Reverse(myArray);
        return myArray;
    }

    /*
     * Reverses an int array
     */
    Reverse(myArray): any {
        const reversed = [myArray.length];
        for (let i = 0; i < myArray.length; i++) {
            reversed[i] = myArray[myArray.length - (i + 1)];
        }
        return reversed;
    }


    CommissionerFileDownload(file): any {
        const resp = this.comfileIdToBaseString(file);
        return resp;
    }

    public comfileIdToBaseString(fileId: string) {
        const req = {
            filePath: fileId,
        };
        const url = this.mdssUrl();
        const result: any = this.httpClient
            .post(`${url}api/common/fileDownload`, req, this.getPostHttpOptions())
            .pipe(retry(3))
            .toPromise();
        return result;
    }


    AdminFileDownload(file): any {
        const resp = this.adminfileIdToBaseString(file);
        return resp;
    }

    public adminfileIdToBaseString(fileId: string) {
        const req = {
            filePath: fileId,
        };
        const url = this.baseUrl();
        const result: any = this.httpClient
            .post(`${url}api/common/fileDownload`, req, this.getPostHttpOptions())
            .pipe(retry(3))
            .toPromise();
        return result;
    }

    pdfpageDownload(file): any {
        const url = this.baseUrl();
        window.open(url + file, '_blank');

    }

    DMSFileDownload(file): any {
        const resp = this.fileIdToBaseString(file);
        return resp;
    }

    public fileIdToBaseString(fileId: string) {
        const req = {
            filePath: fileId,
        };
        const url = this.baseUrl();
        const result: any = this.httpClient
            .post(`${url}api/common/fileDownload`, req, this.getPostHttpOptions())
            .pipe(retry(3))
            .toPromise();
        return result;
    }

    DMSVolunteerFileDownload(file): any {
        const resp = this.volunteerFileIdToBaseString(file);
        return resp;
    }

    public volunteerFileIdToBaseString(fileId: string) {
        const req = {
            filePath: fileId,
        };
        const url = this.volunteerUrl();
        const result: any = this.httpClient
            .post(`${url}api/common/fileDownload`, req, this.getPostHttpOptions())
            .pipe(retry(3))
            .toPromise();
        return result;
    }

    MDSSFileDownload(file): any {
        const resp = this.mdssFileIdToBaseString(file);
        return resp;
    }

    public mdssFileIdToBaseString(fileId: string) {
        const req = {
            filePath: fileId,
        };
        const url = this.mdssUrl();
        const result: any = this.httpClient
            .post(`${url}api/common/fileDownload`, req, this.getPostHttpOptions())
            .pipe(retry(3))
            .toPromise();
        return result;
    }


    EQUIPMENT_DETAILSFileDownload(file): any {
        const resp = this.EQUIPMENTDETAILSfileIdToBaseString(file);
        return resp;
    }

    public EQUIPMENTDETAILSfileIdToBaseString(fileId: string) {
        const req = {
            filePath: fileId,
        };
        const url = this.baseUrl();
        const result: any = this.httpClient
            .post(`${url}api/common/fileDownload`, req, this.getPostHttpOptions())
            .pipe(retry(3))
            .toPromise();
        return result;
    }

    viewEQUIPMENTImage(input): void {
        // const str=this.baseUrl+'\\' + input;
        const image = new Image();
        image.src = 'data:image/jpeg;base64,' + input;
        const w = window.open(
            '',
            '_blank',
            'toolbar=yes,scrollbars=yes,resizable=yes,top=200,left=500,width=600,height=400'
        );
        w.document.write(image.outerHTML);
    }
}
