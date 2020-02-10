import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isAdminAuthorized(): boolean {
    const authInfo = sessionStorage.getItem('access_token');
    const isAuth = authInfo ? true : false;
    const authTimeInfo=sessionStorage.getItem('timeStamp')
    const now=new Date().toISOString()
    console.log(authTimeInfo)
    console.log(now)
    if(moment(now).toDate()>moment(authTimeInfo).toDate()){
      return false
    }
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
