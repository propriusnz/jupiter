import { Injectable,Inject } from '@angular/core';
import {HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
baseUrl = environment.baseUrl;

constructor( public http: HttpClient) { }

  //Products
  showProduct(id:number){
    return this.http.get(this.baseUrl + '/Products/' + id);
  }

  //Category
  indexCategory(){
    return this.http.get(this.baseUrl + '/ProductCategories');
  }

  //type
  indexType(id:number){
    return this.http.get(this.baseUrl + '/ProductTypes/' + id);
  }
  //Carts
  getCarts(){
    return this.http.get(this.baseUrl + '/Carts');
  }

  //cartProd
  addMultiCartProd(cartProdList){
    return this.http.post(this.baseUrl + '/CartProds', cartProdList);
  }
  //Contacts
  getContacts(){
    return this.http.get(this.baseUrl + '/Contacts')
  }
}
