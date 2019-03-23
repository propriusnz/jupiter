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
  indexCategoryId(id:number){
    return this.http.get(this.baseUrl + '/ProductCategories/'+id);
  }

  //type
  indexType(id:number){
    return this.http.get(this.baseUrl + '/ProductTypes/' + id);
  }
  //Carts
  getCarts(){
    return this.http.get(this.baseUrl + '/Carts');
  }
  addCart(newcart:any){
    return this.http.post(this.baseUrl + '/Carts', newcart);
  }

  //cartProd
  addCartProd(cartProdList:any){
    return this.http.post(this.baseUrl + '/CartProds', cartProdList);
  }
  //Contacts
  getContacts(){
    return this.http.get(this.baseUrl + '/Contacts')
  }
  addContacts(contact:any){
    return this.http.post(this.baseUrl + '/Contacts', contact);
  }

  //FAQ
  getFaq(){
    return this.http.get(this.baseUrl + '/Faqs');
  }

}
