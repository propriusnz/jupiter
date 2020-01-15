import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { environment } from '../../../environments/environment.prod';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import * as moment from 'moment';
@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  totalPrice = 0;
  prodsInCart: any;
  productDetail: any;
  stockUnavailable = false;
  userInputQuantityArray = [];
  baseImageLink = environment.baseLink;
  productTimetable = []
  errorMessage = ''
  isShoppingCartValid=true
  minDate_start:Date;
  maxDate_start: Date;
  minDate_return: Date;
  maxDate_return: Date;
  dateStartControl = true;
  dateReturnControl = true;
  dateStartInput: any
  dateReturnInput: any
  // hiringtime=[];
  disabledDates = []
  startMoment: any;
  returnMoment: any;
  unavailableDates: any
  @ViewChild('quantityInput', { static: false }) quantityInput: ElementRef;
  constructor(
    private productService: ProductService

  ) { 
    var offset2 =new Date().getTimezoneOffset()* 60 * 1000;
    var nowDate2 = new Date().getTime();
    this.minDate_start=new Date(nowDate2 + offset2);
    this.maxDate_start = new Date();
    this.minDate_start.setDate(this.minDate_start.getDate());
    this.maxDate_start.setDate(this.maxDate_start.getDate() + 90);
  }

  ngOnInit() {
    // get the current shopping cart
    this.productService.getShoppingCartStatus().subscribe(
      status => { 
        this.isShoppingCartValid = status.isValid; }
    );
    this.productTimetable = JSON.parse(localStorage.getItem('productTimetable') || '[]');
    console.log(this.productTimetable)
    this.prodsInCart = JSON.parse(localStorage.getItem('cartList') || '[]');
    console.log(this.prodsInCart)
    this.checkTimeConflict()
    if (this.prodsInCart == null || this.prodsInCart.length === 0) {
      this.productService.setShoppingCartStatus(false);
    }
    // get the image of product
    this.prodsInCart.forEach(element => {
      this.productService.getImg(element.ProdId).subscribe((res => {
        element.url = res[0]['url'];
      }));
      this.userInputQuantityArray.push(element.Quantity);
    });
    this.getAllStock();
    this.price();
  }
  // delete items of shopping cart
  deleteCart(id) {
    this.prodsInCart.splice(id, 1);
    this.productTimetable.splice(id, 1);
    localStorage.setItem('cartList', JSON.stringify(this.prodsInCart));
    localStorage.setItem('productTimetable', JSON.stringify(this.prodsInCart))
    if (this.prodsInCart.length === 0) {
      this.productService.setShoppingCartStatus(false);
    }
    this.checkTimeConflict()
    this.price();
  }
  // calculate total price of shopping cart
  price() {
    this.totalPrice = 0;
    this.prodsInCart.forEach(prod => {
      this.totalPrice += prod.Price;
    });
    localStorage.setItem('totalPrice', JSON.stringify(this.totalPrice));
  }
  getAllStock() {
    this.prodsInCart.forEach(element => {
      this.productService.showProduct(element.ProdId).subscribe((res => {
        element.availableStock = res['availableStock'];
      }));
    });
  }
  checkTimeConflict() {
    if (this.productTimetable.length >= 2) {
      let control=false
      let tmpBeginDate = this.productTimetable[0].beginDate
      let tmpEndDate = this.productTimetable[0].endDate
      for (let i = 1; i <= this.productTimetable.length - 1; i++) {
        if (tmpBeginDate != this.productTimetable[i].beginDate || tmpEndDate != this.productTimetable[i].endDate) {
          this.productService.setShoppingCartStatus(false);
          this.errorMessage = 'Sorry, Start date and Return date for all items should be same. Please reselct another date range.' 
          this.isShoppingCartValid = false
          control=false
          break
        }else{
          control=true
        }
      }
      if(control){
        this.productService.setShoppingCartStatus(true);
      }
    }
  }
  onStartChange(value) {
    this.dateStartInput = value;
    this.dateReturnControl = false;
    this.minDate_return = value;

    for (let i = 0; i < this.disabledDates.length; i++) {
      let myMoment = moment(this.disabledDates[i], 'YYYY-MM-DD')
      if (myMoment.startOf('day').isAfter(moment(this.dateStartInput).startOf('day'))) {
        let myMoment_date = myMoment.toDate()
        myMoment_date.setDate(myMoment.toDate().getDate() - 1);
        this.maxDate_return = myMoment_date
        break
      } else {
        this.maxDate_return = this.maxDate_start
      }
    }

    this.startMoment = moment(this.dateStartInput)
  }
  onReturnChange(value) {
    this.dateReturnInput = value;
    this.returnMoment = moment(this.dateReturnInput)
  }
  checkDisabledDates() {
    for (let i = 0; i < this.disabledDates.length; i++) {
      if (moment(this.disabledDates[i]).startOf('day').isAfter(this.startMoment.startOf('day')) && moment(this.disabledDates[i]).startOf('day').isBefore(this.returnMoment.startOf('day')) && !this.startMoment.startOf('day').isSame(this.returnMoment.startOf('day'))) {
        return true
      }
    }

    return false
  }
}