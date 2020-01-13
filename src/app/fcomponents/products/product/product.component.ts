import { Component, OnInit, ViewChild, ElementRef, Inject, PLATFORM_ID, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProductService } from '../../../service/product.service';
import { Validators, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { environment } from '../../../../environments/environment.prod';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { setTheme } from 'ngx-bootstrap/utils';
import * as moment from 'moment';
import { isBefore } from 'ngx-bootstrap/chronos/public_api';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  productId: number;
  productDetail: any;
  prodMediaUrl: any;
  quantity = 0;
  isprodAdded = false;
  isStockAvailable = true;
  cartList = [];
  productTimetable = [];
  cartForm: FormGroup;
  cartItems: FormArray;
  isInputZero = true;
  isLoading = true;
  rightCarouselControlPosition: number;
  baseImageLink = environment.baseLink;
  minDate_start: Date;
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
  orderquantity = 0;
  orderlist = [];
  map = new Map();
  mySet = new Set();
  tmpDetailID = new Map()//used for storing products with both ProdId and Id
  tmpProdID = new Map()//used for storing products with only ProdId
  addToCartControl = true;
  prodDetailIdlist = []
  prodIdlist = []


  @ViewChild('imageContainer', { static: false }) imageContainer: ElementRef;
  @ViewChild('prodImage', { static: false }) prodImage: ElementRef;
  @ViewChild('rightControl', { static: false }) rightControl: ElementRef;
  // hiringtime:{proddetailid: string;
  //   quantity: string;
  //   beginDate: string};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private formBuilder: FormBuilder,
  ) {

    this.productId = this.route.snapshot.params['id'];
    setTheme('bs4');
    this.minDate_start = new Date();
    this.maxDate_start = new Date();
    this.minDate_start.setDate(this.minDate_start.getDate());
    this.maxDate_start.setDate(this.maxDate_start.getDate() + 90);
  }
  ngOnInit() {
    this.cartForm = this.formBuilder.group({
      cartItems: this.formBuilder.array([]),
    });
    // get the detail of product
    this.productService.showProduct(this.productId).subscribe(
      (res) => {
        console.log(res)
        this.isLoading = false;
        this.productDetail = res;
        this.createItem(res);
        this.prodMediaUrl = this.productDetail.productMedia;
      },
      (error) => {
        console.log(error);
        this.isLoading = false;
      }
    );
    this.setStorage();
    this.detectInputAmount();
  }
  // tslint:disable-next-line: use-life-cycle-interface
  ngAfterViewChecked() {
    if (this.imageContainer && this.prodImage && this.rightControl) {
      this.showElements();
    }

  }
  // add product descriptions into formArray
  createItem(res) {
    res['productDetail'].forEach(prod => {
      if (this.validateItem(prod)) {
        const control = <FormArray>this.cartForm.controls.cartItems;
        control.push(
          this.formBuilder.group({
            ProdId: prod.prodId,
            // Title: ({value : prod.productDetail1, disabled : true}),
            Id: prod.id,
            Title: prod.productDetail1,
            Quantity: [0, [Validators.min(0), Validators.max(prod.availableStock), Validators.required]],
            Price: (prod.discount && prod.discount > 0) ? prod.price - prod.discount : prod.price,
            Discount: prod.discount,
            AvailableStock: prod.availableStock
          })
        );
      }
    });
  }
  // check incomplete specifications
  validateItem(item): boolean {
    const price = item.price;
    const stock = item.availableStock;
    if (price == null || price === 0 || price - item.discount < 0) {
      return false;
    } else if (stock > item.totalStock || stock <= 0 || stock == null) {
      return false;
    } else {
      return true;
    }
  }
  // get cartList from localStorage or initialize cartList in localStorage
  setStorage() {
    if ('cartList' in localStorage) {
      this.cartList = JSON.parse(localStorage.getItem('cartList'));
    } else {
      localStorage.setItem('cartList', JSON.stringify(this.cartList));
    }
    if ('productTimetable' in localStorage) {
      this.productTimetable = JSON.parse(localStorage.getItem('productTimetable'));
    } else {
      localStorage.setItem('productTimetable', JSON.stringify(this.productTimetable));
    }
    
    // localStorage.setItem('userId', 'aaa ')
  }
  // add product into a list
  manageCartProds() {
    if (this.addToCartControl && (0 >= this.quantity || this.quantity > this.productDetail.availableStock) && (this.cartForm.invalid || this.isInputZero)) {
      console.log('error')
      return;
    }
    const newCartList = [];
    // if product detail exist
    if (this.productDetail['productDetail'] && this.productDetail['productDetail'].length !== 0) {
      this.cartForm.controls.cartItems['value'].forEach(cartItem => {
        const item = {
          Id: cartItem.Id,
          ProdId: cartItem.ProdId,
          Price: cartItem.Price * cartItem.Quantity,
          Title: this.productDetail.title + ': ' + cartItem.Title,
          Quantity: cartItem.Quantity
        };
        // add product into cart only if amount > 0
        if (item.Quantity !== 0) {
          newCartList.push(item);
        }
      });
      this.addToCart(newCartList);

    } else {
      // if no product detail
      let productPrice = (this.productDetail.discount && this.productDetail.discount > 0) ?
        this.productDetail.price - this.productDetail.discount : this.productDetail.price;
      const item = {
        ProdId: Number(this.productId),
        Price: this.quantity * productPrice,
        Title: this.productDetail.title,
        Quantity: this.quantity
      };
      // Quantity check
      if (this.quantity <= this.productDetail.availableStock) {
        newCartList.push(item);
        this.addToCart(newCartList);
      } else {
        this.isStockAvailable = false;
      }
    }
  }
  // add cartList into localStorage
  addToCart(list) {
    for (let i = 0; i < this.prodDetailIdlist.length; i++) {
      let neworder = {
        prodDetailId: this.prodDetailIdlist[i].proddetailid,
        beginDate: this.datetoYMD(this.startMoment.toDate()),
        endDate: this.datetoYMD(this.returnMoment.toDate()),
        quantity: this.prodDetailIdlist[i].quantity
      }
      if (!this.tmpDetailID.has(this.prodDetailIdlist[i].proddetailid)) {
        this.tmpDetailID.set(this.prodDetailIdlist[i].proddetailid, neworder)
      } else {
        this.tmpDetailID.get(this.prodDetailIdlist[i].proddetailid).quantity = neworder.quantity
        this.tmpDetailID.get(this.prodDetailIdlist[i].proddetailid).beginDate= neworder.beginDate
        this.tmpDetailID.get(this.prodDetailIdlist[i].proddetailid).endDate= neworder.endDate
      }
    }
    this.isStockAvailable = true;
    this.isprodAdded = true;
    setTimeout(() => {
      this.isprodAdded = false;
    }, 1000);
    list.forEach(item => {
      let a = false;
      if (!item.hasOwnProperty('Id')) {
        let neworder = {
          prodId: item.ProdId,
          beginDate: this.datetoYMD(this.startMoment.toDate()),
          endDate: this.datetoYMD(this.returnMoment.toDate()),
          quantity: item.Quantity
        }
        if (!this.tmpProdID.has(item.ProdId)) {
          this.tmpProdID.set(item.ProdId, neworder)
        } else {
          this.tmpProdID.get(item.ProdId).quantity = neworder.quantity
        }
      }
      // if cartList if not empty
      if (this.cartList.length > 0) {
        for (let i = 0; i < this.cartList.length; i++) {
          // if product already exists in cartList
          if (this.cartList[i].Title === item.Title) {
            a = true;
            this.cartList[i].Quantity = item.Quantity;
            this.cartList[i].Price = this.cartList[i].Quantity * item.Price;
            localStorage.setItem('cartList', JSON.stringify(this.cartList));
          }
        }
        // if product not in cartList
        if (a === false) {
          this.cartList.push(item);
          localStorage.setItem('cartList', JSON.stringify(this.cartList));
        }
      } else {
        // if nothing in cartList
        this.cartList = JSON.parse(localStorage.getItem('cartList'));
        this.cartList.push(item);
        localStorage.setItem('cartList', JSON.stringify(this.cartList));
      }
    });
    console.log(this.tmpDetailID)
    this.productTimetable = JSON.parse(localStorage.getItem('productTimetable'));
    this.productTimetable.forEach(item => {
      if (this.tmpDetailID.get(item.prodDetailId) != null || this.tmpProdID.get(item.prodId) != null) {
        if (item.hasOwnProperty('prodDetailId')) {
          item.quantity = this.tmpDetailID.get(item.prodDetailId).quantity
          item.beginDate= this.tmpDetailID.get(item.prodDetailId).beginDate
          item.endDate= this.tmpDetailID.get(item.prodDetailId).endDate
          this.tmpDetailID.delete(item.prodDetailId)
        } else if (!item.hasOwnProperty('prodDetailId')) {
          item.quantity = this.tmpProdID.get(item.prodId).quantity
          item.beginDate= this.tmpProdID.get(item.prodId).beginDate
          item.endDate= this.tmpProdID.get(item.prodId).endDate
          this.tmpProdID.delete(item.prodId)
        }
      }
    })
    let iterable = this.tmpDetailID.values()
    let current = iterable.next().value
    while (current != null) {
      this.productTimetable.push(current)
      current = iterable.next().value
    }
    iterable = this.tmpProdID.values()
    current = iterable.next().value
    while (current != null) {
      this.productTimetable.push(current)
      current = iterable.next().value
    }
    localStorage.setItem('productTimetable', JSON.stringify(this.productTimetable));
    this.productTimetable = JSON.parse(localStorage.getItem('productTimetable'))
    console.log(this.productTimetable)
  }
  // click the path and re-navigate
  backClicked(type: string, id?: number) {
    if (id) {
      this.router.navigate(['/category/', id]);
    }
    if (type === 'services') {
      this.router.navigate(['/services']);
    }
    if (type === 'packages') {
      this.router.navigate(['/packages']);
    }
  }
  // check whether all of the input value of specifications are 0
  detectInputAmount() {
    this.cartForm.valueChanges.subscribe(dt => {
      let a = 0;
      this.cartForm.controls.cartItems['value'].forEach(item => {
        if (item.Quantity === 0) {
          a += 1;
        }
      });
      if (a === this.cartForm.controls.cartItems['value'].length) {
        this.isInputZero = true;
      } else {
        this.isInputZero = false;
      }
    });
  }
  showElements() {
    const containerWidth = this.imageContainer.nativeElement.clientWidth;
    const imageWidth = this.prodImage.nativeElement.clientWidth;
    this.rightCarouselControlPosition = containerWidth - imageWidth;
    this.rightControl.nativeElement.style.right = this.rightCarouselControlPosition + 'px';
  }
  addQuantity(proddetail) {
    let prodId = proddetail['value'].Id
    let quantityvalue = proddetail['value'].Quantity
    if (!this.map.has(prodId) && proddetail.valid && quantityvalue != 0) {
      let neworder = {
        id: prodId,
        quantity: quantityvalue,
        beginDate: this.datetoYMD(this.minDate_start)
      }
      this.map.set(prodId, neworder)
    } else if (this.map.has(prodId) && quantityvalue != 0 && quantityvalue <= proddetail['value'].AvailableStock) {
      this.map.get(prodId).quantity = quantityvalue
    } else {
      this.map.delete(prodId)
    }
    if (this.map.size != 0) {
      this.dateStartControl = false;
    } else if (this.map.size == 0) {
      this.dateStartControl = true;
      this.dateReturnControl = true;
    }
    //Calculate Time
    this.calculateTime()
    //
  }
  datetoYMD(date) {
    var d = date.getDate();
    var m = date.getMonth() + 1; //Month from 0 to 11
    var y = date.getFullYear();
    return '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
  }
  calculateTime() {
    let hiringdetail = []
    let tmpDates = []
    let tmpSet = new Set()
    let iterable = this.map.values()
    let current = iterable.next().value
    while (current != null) {
      let productHiringDetail = {
        proddetailid: current.id,
        quantity: current.quantity,
        beginDate: current.beginDate
      }
      hiringdetail.push(productHiringDetail)
      current = iterable.next().value
    }
    this.prodDetailIdlist = hiringdetail
    if (this.map.size != 0) {
      this.productService.calculateTime(hiringdetail).subscribe(
        res => {
          console.log(res)
          this.unavailableDates = res
          for (let i = 0; i < this.unavailableDates.length; i++) {
            let myMoment = moment(this.unavailableDates[i], 'YYYY-MM-DD')
            tmpDates.push(myMoment.toDate())
            tmpSet.add(myMoment.toDate().toString())
          }
          this.disabledDates = tmpDates
          this.mySet = tmpSet
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
          if (this.startMoment != null && this.returnMoment != null) {
            if ((this.startMoment.startOf('day').isAfter(this.returnMoment.startOf('day'))) || this.mySet.has(this.startMoment.toDate().toString()) || this.mySet.has(this.returnMoment.toDate().toString()) || this.checkDisabledDates()) {
              this.addToCartControl = true
            } else {
              this.addToCartControl = false
            }

          }
        },
        err => {
          console.log(err)
        }
      );
    }
  }

  quantitycheck(proddetail) {
    let hiringdetail = []
    let tmpDates = []
    if (this.quantity > 0) {
      this.dateStartControl = false;
      this.dateReturnControl = false;
    } else if (this.quantity == 0) {
      this.dateStartControl = true;
      this.dateReturnControl = true;
    }
    let productHiringDetail = {
      prodid: proddetail.prodId,
      quantity: this.quantity,
      beginDate: this.datetoYMD(this.minDate_start)
    }
    hiringdetail.push(productHiringDetail)
    if (this.quantity != 0) {
      this.productService.calculateTime(hiringdetail).subscribe(
        res => {
          console.log(res)
          this.unavailableDates = res
          for (let i = 0; i < this.unavailableDates.length; i++) {
            let myMoment = moment(this.unavailableDates[i], 'YYYY-MM-DD')
            tmpDates.push(myMoment.toDate())
          }
          this.disabledDates = tmpDates
          if (this.startMoment != null && this.returnMoment != null) {
            if ((this.startMoment.startOf('day').isAfter(this.returnMoment.startOf('day')))) {
              this.addToCartControl = true
            } else {
              this.addToCartControl = false
            }

          }
        },
        err => {
          console.log(err)
        }
      );
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
    if (this.startMoment != null && this.returnMoment != null) {
      if (this.startMoment.startOf('day').isAfter(this.returnMoment.startOf('day'))) {
        this.addToCartControl = true
      } else {
        this.addToCartControl = false
      }
    }
  }
  onReturnChange(value) {
    this.dateReturnInput = value;
    this.returnMoment = moment(this.dateReturnInput)
    if (this.startMoment != null && this.returnMoment != null) {
      if (this.startMoment.startOf('day').isAfter(this.returnMoment.startOf('day'))) {
        this.addToCartControl = true
      } else {
        this.addToCartControl = false
      }
    }
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


