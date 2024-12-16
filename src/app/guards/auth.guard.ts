import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionService } from '../shared/services/session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  
  constructor(
    public router: Router,
    public session : SessionService
  ) {}


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      
    let token = sessionStorage.getItem('accessToken');
    let role = sessionStorage.getItem('desigId');


    if (token === undefined || token === null || token === '') {
      sessionStorage.clear();
      this.router.navigate(['']);
      return false;
    }  
    
    if(route.data.roles.length < 1){
      return true;
    }
    
    if (role === undefined || role === null || role === '') {
      sessionStorage.clear();
      this.router.navigate(['']);
      return false;
    }


    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < route.data.roles.length; i++) {
      if (route.data.roles[i] === role) {
        return true;
      }
    }

    sessionStorage.clear();
    this.router.navigate(['']);
    return false;


  }
  
}
