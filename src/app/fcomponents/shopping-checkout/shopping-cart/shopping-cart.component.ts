import { Component, OnInit, ViewChild, ElementRef, Input, SimpleChanges, EventEmitter, Output, PLATFORM_ID, Inject } from '@angular/core';
import { ProductService } from '../../../service/product.service'
import { environment } from '../../../../environments/environment.prod';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import * as moment from 'moment';
import { DataService } from '../../../service/data.service';
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  
  userDiscount:any;
  totalPrice = 0;
  prodsInCart: any;
  productDetail: any;
  stockUnavailable = false;
  userInputQuantityArray = [];
  baseImageLink = environment.baseLink;
  conflictmessage: string;
  productTimetable = []
  errorMessage = ''
  isAlert = false
  isTimeSame = true
  isShoppingCartValid = true
  initialStartDate: any
  initialEndDate: any
  minDate_start: Date;
  maxDate_start: Date;
  minDate_return: Date;
  maxDate_return: Date;
  utcDate_start: Date
  startMoment: any
  returnMoment: any
  //dateStartControl = true;
  //dateReturnControl =true;
  deliveryControl = false
  borderStyleControl = true
  dateStartInput: any
  dateReturnInput: any
  // hiringtime=[];
  disabledDates = []
  unavailableDates: any
  mySet = new Set();
  pickupMessage: boolean
  deliveryFee = 0
  depositFeeDue = 0;
  bondFee = 150
  amountDue = 0
  showCoupon = true
  showCouponError = false
  isCouponValid = false
  @Input() isPickup = ''
  @Input() district = ''
  @Output() EventStartDate = new EventEmitter();
  @Output() EventEndDate = new EventEmitter();
  @Output() Coupon = new EventEmitter()
  @ViewChild('quantityInput', { static: false }) quantityInput: ElementRef;
  borderstyleB = 'solid red 2px';

  constructor(
    @Inject(PLATFORM_ID) private platformId,
    private productService: ProductService,
    private data: DataService
  ) {
    if (!isPlatformBrowser(this.platformId)) {return;  }

    const offset2 = new Date().getTimezoneOffset() * 60 * 1000;
    const nowDate2 = new Date().getTime();
    this.minDate_start = new Date(nowDate2 + offset2 + 13 * 60 * 60 * 1000);
    this.maxDate_start = new Date();
    this.utcDate_start = new Date(nowDate2 + offset2) //Calculte current UTC date time
    this.maxDate_start.setDate(this.minDate_start.getDate() + 777);
    this.minDate_return = this.minDate_start
    this.maxDate_return = this.maxDate_start
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!isPlatformBrowser(this.platformId)) {return;  }
    const pickupValue = changes['isPickup'];
    const districtValue = changes['district']
    this.processPickUpValue(pickupValue) //when user selects whether to pickup in user info component 
    this.calculateDeliveryFee(districtValue) //when user selects which district to deliver
    this.amountDue = this.depositFeeDue + this.deliveryFee
  }
  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) {return;  }

    this.productTimetable = JSON.parse(localStorage.getItem('productTimetable') || '[]');
    this.prodsInCart = JSON.parse(localStorage.getItem('cartList') || '[]');
    this.data.currentconflictmessage.subscribe(
      currentconflictmessage => {
        this.conflictmessage = currentconflictmessage
        if (this.conflictmessage.localeCompare('conflict') == 0) {
          this.calculateTime()//calculate disabled dates and update datepicker for products 
        }
      }
    )
    this.getCurrentShoppingCart()
    this.getProductImage()
    this.getAllStock();
    this.price();
  }
  getCurrentShoppingCart() {
    this.deliveryControl = false
    this.productService.getShoppingCartStatus().subscribe(
      status => {
        this.isShoppingCartValid = status.isValid;
      }
    );
    this.checkTimeConflict()
    if (this.prodsInCart == null || this.prodsInCart.length === 0) {
      this.productService.setShoppingCartStatus(false);
    }
    if (this.prodsInCart.length >= 1) {
      this.calculateTime()
      this.checkDaySelected()
    }
  }
  updateShoppingCartStatus() {
    this.startMoment = moment(this.initialStartDate)
    this.returnMoment = moment(this.initialEndDate)
    let control1 = this.checkIfStartIsAfter()
    let control2 = this.checkDisabledDates()
    if (!control1 && !control2) {
      this.productService.setShoppingCartStatus(true)
    } else {
      this.productService.setShoppingCartStatus(false)
    }

  }
  getProductImage() {
    this.prodsInCart.forEach(element => {
      this.productService.getImg(element.ProdId).subscribe((res => {
        element.url = res[0]['url'];
      }));
      this.userInputQuantityArray.push(element.Quantity);
    });
  }
  // delete items of shopping cart
  deleteCart(id) {
    this.prodsInCart.splice(id, 1);
    this.productTimetable.splice(id, 1);
    localStorage.setItem('cartList', JSON.stringify(this.prodsInCart));
    localStorage.setItem('productTimetable', JSON.stringify(this.productTimetable))
    if (this.prodsInCart.length === 0) {
      this.productService.setShoppingCartStatus(false);
    } else {
      this.checkTimeConflict()
      this.calculateTime()

    }
    this.price();

  }

  calculateTime() {
    let hiringdetail = []
    this.processHiringDetail(hiringdetail)
    this.callAPIforCalculateTime(hiringdetail)
  }

  // calculate total price of shopping cart
  price() {
    this.totalPrice = 0;
    console.log('s')
    this.prodsInCart.forEach(prod => {
      this.totalPrice += prod.Price;
    });
    let userID = localStorage.getItem('userId')
    // If user is logged in, check to see if user has discount level
    if(userID){
      this.checkUserForDiscount( userID);
    }
    else{
      this.price2()
    }
  }

  // If user is logged in, check to see if user has discount level
  checkUserForDiscount(id){
    this.productService.getProfile(id).subscribe(
      (res)=>{console.log(res);

        // Check if user has discount level
        if (res['data'][0].discount && res['data'][0].discount !== 1){
          this.userDiscount = res['data'][0].discount

          // Apply discount
          this.totalPrice = this.totalPrice * this.userDiscount
        }
        // Return new price
        this.price2()
      },
      (err)=>{this.price2(), console.warn(err)}
    )
  }

  price2(){
    console.log('price2')
    this.depositFeeDue = this.totalPrice / 2
    this.amountDue = this.totalPrice / 2
    localStorage.setItem('totalPrice', JSON.stringify(this.totalPrice));
    this.calculateBondFee()
  }


  getAllStock() {
    this.prodsInCart.forEach(element => {
      this.productService.showProduct(element.ProdId).subscribe((res => {
        element.availableStock = res['availableStock'];
      }));
    });
  }

  //check if start dates and return dates of all products in the shopping cart are the same 
  checkTimeConflict() {
    let control = false
    if (this.productTimetable.length >= 2) {
      let tmpBeginDate = this.productTimetable[0].beginDate
      let tmpEndDate = this.productTimetable[0].endDate
      for (let i = 1; i <= this.productTimetable.length - 1; i++) {
        if (tmpBeginDate != this.productTimetable[i].beginDate || tmpEndDate != this.productTimetable[i].endDate) {
          this.productService.setShoppingCartStatus(false);
          this.errorMessage = 'Sorry, Start date and Return date for all items should be the same. Please reselect another date range above.'
          this.isTimeSame = false
          this.borderStyleControl = false
          control = false
          break
        } else {
          control = true
        }
      }

    }
    this.checkTimeTable(control)

  }

  checkTimeTable(control) {
    if (this.productTimetable.length == 1) {//if there is only one product in the shopping cart
      control = true
    }
    if (control) { //if there is no time conflict and all dates are the same
      this.initialStartDate = this.productTimetable[0].beginDate
      this.initialEndDate = this.productTimetable[0].endDate
      this.EventStartDate.emit(this.initialStartDate)//emit to user info component
      this.EventEndDate.emit(this.initialEndDate)//emit to user info component
      this.productService.setShoppingCartStatus(true);
      this.isTimeSame = true
      this.borderStyleControl = true
    }
  }
  //check if user selected Friday to Monday
  checkDaySelected() {
    console.log(this.initialStartDate)
    if (this.initialStartDate != null && this.initialEndDate != null) {
      if (moment(this.initialStartDate).day() != 5 || moment(this.initialEndDate).day() != 1) {
        this.isAlert = true
      } else {
        this.isAlert = false
      }
    }
  }
  //if there is an input change of start date 
  onStartChange(value) {
    this.isAlert = false
    this.EventStartDate.emit(value)
    this.dateStartInput = value;
    //this.dateReturnControl=false
    this.minDate_return = value;
    this.productTimetable.forEach(item => {
      item.beginDate = this.datetoYMD(this.dateStartInput)
    })
    this.checkTimeConflict()
    this.processDisabledDates()
    this.checkDaySelected()
    if (!this.checkRentalLength()){
      this.errorMessage = "Sorry, standard rental period cannot exceed is 7 days."
      return;
    }
    this.updateShoppingCartStatus()
    localStorage.setItem('productTimetable', JSON.stringify(this.productTimetable))
    this.errorMessage=null
  }

  //if there is an input change of return date
  onReturnChange(value) {
    this.isAlert = false
    this.EventEndDate.emit(value)
    this.dateReturnInput = value;
    this.productTimetable.forEach(item => {
      item.endDate = this.datetoYMD(this.dateReturnInput)
    })
    this.checkTimeConflict()
    this.checkDaySelected()
    if (!this.checkRentalLength()){
      this.errorMessage = "Sorry, standard rental period cannot exceed is 7 days."
      return;
    }
    this.updateShoppingCartStatus()
    localStorage.setItem('productTimetable', JSON.stringify(this.productTimetable))
    this.errorMessage=null
  }

  checkRentalLength(){
    // if (moment(this.initialStartDate).day() != 5 || moment(this.initialEndDate).day() != 1) {
      console.log("start", this.initialStartDate)
      console.log("end", this.initialEndDate)
    let startday= moment(this.initialStartDate)
    let endday= moment(this.initialEndDate)
    let daylength = endday.diff(startday, 'days')
    console.log("length", daylength)
    if (daylength < 0 || daylength > 7){
      console.log("problem")
      return false;
    }
    else {
      return true
    }
  }

  datetoYMD(date) {
    var d = date.getDate();
    var m = date.getMonth() + 1; //Month from 0 to 11
    var y = date.getFullYear();
    return '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
  }
  //check items in product time table and push them to hiring detail for API call
  processHiringDetail(hiringdetail) {
    let productHiringDetail = {}
    this.productTimetable.forEach(item => {
      if (item.hasOwnProperty('prodId')) {
        productHiringDetail = {
          prodid: item.prodId,
          quantity: item.quantity,
          beginDate: this.utcDate_start.toDateString()
        }
      } else if (item.hasOwnProperty('prodDetailId')) {
        productHiringDetail = {
          proddetailid: item.prodDetailId,
          quantity: item.quantity,
          beginDate: this.utcDate_start.toDateString()
        }
      }
      hiringdetail.push(productHiringDetail)
    })
  }
  callAPIforCalculateTime(hiringdetail) {
    let tmpDates = []
    let tmpSet = new Set()
    this.productService.calculateTime(hiringdetail).subscribe(
      res => {
        this.unavailableDates = res
        this.processUnavailableDates(tmpDates, tmpSet)
        this.processDisabledDates()
        this.updateShoppingCartStatus()
        this.checkDaySelected()
      },
      err => {
      }
    );
  }
  processUnavailableDates(tmpDates, tmpSet) {
    for (let i = 0; i < this.unavailableDates.length; i++) {
      let myMoment = moment(this.unavailableDates[i], 'YYYY-MM-DD')
      tmpDates.push(myMoment.toDate())
      tmpSet.add(myMoment.toDate().toString())
    }
    this.disabledDates = tmpDates
    this.mySet = tmpSet

  }
  processDisabledDates() {
    for (let i = 0; i < this.disabledDates.length; i++) {
      let myMoment = moment(this.disabledDates[i], 'YYYY-MM-DD')
      if (myMoment.startOf('day'
      ).isAfter(moment(this.initialStartDate).startOf('day'))) {
        let myMoment_date = myMoment.toDate()
        myMoment_date.setDate(myMoment.toDate().getDate() - 1);
        this.maxDate_return = myMoment_date
        break
      }
    }

    if (this.disabledDates.length == 0 || this.dateStartInput == null) {
      this.maxDate_return = this.maxDate_start
    }
  }
  checkIfStartIsAfter() {
    if (this.startMoment != null && this.returnMoment != null) {
      if (this.startMoment.startOf('day').isAfter(this.returnMoment.startOf('day'))) {
        return true
      } else {
        return false
      }
    }
  }
  //check if the previous date inputs are disabled now
  checkDisabledDates() {
    let control = false
    for (let i = 0; i < this.disabledDates.length; i++) {
      if (moment(this.disabledDates[i]).startOf('day').isSameOrAfter(this.startMoment.startOf('day')) && moment(this.disabledDates[i]).startOf('day').isSameOrBefore(this.returnMoment.startOf('day'))) {
        control = true
        return control
      }
    }
    return control


  }
  calculateBondFee() {
    if ('totalPrice' in localStorage) {
      this.totalPrice = JSON.parse(localStorage.getItem('totalPrice'));
    }
    if(this.totalPrice <= 150){
      this.bondFee = 100
    }
      else if (this.totalPrice > 150 && this.totalPrice <= 300) {
      this.bondFee = 150
    } else if (this.totalPrice > 300 && this.totalPrice <= 700) {
      this.bondFee = 250
    } else if (this.totalPrice > 700) {
      this.bondFee = 500
    }


  }
  calculateDeliveryFee(districtValue) {
    if (districtValue != null) {
      if (districtValue.currentValue.localeCompare("1") == 0) {
        this.deliveryFee = 100
      } else if (districtValue.currentValue.localeCompare("2") == 0) {
        this.deliveryFee = 150
      } else if (districtValue.currentValue.localeCompare("3") == 0) {
        this.deliveryFee = 200
      } else if (districtValue.currentValue.localeCompare("4") == 0) {
        this.deliveryFee = 150
      } else if (districtValue.currentValue.localeCompare("5") == 0) {
        this.deliveryFee = 200
      }


    }
  }
  processPickUpValue(pickupValue) {
    if (pickupValue != null) {
      if (pickupValue.currentValue == "1") {
        this.pickupMessage = true;
        this.deliveryControl = false
        this.deliveryFee = 0
      } else {
        this.pickupMessage = false;
        this.deliveryControl = true
        this.deliveryFee = 0
      }

    }
  }
  checkCoupon(coupon) {
    if ('totalPrice' in localStorage) {
      this.totalPrice = JSON.parse(localStorage.getItem('totalPrice'));
    }
    if (coupon) {
      this.productService.checkCoupon(coupon.value).subscribe(
        res => {
          if (res === 1) {
            this.processCoupon(coupon)
          } else {
            this.showCouponError = true
            setTimeout(() => {
              this.showCouponError = false;
            }, 8000);
            this.Coupon.emit('')
          }
        }
      )
    }
  }

  processCoupon(coupon) {
    this.showCoupon = false
    this.isCouponValid = true
    this.showCouponError = false
    this.Coupon.emit(coupon.value)
    this.totalPrice *= 0.9
    this.amountDue=this.totalPrice/2
    localStorage.setItem('totalPrice', JSON.stringify(this.totalPrice));
  }

  cancelCoupon() {
    if ('totalPrice' in localStorage) {
      this.totalPrice = JSON.parse(localStorage.getItem('totalPrice'));
    }
    this.showCoupon = true
    this.isCouponValid = false
    this.Coupon.emit('')
    this.totalPrice /= 0.9
    this.amountDue=this.totalPrice/2
    localStorage.setItem('totalPrice', JSON.stringify(this.totalPrice));
  }

}
