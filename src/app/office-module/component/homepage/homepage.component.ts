import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/shared/services/session.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  lastLoginTime:any;
  userName:any;
  constructor(private session: SessionService,
    private router: Router ) { }

  ngOnInit(): void {
   

    if(this.session.uniqueId !="" && this.session.desigId != ""){
      this.lastLoginTime=this.session.lastLoginTime; 
      this.userName=this.session.userName;  
    }
    else
    {
      this.router.navigate(['/shared/UnAuthorized']);
    }
  }

}
