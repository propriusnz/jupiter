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
  this.utcDate_start = new Date(nowDate2 + offset2)
  this.minDate_start.setDate(this.minDate_start.getDate());
  this.maxDate_start.setDate(this.maxDate_start.getDate() + 90);
}
ngOnChanges(changes: SimpleChanges) {
  console.log("changes happend")
  const pickupValue = changes['isPickup'];
  const districtValue = changes['district']
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
  this.amountDue = this.depositFeeDue + this.deliveryFee
  localStorage.setItem('totalPrice', JSON.stringify(this.totalPrice));

}
ngOnInit() {
  this.data.currentconflictmessage.subscribe(
    currentconflictmessage=>{
      this.conflictmessage=currentconflictmessage
      if(this.conflictmessage.localeCompare('conflict')==0){
        console.log('conflict happens')
        this.calculateTime()
      }
    }
    )
  // get the current shopping cart
  this.deliveryControl = false
  this.productService.getShoppingCartStatus().subscribe(
    status => {
      this.isShoppingCartValid = status.isValid;
    }
  );
  this.productTimetable = JSON.parse(localStorage.getItem('productTimetable') || '[]');
  console.log(this.productTimetable)
  this.prodsInCart = JSON.parse(localStorage.getItem('cartList') || '[]');
  console.log(this.prodsInCart)
  this.checkTimeConflict()
  if (this.prodsInCart == null || this.prodsInCart.length === 0) {
    this.productService.setShoppingCartStatus(false);
  }
  if (this.prodsInCart.length >= 1) {
    this.calculateTime()
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
  localStorage.setItem('productTimetable', JSON.stringify(this.productTimetable))
  if (this.prodsInCart.length === 0) {
    this.productService.setShoppingCartStatus(false);
  } else {
    this.checkTimeConflict()
    this.calculateTime()

  }
  this.price();

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
  if (this.productTimetable.length == 1) {
    control = true
  }
  if (control) {
    console.log("test")
    this.initialStartDate=this.productTimetable[0].beginDate
    this.initialEndDate=this.productTimetable[0].endDate
    this.EventStartDate.emit(this.initialStartDate)
    this.EventEndDate.emit(this.initialEndDate)
    this.productService.setShoppingCartStatus(true);
    this.borderStyleControl=true
  }
}
onStartChange(value) {
  this.EventStartDate.emit(value)
  this.dateStartInput = value;
  this.dateReturnControl = false;
  this.minDate_return = value;
  this.productTimetable.forEach(item => {
    item.beginDate = this.datetoYMD(this.dateStartInput)
  })
  this.checkTimeConflict()
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
  localStorage.setItem('productTimetable', JSON.stringify(this.productTimetable))
}
onReturnChange(value) {
  this.EventEndDate.emit(value)
  this.dateReturnInput = value;
  this.productTimetable.forEach(item => {
    item.endDate = this.datetoYMD(this.dateReturnInput)
  })
  this.checkTimeConflict()
  localStorage.setItem('productTimetable', JSON.stringify(this.productTimetable))
}

// Im going to use this as a example function
calculateTime() {
  // Setting variables for this area (function 1)
  console.log("checking time")
  let hiringdetail = []
  let tmpDates = []
  let tmpSet = new Set()
  let productHiringDetail = {}

  // Loop array (this should be another function) (function 2)
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
  // Loop area closure 

  console.log(hiringdetail)
  // Api call area (function 3)
  this.productService.calculateTime(hiringdetail).subscribe(
    res => {
      console.log(res)
      this.unavailableDates = res
    // Response processing area (function 4) (this function will be the parent function)
      // Response unavailable dates processing area - loop (function 4a)
      for (let i = 0; i < this.unavailableDates.length; i++) {
        let myMoment = moment(this.unavailableDates[i], 'YYYY-MM-DD')
        tmpDates.push(myMoment.toDate())
        tmpSet.add(myMoment.toDate().toString())
      }
      this.disabledDates = tmpDates
      this.mySet = tmpSet

      // Response disabled dates processing area - loop (function 4b)
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
    },
    // close function 4
    err => {
      console.log(err)
    }
  );
    // function 5
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
}
datetoYMD(date) {
  var d = date.getDate();
  var m = date.getMonth() + 1; //Month from 0 to 11
  var y = date.getFullYear();
  return '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
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

}
