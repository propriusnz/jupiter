import { AuthService } from '../service/auth.service';
import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  constructor(public auth: AuthService, public router: Router,  
    @Inject(PLATFORM_ID) private platformId,
    ) {
    
  }
  canActivate(): boolean {
    if(!isPlatformBrowser(this.platformId)){
      return ;
    }
    
    if (!this.auth.isAdminAuthorized()) {
      sessionStorage.removeItem('access_token')
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}