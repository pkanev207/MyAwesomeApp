import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanLoad,
  Route,
} from '@angular/router';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.isAuth()) {
      return true;
    } else {
      console.log('canActivate works!');
      this.router.navigate(['']);
      return false;
    }
  }

  canLoad(route: Route) {
    if (this.authService.isAuth()) {
      return true;
    } else {
      this.router.navigate(['']);
      console.log('canLoad works!');
      return false;
    }
  }
}
