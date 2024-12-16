import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-server-unavailable',
  templateUrl: './server-unavailable.component.html',
  styleUrls: ['./server-unavailable.component.css']
})
export class ServerUnavailableComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    sessionStorage.clear();
  }

}
