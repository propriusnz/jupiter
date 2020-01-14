import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { isPlatformBrowser } from '@angular/common';
import { ReturnStatement } from '@angular/compiler';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  httpHeader1: HttpHeaders;
  baseUrl = environment.baseUrl;
  isShoppingCartValid = new Subject<any>();
  categoryStatus = new Subject<string>();
  selectedCate: string;
  constructor(
    @Inject(PLATFORM_ID) private platformId,
    private http: HttpClient
  ) {
    // this.httpHeader1= new HttpHeaders({'Authorization': "Bearer " + sessionStorage.getItem('access_token')});
  }

  // !Products
  showProduct(id: number) {
    return this.http.get(this.baseUrl + '/Products/' + id);
  }
  getSpecialProduct() {
    return this.http.get(this.baseUrl + '/Products/GetSpecialProduct');
  }
  updateProduct(id, newProduct) {
    return this.http.put(this.baseUrl + '/Products/' + id, newProduct,
      { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + sessionStorage.getItem('access_token') }) });
  }
  addProduct(newProduct) {
    return this.http.post(this.baseUrl + '/Products', newProduct,
      { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + sessionStorage.getItem('access_token') }) });
  }
  deleteProduct(id: number) {
    return this.http.delete(this.baseUrl + '/Products/' + id,
      { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + sessionStorage.getItem('access_token') }) });
  }
  searchProducts(typeId: number, name: string) {
    return this.http.post(this.baseUrl + '/Products/GetSearchedProduct/' + typeId, name,
      { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + sessionStorage.getItem('access_token') }) });
  }
  calculateTime(hiringtime) {
    return this.http.post(this.baseUrl + '/ProductTime/CalculateTime/', hiringtime);
  }
  // !Gallery
  indexGallery() {
    return this.http.get(this.baseUrl + '/projects');
  }
  getGalleryByType(id: number) {
    return this.http.get(this.baseUrl + '/projects/GetProjectByType/' + id);
  }
  updateGallery(id, newGallery) {
    return this.http.put(this.baseUrl + '/projects/' + id, newGallery,
      { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + sessionStorage.getItem('access_token') }) });
  }
  addGallery(newGallery) {
    return this.http.post(this.baseUrl + '/projects', newGallery,
      { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + sessionStorage.getItem('access_token') }) });
  }
  deleteGallery(id: number) {
    return this.http.delete(this.baseUrl + '/projects/' + id,
      { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + sessionStorage.getItem('access_token') }) });
  }
  // !Category
  // getAllCategories() {
  //   return this.http.get(this.baseUrl + '/ProductCategories');
  // }

  getCategoryByType(id) {
    return this.http.get(this.baseUrl + '/ProductCategories/GetProductCategoriesByType/' + id);
  }
  indexCategoryId(id: number) {
    return this.http.get(this.baseUrl + '/ProductCategories/' + id);
  }
  updateCategory(id: number, cateList) {
    return this.http.put(this.baseUrl + '/ProductCategories/' + id, cateList,
      { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + sessionStorage.getItem('access_token') }) });
  }
  deleteCategory(id: number) {
    return this.http.delete(this.baseUrl + '/ProductCategories/' + id,
      { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + sessionStorage.getItem('access_token') }) });
  }

  // !Product Type

  getProductType() {
    return this.http.get(this.baseUrl + '/ProductTypes');
  }
  indexType(id: number) {
    return this.http.get(this.baseUrl + '/ProductTypes/' + id);
  }
  // !Carts
  getCarts() {
    return this.http.get(this.baseUrl + '/Carts',
      { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + sessionStorage.getItem('access_token') }) });
  }
  addCart(newcart: any) {
    return this.http.post(this.baseUrl + '/Carts', newcart);
  }
  updateCart(id: number, newcart) {
    return this.http.put(this.baseUrl + '/Carts/' + id, newcart,
      { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + sessionStorage.getItem('access_token') }) });
  }
  deleteCart(id: number) {
    return this.http.delete(this.baseUrl + '/Carts/' + id,
      { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + sessionStorage.getItem('access_token') }) });
  }
  // !cartProd
  getCardProd(id: number) {
    return this.http.get(this.baseUrl + '/CartProds/GetCartProdByCart/' + id,
      { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + sessionStorage.getItem('access_token') }) });
  }
  addCartProd(cartProdList: any) {
    return this.http.post(this.baseUrl + '/CartProds', cartProdList);
  }
  deleteCartProd(id: number) {
    return this.http.delete(this.baseUrl + '/CartProds/' + id,
      { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + sessionStorage.getItem('access_token') }) });
  }
  // !Contacts
  getContacts() {
    return this.http.get(this.baseUrl + '/Contacts');
  }
  addContacts(contact: any) {
    return this.http.post(this.baseUrl + '/Contacts', contact);
  }
  updateContacts(id: number, contact) {
    return this.http.put(this.baseUrl + '/Contacts/' + id, contact,
      { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + sessionStorage.getItem('access_token') }) });
  }
  // !FAQ
  getFaq() {
    return this.http.get(this.baseUrl + '/Faqs');
  }
  updateFaq(id: number, faq) {
    return this.http.put(this.baseUrl + '/Faqs?id=' + id, faq,
      { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + sessionStorage.getItem('access_token') }) });
  }
  addFaq(faq) {
    return this.http.post(this.baseUrl + '/Faqs', faq,
      { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + sessionStorage.getItem('access_token') }) });
  }
  deleteFaq(id: number) {
    return this.http.delete(this.baseUrl + '/Faqs/' + id,
      { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + sessionStorage.getItem('access_token') }) });
  }
  // !contact email
  sendContactEmail(contactEmail) {
    return this.http.post(this.baseUrl + '/ContactEmails', contactEmail);
  }
  // !EventType
  getEventType() {
    return this.http.get(this.baseUrl + '/EventTypes');
  }
  getEventTypeById(id: number) {
    return this.http.get(this.baseUrl + '/EventTypes/' + id);
  }
  updateEventTypeImage(file) {
    return this.http.put(this.baseUrl + '/ProjectTypeImage/', file,
      { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + sessionStorage.getItem('access_token') }) }
    );
  }
  // !admin
  login(adminModel) {
    return this.http.post(this.baseUrl + '/admins', adminModel);
  }
  getUser() {
    return this.http.get(this.baseUrl + '/admins',
      { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + sessionStorage.getItem('access_token') }) });
  }
  // !user
  register(user) {
    return this.http.post(this.baseUrl + '/user/register', user);
  }
  userlogin(loginModel) {
    return this.http.post(this.baseUrl + '/user/login', loginModel);
  }
  forgotpassword(useremail) {
    return this.http.post(this.baseUrl + '/user/forgotpassword', useremail);
  }
  getProfile() {
    return this.http.get(this.baseUrl + '/user/', { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('userId') }) });
  }
  paymentResult(url) {
    return this.http.post(this.baseUrl + '/PxPay/ResponseOutput', url)
  }
  // !images
  addImg(files) {
    return this.http.post(this.baseUrl + '/ProductMedias/', files,
      { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + sessionStorage.getItem('access_token') }) });
  }
  getImg(id: number) {
    return this.http.get(this.baseUrl + '/ProductMedias/' + id);
  }
  addGalleryImg(files) {
    return this.http.post(this.baseUrl + '/ProjectMedias/', files,
      { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + sessionStorage.getItem('access_token') }) });
  }
  getGalleryImg(id: number) {
    return this.http.get(this.baseUrl + '/ProjectMedias/' + id);
  }
  deleteImg(id: number) {
    return this.http.delete(this.baseUrl + '/ProductMedias/' + id,
      { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + sessionStorage.getItem('access_token') }) });
  }
  deleteGalleryImg(id: number) {
    return this.http.delete(this.baseUrl + '/ProjectMedias/' + id,
      { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + sessionStorage.getItem('access_token') }) });
  }
  // !productDetails
  updateProductDetails(productId, detailList) {
    return this.http.put(this.baseUrl + '/ProductDetails/' + productId, detailList,
      { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + sessionStorage.getItem('access_token') }) });
  }
  deleteProductDetail(id: number) {
    return this.http.delete(this.baseUrl + '/ProductDetails/' + id,
      { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + sessionStorage.getItem('access_token') }) });
  }
  // !share status of shopping cart
  setShoppingCartStatus(isValid: boolean) {
    if (isValid) {
      this.isShoppingCartValid.next({ isValid: true });

    } else {
      this.isShoppingCartValid.next({ isValid: false });
    }
  }
  getShoppingCartStatus() {
    return this.isShoppingCartValid.asObservable();
  }
  setSelectedCategory(status: string) {
    this.selectedCate = status;
    this.categoryStatus.next(this.selectedCate);
  }
  getSelectedCategory() {
    return this.categoryStatus.asObservable();
  }
  getCategory() {
    return this.selectedCate;
  }
  // ! homepageCarousel
  getHomepageCarousel() {
    return this.http.get(this.baseUrl + '/HomepageCarouselMedia');
  }
  addHomepageCarousel(files) {
    return this.http.post(this.baseUrl + '/HomepageCarouselMedia/', files,
      { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + sessionStorage.getItem('access_token') }) });
  }
  removeHomepageCarousel(id: number) {
    return this.http.delete(this.baseUrl + '/HomepageCarouselMedia/' + id,
      { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + sessionStorage.getItem('access_token') }) });
  }
}