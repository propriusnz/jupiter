import { Injectable,Inject } from '@angular/core';
import {HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
baseUrl = environment.baseUrl;

constructor( public http: HttpClient) { }

  indexProduct(){
    return this.http.get(this.baseUrl + '/Product/3');
  }
  indexService(){
    return this.http.get(this.baseUrl + '/Product/1');
  }
  indexPackage(){
    return this.http.get(this.baseUrl + '/Product/2');
  }
}
