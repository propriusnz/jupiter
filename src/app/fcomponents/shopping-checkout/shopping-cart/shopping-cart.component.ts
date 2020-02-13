import { Component, OnInit, ViewChild, ElementRef, Input, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { ProductService } from '../../../service/product.service'
import { environment } from '../../../../environments/environment.prod';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import * as moment from 'moment';
import { DataService } from 'src/app/service/data.service';
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
  conflictmessage: string;
  productTimetable = []
  errorMessage = ''
  isShoppingCartValid = true
  initialStartDate:any
  initialEndDate:any
  minDate_start: Date;
  maxDate_start: Date;
  minDate_return: Date;
  maxDate_return: Date;
  utcDate_start: Date
  dateStartControl = true;
  dateReturnControl = true;
  deliveryControl = false
  borderStyleControl=true
  dateStartInput: any
  dateReturnInput: any
  // hiringtime=[];
  disabledDates = []
  startMoment: any;
  returnMoment: any;
  unavailableDates: any
  mySet = new Set();
  pickupMessage: boolean
  deliveryFee = 0
  depositFeeDue = 0;
  bondFee = 150
  amountDue = 0
  @Input() isPickup = ''
  @Input() district = ''
  @Output() EventStartDate= new EventEmitter();
  @Output() EventEndDate= new EventEmitter();
  @ViewChild('quantityInput', { static: false }) quantityInput: ElementRef;
  borderstyleB='solid red 2px';
constructor(
  private productService: ProductService,
  private data: DataService
) {
  const offset2 = new Date().getTimezoneOffset() * 60 * 1000;
  const nowDate2 = new Date().getTime();
  this.minDate_start = new Date(nowDate2 + offset2 + 13 * 60 * 60 * 1000);
  this.maxDate_start = new Date();
  this.utcDate_start = new Date(nowDate2 + offset2) //Calculte current UTC date time
  this.minDate_start.setDate(this.minDate_start.getDate());
  this.maxDate_start.setDate(this.maxDate_start.getDate() + 90);
}
ngOnChanges(changes: SimpleChanges) {
  const pickupValue = changes['isPickup'];
  const districtValue = changes['district']
  this.processPickUpValue(pickupValue) //when user selects whether to pickup in user info component 
  this.calculateDeliveryFee(districtValue) //when user selects which district to deliver
  this.amountDue = this.depositFeeDue + this.deliveryFee
  localStorage.setItem('totalPrice', JSON.stringify(this.totalPrice));

}
ngOnInit() {
  this.data.currentconflictmessage.subscribe(
    currentconflictmessage=>{
      this.conflictmessage=currentconflictmessage
      if(this.conflictmessage.localeCompare('conflict')==0){
        this.calculateTime()//calculate disabled dates and update datepicker for products 
      }
    }
    )
  this.getCurrentShoppingCart()
  this.getProductImage()
  this.getAllStock();
  this.price();
}
getCurrentShoppingCart(){
  this.deliveryControl = false
  this.productService.getShoppingCartStatus().subscribe(
    status => {
      this.isShoppingCartValid = status.isValid;
    }
  );
  this.productTimetable = JSON.parse(localStorage.getItem('productTimetable') || '[]');
  this.prodsInCart = JSON.parse(localStorage.getItem('cartList') || '[]');
  this.checkTimeConflict()
  if (this.prodsInCart == null || this.prodsInCart.length === 0) {
    this.productService.setShoppingCartStatus(false);
  }
  if (this.prodsInCart.length >= 1) {
    this.calculateTime()
  }
}
getProductImage(){
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
  this.processDisabledDates()
}
// calculate total price of shopping cart
price() {
  this.totalPrice = 0;
  this.prodsInCart.forEach(prod => {
    this.totalPrice += prod.Price;
  });
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
        this.isShoppingCartValid = false
        this.borderStyleControl=false
        control = false
        break
      } else {
        control = true
      }
    }

  }
  this.checkTimeTable(control)
  
}

