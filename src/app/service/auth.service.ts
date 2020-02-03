import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isAdminAuthorized(): boolean {
    const authInfo = sessionStorage.getItem('access_token');
    const isAuth = authInfo ? true : false;
    return isAuth;
  }
  isUserAuthorized():boolean{
    const authInfo=localStorage.getItem('userToken');
    const isAuth=authInfo? true : false;
    return isAuth
  }
  isPaymentAuthrized(url):boolean{
    if(url.localeCompare('/paymentresult')==0){
      return false
    }
    return true
    
  }
}
