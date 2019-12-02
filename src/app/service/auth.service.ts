import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isAuthorized(): boolean {
    const authInfo = sessionStorage.getItem('access_token');
    const isAuth = authInfo ? true : false;
    return isAuth;
  }
}
