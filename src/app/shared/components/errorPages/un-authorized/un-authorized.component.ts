import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-un-authorized',
  templateUrl: './un-authorized.component.html',
  styleUrls: ['./un-authorized.component.css']
})
export class UnAuthorizedComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    sessionStorage.clear();
  }

}
