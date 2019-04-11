import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import {HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { isPlatformBrowser } from '@angular/common';
import { ReturnStatement } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  httpHeader1:HttpHeaders;
  baseUrl = environment.baseUrl;

constructor( 
  @Inject(PLATFORM_ID) private platformId,
  private http: HttpClient
  ){
    if (isPlatformBrowser(this.platformId)){
      this.httpHeader1= new HttpHeaders({'Authorization': "Bearer "+sessionStorage.getItem('access_token')});
    }
   }

  //!Products
  showProduct(id:number){
    return this.http.get(this.baseUrl + '/Products/' + id);
  }
  getSpecialProduct(){
    return this.http.get(this.baseUrl + '/Products/GetSpecialProduct');
  }
  updateProduct(id, newProduct){
    return this.http.put(this.baseUrl + '/Products/' + id, newProduct, { headers: this.httpHeader1 });
  }
  addProduct(newProduct){
    return this.http.post(this.baseUrl + '/Products', newProduct, { headers: this.httpHeader1 });
  }
  deleteProduct(id){
    return this.http.delete(this.baseUrl + '/Products/' + id, { headers: this.httpHeader1 });
  }
  //!Gallery
  indexGallery(){
    return this.http.get(this.baseUrl + '/projects');
  }
  updateGallery(id, newGallery){
    return this.http.put(this.baseUrl + '/projects/' + id, newGallery, { headers: this.httpHeader1 });
  }
  addGallery(newGallery){
    return this.http.post(this.baseUrl + '/projects', newGallery, { headers: this.httpHeader1 });
  }
  deleteGallery(id){
    return this.http.delete(this.baseUrl + '/projects/' + id, { headers: this.httpHeader1 });
  }
  //!Category
  indexCategory(){
    return this.http.get(this.baseUrl + '/ProductCategories');
  }
  indexCategoryId(id:number){
    return this.http.get(this.baseUrl + '/ProductCategories/'+id);
  }
  //!Product Type
  indexType(id:number){
    return this.http.get(this.baseUrl + '/ProductTypes/' + id);
  }
  //!Carts
  getCarts(){
    return this.http.get(this.baseUrl + '/Carts', { headers: this.httpHeader1 });
  }
  addCart(newcart:any){
    return this.http.post(this.baseUrl + '/Carts', newcart);
  }
  updateCart(id, newcart){
    return this.http.put(this.baseUrl + '/Carts?id=' + id, newcart, { headers: this.httpHeader1 });
  }
  deleteCart(id){
    return this.http.delete(this.baseUrl + '/Carts/' + id, { headers: this.httpHeader1 });
  }
  //!cartProd
  getCardProd(id:number){
    return this.http.get(this.baseUrl + '/CartProds/GetCartProdByCart/' + id, { headers: this.httpHeader1 });
  }
  addCartProd(cartProdList:any){
    return this.http.post(this.baseUrl + '/CartProds', cartProdList);
  }
  deleteCartProd(id:number){
    return this.http.delete(this.baseUrl + '/CartProds/' + id, { headers: this.httpHeader1 });
  }
  //!Contacts
  getContacts(){
    return this.http.get(this.baseUrl + '/Contacts')
  }
  addContacts(contact:any){
    return this.http.post(this.baseUrl + '/Contacts', contact);
  }
  updateContacts(id:number, contact){
    return this.http.put(this.baseUrl + '/Contacts/' + id, contact, { headers: this.httpHeader1 });
  }
  //!FAQ
  getFaq(){
    return this.http.get(this.baseUrl + '/Faqs');
  }
  updateFaq(id,faq){
    return this.http.put(this.baseUrl + '/Faqs?id=' + id, faq, { headers: this.httpHeader1 })
  }
  addFaq(faq){
    return this.http.post(this.baseUrl + '/Faqs', faq, { headers: this.httpHeader1 })
  }
  deleteFaq(id){
    return this.http.delete(this.baseUrl +'/Faqs/' + id, { headers: this.httpHeader1 })
  }
  //!contact email
  sendContectEmail(contactEmail){
    return this.http.post(this.baseUrl + '/ContactEmails', contactEmail)
  }
  //!EventType
  getEventType(){
    return this.http.get(this.baseUrl + '/EventTypes')
  }
  //!admin
  login(adminModel){
    return this.http.post(this.baseUrl + '/admins', adminModel)
  }
  getUser(){
    return this.http.get(this.baseUrl + '/admins', { headers: this.httpHeader1 })
  }
  //!images
  addImg(files){
    return this.http.post(this.baseUrl + '/ProductMedias/',files, { headers: this.httpHeader1 })
  }
  getImg(id){
    return this.http.get(this.baseUrl + '/ProductMedias/'+ id)
  }
  deleteImg(id:number){
    return this.http.delete(this.baseUrl + '/ProductMedias/'+ id, { headers: this.httpHeader1 })
  }
}
