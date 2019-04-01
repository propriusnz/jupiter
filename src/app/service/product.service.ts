import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import { Injectable,Inject } from '@angular/core';
import {HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  httpHeader1:HttpHeaders;
  baseUrl = environment.baseUrl;

constructor( 
  //@Inject(LOCAL_STORAGE)
  private http: HttpClient
  ){
     this.httpHeader1= new HttpHeaders({'Authorization': "Bearer "+sessionStorage.getItem('access_token')});
   }

  //Products
  showProduct(id:number){
    return this.http.get(this.baseUrl + '/Products/' + id);
  }
  getSpecialProduct(){
    return this.http.get(this.baseUrl + '/Products/GetSpecialProduct');
  }
  //Gallery
  indexGallery(){
    return this.http.get(this.baseUrl + '/projects');
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
  //contact email
  sendContectEmail(contactEmail){
    return this.http.post(this.baseUrl + '/ContactEmails', contactEmail)
  }
  //admin
  login(adminModel){
    return this.http.post(this.baseUrl + '/admins', adminModel)
  }
  getUser(){
    return this.http.get(this.baseUrl + '/admins', { headers: this.httpHeader1 })
  }
}
