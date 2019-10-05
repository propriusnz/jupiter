import { AuthService } from '../service/auth.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) { }
  canActivate(): boolean {
    if (!this.auth.isAuthorized()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}