checkTimeTable(control){
  if (this.productTimetable.length == 1) {//if there is only one product in the shopping cart
    control = true
  }
  if (control) { //if there is no time conflict and all dates are the same
    this.initialStartDate=this.productTimetable[0].beginDate
    this.initialEndDate=this.productTimetable[0].endDate
    this.EventStartDate.emit(this.initialStartDate)//emit to user info component
    this.EventEndDate.emit(this.initialEndDate)//emit to user info component
    this.productService.setShoppingCartStatus(true);
    this.borderStyleControl=true
  }
}
//if there is an input change of start date 
onStartChange(value) {
  this.EventStartDate.emit(value)
  this.dateStartInput = value;
  this.dateReturnControl = false;
  this.minDate_return = value;
  this.productTimetable.forEach(item => {
    item.beginDate = this.datetoYMD(this.dateStartInput)
  })
  this.checkTimeConflict()
  this.processDisabledDates()
  
  localStorage.setItem('productTimetable', JSON.stringify(this.productTimetable))
}
//if there is an input change of return date
onReturnChange(value) {
  this.EventEndDate.emit(value)
  this.dateReturnInput = value;
  this.productTimetable.forEach(item => {
    item.endDate = this.datetoYMD(this.dateReturnInput)
  })
  this.checkTimeConflict()
  localStorage.setItem('productTimetable', JSON.stringify(this.productTimetable))
}

datetoYMD(date) {
  var d = date.getDate();
  var m = date.getMonth() + 1; //Month from 0 to 11
  var y = date.getFullYear();
  return '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
}
//check items in product time table and push them to hiring detail for API call
processHiringDetail(hiringdetail){
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
callAPIforCalculateTime(hiringdetail){
  let tmpDates = []
  let tmpSet = new Set()
  this.productService.calculateTime(hiringdetail).subscribe(
    res => {
      this.unavailableDates = res
      this.processUnavailableDates(tmpDates,tmpSet)
      this.processDisabledDates()
    },
    err => {
    }
  );
}
processUnavailableDates(tmpDates,tmpSet){
  for (let i = 0; i < this.unavailableDates.length; i++) {
    let myMoment = moment(this.unavailableDates[i], 'YYYY-MM-DD')
    tmpDates.push(myMoment.toDate())
    tmpSet.add(myMoment.toDate().toString())
  }
  this.disabledDates = tmpDates
  this.mySet = tmpSet

}
processDisabledDates(){
  for (let i = 0; i < this.disabledDates.length; i++) {
    let myMoment = moment(this.disabledDates[i], 'YYYY-MM-DD')
    if (myMoment.startOf('day'
    ).isAfter(moment(this.dateStartInput).startOf('day'))) {
      let myMoment_date = myMoment.toDate()
      myMoment_date.setDate(myMoment.toDate().getDate() - 1);
      this.maxDate_return = myMoment_date
      break
    }
  }
  if (this.disabledDates.length == 0) {
    this.maxDate_return = this.maxDate_start
  }
}
calculateBondFee() {
  if ('totalPrice' in localStorage) {
    this.totalPrice = JSON.parse(localStorage.getItem('totalPrice'));
  }
  if (this.totalPrice <= 250) {
    this.bondFee = 150
  } else if (this.totalPrice <= 750 && this.totalPrice > 250) {
    this.bondFee = 300
  } else if (this.totalPrice > 750) {
    this.bondFee = 500
  }

}
calculateDeliveryFee(districtValue){
  if (districtValue != null) {
    if (districtValue.currentValue.localeCompare("1") == 0) {
      this.deliveryFee = 20
    } else if (districtValue.currentValue.localeCompare("2") == 0) {
      this.deliveryFee = 30
    } else if (districtValue.currentValue.localeCompare("3") == 0) {
      this.deliveryFee = 50
    } else if (districtValue.currentValue.localeCompare("4") == 0) {
      this.deliveryFee = 40
    }


  }
}
processPickUpValue(pickupValue){
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

}
