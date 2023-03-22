import { AuthenticationService } from 'src/app/services/authentication.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): boolean {
    const authenticated = this.authenticationService.isAuthenticated();
    if (authenticated) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
