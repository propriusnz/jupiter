import { Component, OnInit, ViewChild, ElementRef, Inject, PLATFORM_ID, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProductService } from '../../../service/product.service';
import { Validators, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { environment } from '../../../../environments/environment.prod';
import { setTheme } from 'ngx-bootstrap/utils';
import * as moment from 'moment';


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
  isAlert=false
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
  utcDate_start: Date
  //dateStartControl = true;
  //dateReturnControl = true;
  dateStartInput: any
  dateReturnInput: any
  // hiringtime=[];
  disabledDates = [];
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
  startMomentDay:number
  returnMomentDay:number
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
    let offset2 = new Date().getTimezoneOffset() * 60 * 1000;
    let nowDate2 = new Date().getTime();
    this.utcDate_start = new Date(nowDate2 + offset2)
    this.minDate_start = new Date(nowDate2 + offset2 + 13 * 60 * 60 * 1000);
    this.maxDate_start = new Date();
    this.maxDate_start.setDate(this.minDate_start.getDate() + 90);
    this.minDate_return=this.minDate_start
    this.maxDate_return=this.maxDate_start
  }
  ngOnInit() {
    this.cartForm = this.formBuilder.group({
      cartItems: this.formBuilder.array([]),
    });
    // get the detail of product
    this.productService.showProduct(this.productId).subscribe(
      (res) => {

        this.isLoading = false;
        this.productDetail = res;
        this.createItem(res);
        this.prodMediaUrl = this.productDetail.productMedia;
      },
      (error) => {

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
      return;
    }
    const newCartList = [];
    // if product detail exist
    
    if (this.productDetail['productDetail'] && this.productDetail['productDetail'].length !== 0) {
      this.cartForm.controls.cartItems['value'].forEach(cartItem => {
        this.detailId_getCartList(newCartList,cartItem)
      });
      this.addToCart(newCartList);

    } else {
      // if no product detail
      this.getCartList(newCartList)
    }
  }
  //get cartlist with no product detail
  getCartList(newCartList){
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
  //get cartlist with product detail
  detailId_getCartList(newCartList,cartItem){
    const item = {
      //Id: cartItem.Id,
      ProdId: cartItem.ProdId,
      ProdDetailId: cartItem.Id,
      Price: cartItem.Price * cartItem.Quantity,
      Title: this.productDetail.title + ': ' + cartItem.Title,
      Quantity: cartItem.Quantity
    };
    // add product into cart only if amount > 0
    if (item.Quantity !== 0) {
      newCartList.push(item);
    }
  }
  // add cartList into localStorage
  addToCart(list) {
    this.detailId_getTmpMap()
    this.isStockAvailable = true;
    this.isprodAdded = true;
    this.checkDaySelected()
    this.setTime()
    list.forEach(item => {
      let control = false;
      if (this.productDetail.productDetail.length == 0) {
        this.getTmpMap(item)
      }
      this.processCartList(control,item)
    });
    this.updateProductTimetable()
  }
  //get tmp detail Id map 
  detailId_getTmpMap() {
    for (let i = 0; i < this.prodDetailIdlist.length; i++) {
      let neworder = {
        prodDetailId: this.prodDetailIdlist[i].prodDetailid,
        beginDate: this.datetoYMD(this.startMoment.toDate()),
        endDate: this.datetoYMD(this.returnMoment.toDate()),
        quantity: this.prodDetailIdlist[i].quantity
      }
      if (!this.tmpDetailID.has(this.prodDetailIdlist[i].proddetailid)) {
        this.tmpDetailID.set(this.prodDetailIdlist[i].prodDetailid, neworder)
      } else {
        this.tmpDetailID.get(this.prodDetailIdlist[i].prodDetailid).quantity = neworder.quantity
        this.tmpDetailID.get(this.prodDetailIdlist[i].prodDetailid).beginDate = neworder.beginDate
        this.tmpDetailID.get(this.prodDetailIdlist[i].prodDetailid).endDate = neworder.endDate
      }
    }
  }
  //check if user has selected from Friday to Monday
  checkDaySelected(){
    if(this.startMomentDay!=5 || this.returnMomentDay!=1){
      this.isAlert=true
    }else{
      this.isAlert=false
    }
  }
  //set timeout for highlight
  setTime(){
    setTimeout(() => {
      this.isprodAdded = false;
    }, 1000);
  }
  //get tmp prod Id map with no product detail
  getTmpMap(item) {
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
      this.tmpProdID.get(item.ProdId).beginDate = neworder.beginDate
      this.tmpProdID.get(item.ProdId).endDate = neworder.endDate
    }
  }

  processCartList(control,item) {
    // if cartList is not empty
    if (this.cartList.length > 0) {
      for (let i = 0; i < this.cartList.length; i++) {
        // if product already exists in cartList
        if (this.cartList[i].Title === item.Title) {
          control = true;
          this.cartList[i].Quantity = item.Quantity;
          this.cartList[i].Price = this.cartList[i].Quantity * item.Price;
          localStorage.setItem('cartList', JSON.stringify(this.cartList));
        }
      }
      // if product not in cartList
      if (control === false) {
        this.cartList.push(item);
        localStorage.setItem('cartList', JSON.stringify(this.cartList));
      }
    } else {
      // if nothing in cartList
      this.cartList = JSON.parse(localStorage.getItem('cartList'));
      this.cartList.push(item);
      localStorage.setItem('cartList', JSON.stringify(this.cartList));
    }
  }
  //if product already exists in productTimetable
  updateProductTimetable(){
    this.productTimetable = JSON.parse(localStorage.getItem('productTimetable'));
    this.productTimetable.forEach(item => {
      if (this.tmpDetailID.get(item.prodDetailId) != null || this.tmpProdID.get(item.prodId) != null) {
        if (item.hasOwnProperty('prodDetailId')) {
          item.quantity = this.tmpDetailID.get(item.prodDetailId).quantity
          item.beginDate = this.tmpDetailID.get(item.prodDetailId).beginDate
          item.endDate = this.tmpDetailID.get(item.prodDetailId).endDate
          this.tmpDetailID.delete(item.prodDetailId)
        } else if (!item.hasOwnProperty('prodDetailId')) {
          item.quantity = this.tmpProdID.get(item.prodId).quantity
          item.beginDate = this.tmpProdID.get(item.prodId).beginDate
          item.endDate = this.tmpProdID.get(item.prodId).endDate
          this.tmpProdID.delete(item.prodId)
        }
      }
    })
    this.addItemtoProductTimetable()
  }
  //if product is new for produtcTimetable
  addItemtoProductTimetable(){
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
  //add product with detail Id
  addQuantity(proddetail) {
    let prodId = proddetail['value'].Id
    let quantityvalue = proddetail['value'].Quantity
    this.processDetailIdMap(proddetail, prodId, quantityvalue)

    //this.detailId_DatepickerUpdate()
    //Calculate Time
    this.calculateTime()
    //
  }
  processDetailIdMap(proddetail, prodId, quantityvalue) {
    if (!this.map.has(prodId) && proddetail.valid && quantityvalue != 0) {
      let neworder = {
        id: prodId,
        quantity: quantityvalue,
        beginDate: this.minDate_start
      }
      this.map.set(prodId, neworder)
    } else if (this.map.has(prodId) && quantityvalue != 0 && quantityvalue <= proddetail['value'].AvailableStock) {
      this.map.get(prodId).quantity = quantityvalue
    } else {
      this.map.delete(prodId)
    }
  }
  // detailId_DatepickerUpdate() {
  //   if (this.map.size != 0) {
  //     this.dateStartControl = false;
  //   } else if (this.map.size == 0) {
  //     this.dateStartControl = true;
  //     this.dateReturnControl = true;
  //   }
  // }
  datetoYMD(date) {
    var d = date.getDate();
    var m = date.getMonth() + 1; //Month from 0 to 11
    var y = date.getFullYear();
    return '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
  }
  //calculate disabled dates and update datepicker for products with detail Id
  calculateTime() {
    let hiringdetail = []
    this.getDetailIdlist(hiringdetail)
    if (this.map.size != 0) {
      this.productService.calculateTime(hiringdetail).subscribe(
        res => {

          this.unavailableDates = res
          this.detailId_processUnavailableDates()
          this.detailId_processDisabledDates()
          this.detailId_UpdateAddCartButton()
        },
        err => {

        }
      );
    }else if(this.map.size==0){
      this.disabledDates=[]
      this.detailId_processDisabledDates()
    }
  }
  getDetailIdlist(hiringdetail) {
    let iterable = this.map.values()
    let current = iterable.next().value
    while (current != null) {
      let productHiringDetail = {
        prodDetailid: current.id,
        quantity: current.quantity,
        beginDate: this.utcDate_start.toDateString()
      }
      hiringdetail.push(productHiringDetail)
      current = iterable.next().value
    }
    this.prodDetailIdlist = hiringdetail
  }
  detailId_processUnavailableDates() {
    let tmpDates = []
    let tmpSet = new Set()
    for (let i = 0; i < this.unavailableDates.length; i++) {
      let myMoment = moment(this.unavailableDates[i], 'YYYY-MM-DD')
      tmpDates.push(myMoment.toDate())
      tmpSet.add(myMoment.toDate().toString())
    }
    this.disabledDates = tmpDates
    this.mySet = tmpSet
  }
  detailId_processDisabledDates() {
    for (let i = 0; i < this.disabledDates.length; i++) {
      let myMoment = moment(this.disabledDates[i], 'YYYY-MM-DD')
      if (myMoment.startOf('day'
      ).isAfter(moment(this.minDate_start).startOf('day'))) {
        let myMoment_date = myMoment.toDate()
        myMoment_date.setDate(myMoment.toDate().getDate()-1);
        this.maxDate_return = myMoment_date
        break
      }
    }
    if (this.disabledDates.length == 0 || this.dateStartInput==null) {
      this.maxDate_return = this.maxDate_start
    }
    
  }
  detailId_UpdateAddCartButton() {
    if (this.startMoment != null && this.returnMoment != null) {
      if ((this.startMoment.startOf('day').isAfter(this.returnMoment.startOf('day'))) || this.mySet.has(this.startMoment.toDate().toString()) || this.mySet.has(this.returnMoment.toDate().toString()) || this.checkDisabledDates()) {
        this.addToCartControl = true
      } else {
        this.addToCartControl = false
      }
    }
  }
  updateAddCartButton() {
    if (this.startMoment != null && this.returnMoment != null) {
      if (this.startMoment.startOf('day').isAfter(this.returnMoment.startOf('day'))) {
        this.addToCartControl = true
      } else {
        this.addToCartControl = false
      }
    }
  }
  //add product Without detail Id
  quantitycheck(proddetail) {
    let hiringdetail = []
    //this.idDatepickerUpdate()
    this.getIdList(proddetail, hiringdetail)
    if (this.quantity != 0) {
      this.productService.calculateTime(hiringdetail).subscribe(
        res => {
          this.unavailableDates = res
          this.processUnavailableDates()
          this.updateAddCartButton()
        },
        err => {
        }
      );
    }
  }
  //without detail Id
  processUnavailableDates() {
    let tmpDates = []
    for (let i = 0; i < this.unavailableDates.length; i++) {
      let myMoment = moment(this.unavailableDates[i], 'YYYY-MM-DD')
      tmpDates.push(myMoment.toDate())
    }
    this.disabledDates = tmpDates
  }
  //without detail Id
  // idDatepickerUpdate() {
  //   if (this.quantity > 0) {
  //     this.dateStartControl = false;
  //     this.dateReturnControl = false;
  //   } else if (this.quantity == 0) {
  //     this.dateStartControl = true;
  //     this.dateReturnControl = true;
  //   }
  // }
  //without detail Id
  getIdList(proddetail, hiringdetail) {
    let productHiringDetail = {
      prodId: proddetail.prodId,
      quantity: this.quantity,
      beginDate: this.utcDate_start.toDateString()
    }
    hiringdetail.push(productHiringDetail)
  }
  //when start date input changes
  onStartChange(value) {
    this.dateStartInput = value;
    this.isAlert=false
    this.minDate_return = value;
    this.startMoment = moment(this.dateStartInput)
    this.startMomentDay=this.startMoment.day()
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
    this.updateAddCartButton()
  }
  //when return date input changes
  onReturnChange(value) {
    this.isAlert=false
    this.dateReturnInput = value;
    this.returnMoment = moment(this.dateReturnInput)
    this.returnMomentDay=this.returnMoment.day()
    this.updateAddCartButton()
  }
  //check if the previous date inputs are disabled now
  checkDisabledDates() {
    for (let i = 0; i < this.disabledDates.length; i++) {
      if (moment(this.disabledDates[i]).startOf('day').isAfter(this.startMoment.startOf('day')) && moment(this.disabledDates[i]).startOf('day').isBefore(this.returnMoment.startOf('day')) && !this.startMoment.startOf('day').isSame(this.returnMoment.startOf('day'))) {
        return true
      }
    }

    return false
  }

}