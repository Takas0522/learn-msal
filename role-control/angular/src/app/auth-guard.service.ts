import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private authService: AppService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const url = state.url;
    const myroles = this.authService.myRole;
    let ret = true;
    if (url.includes('reader')) {
      ret =  myroles.includes('App.Reader');
    }
    if (url.includes('writer')) {
      ret =  myroles.includes('App.Writer');
    }
    if (!ret) {
      console.log('deny')
      this.router.navigate(['access-deny'])
    }
    return ret;
  }
}
