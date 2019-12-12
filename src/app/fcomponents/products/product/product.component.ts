import { Component, OnInit, ViewChild, ElementRef, Inject, PLATFORM_ID, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProductService } from '../../../service/product.service';
import { Validators, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { environment } from '../../../../environments/environment.prod';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { setTheme } from 'ngx-bootstrap/utils';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  productId: number;
  productDetail: any;
  prodMediaUrl: any;
  quantity = 0 ;
  isprodAdded = false;
  isStockAvailable = true;
  cartList = [];
  cartForm: FormGroup;
  cartItems: FormArray;
  isInputZero = true;
  isLoading = true;
  rightCarouselControlPosition: number;
  baseImageLink = environment.baseLink;
  public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  minDate: Date;
  maxDate: Date;
  
  @ViewChild ('imageContainer') imageContainer: ElementRef;
  @ViewChild ('prodImage') prodImage: ElementRef;
  @ViewChild ('rightControl') rightControl: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
	private formBuilder: FormBuilder,
  ) {
	this.productId = this.route.snapshot.params['id'];
	setTheme('bs4');
	this.minDate = new Date();
    this.maxDate = new Date();
    this.minDate.setDate(this.minDate.getDate());
	this.maxDate.setDate(this.maxDate.getDate() + 30);
	this.dpConfig.containerClass = 'theme-orange';
  }
  ngOnInit() {
    this.cartForm = this.formBuilder.group({
	  cartItems: this.formBuilder.array([]),
	  dateRange: ['', Validators.required]
    });
    // get the detail of product
    this.productService.showProduct(this.productId).subscribe(
      (res) => {
        this.isLoading = false;
        this.productDetail = res;
        this.createItem(res);
        this.prodMediaUrl =  this.productDetail.productMedia;
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
            Title: prod.productDetail1,
            Quantity: [0, [Validators.min(0), Validators.max(prod.availableStock), Validators.required]],
            Price: (prod.discount && prod.discount > 0) ? prod.price - prod.discount : prod.price,
            Discount: prod.discount,
			AvailableStock: prod.availableStock
          })
        );
      }
	});
	console.log(res);
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
      // localStorage.setItem('userId', 'aaa ')
  }
  // add product into a list
  manageCartProds() {
    const newCartList = [];
      // if product detail exist
    if (this.productDetail['productDetail'] && this.productDetail['productDetail'].length !== 0) {
      this.cartForm.controls.cartItems['value'].forEach(cartItem => {
        const item = {
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
    this.isStockAvailable = true;
    this.isprodAdded = true;
    setTimeout( () => {
      this.isprodAdded = false;
      }, 1000);
      list.forEach(item => {
        let a = false;
        // if cartList if not empty
        if (this.cartList.length > 0) {
          for (let i = 0; i < this.cartList.length; i++) {
            // if product already exists in cartList
            if (this.cartList[i].Title === item.Title) {
              a = true;
              this.cartList[i].Quantity += item.Quantity;
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
  
}

