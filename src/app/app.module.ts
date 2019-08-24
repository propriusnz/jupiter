import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule, MatInputModule, MatFormFieldModule, MatNativeDateModule, MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgxJsonLdModule } from 'ngx-json-ld';

// All service follow
import {ProductService} from './service/product.service';


// All components follow
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './fcomponents/basic/navbar/navbar.component';
import { HomepageComponent } from './fcomponents/pages/homepage/homepage.component';
import { FaqComponent } from './fcomponents/pages/faq/faq.component';
import { ContactUsComponent } from './fcomponents/pages/contactUs/contactUs.component';
import { ProductListComponent } from './fcomponents/products/productList/productList.component';
import { AboutUsComponent } from './fcomponents/pages/aboutUs/aboutUs.component';
import { ProductComponent } from './fcomponents/products/product/product.component';
import { FooterComponent } from './fcomponents/basic/footer/footer.component';
import { Shopping_cartComponent } from './fcomponents/shopping_cart/shopping_cart.component';
import { UserInfoComponent} from './fcomponents/userInfo/userInfo.component';
import { GalleryComponent} from './fcomponents/gallery/gallery.component';
import { GalleryListComponent } from './fcomponents/gallery-list/gallery-list.component';
import { AdminComponent } from './fcomponents/admin/admin.component';
import { LoginComponent } from './fcomponents/login/login.component';
import { FaqDialogComponent } from './fcomponents/AdminDialogs/FaqDialog/FaqDialog.component';
import { GalleryDialogComponent } from './fcomponents/AdminDialogs/galleryDialog/galleryDialog.component';
import { ProductDialogComponent } from './fcomponents/AdminDialogs/productDialog/productDialog.component';
import { CartDialogComponent } from './fcomponents/AdminDialogs/CartDialog/CartDialog.component';
import { ShoppingCheckoutComponent } from './fcomponents/shopping-checkout/shopping-checkout.component';
import { ThankYouComponent } from './fcomponents/thankYou/thankYou.component';
import {LoadingComponent} from './fcomponents/basic/loading/loading.component';

// admin components
import { AdminFaqComponent } from './fcomponents/admin/admin-faq/admin-faq.component';
import { AdminProductsComponent } from './fcomponents/admin/admin-products/admin-products.component';
import { AdminSideBarComponent } from './fcomponents/admin/admin-sideBar/admin-sideBar.component';
import { AdminCartComponent } from './fcomponents/admin/admin-cart/admin-cart.component';
import { AdminDashboardComponent } from './fcomponents/admin/admin-dashboard/admin-dashboard.component';
import { AdminGalleriesComponent } from './fcomponents/admin/admin-galleries/admin-galleries.component';

// All Routes follow
const appRoutes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomepageComponent},
  {path: 'contactUs', component: ContactUsComponent},
  {path: 'aboutUs', component: AboutUsComponent},
  {path: 'faq', component: FaqComponent},
  // {path: 'category/:id', component: ProductListComponent, data : {some_data : 'category'}},
  {path: 'products/:productTypeId/:categoryTypeId', component: ProductListComponent, data : {some_data : 'products'}},
  {path: 'services', component: ProductListComponent, data : {some_data : 'service'}},
  {path: 'packages', component: ProductListComponent, data : {some_data : 'package'}},
  {path: 'product/:id', component: ProductComponent},
  {path: 'galleries', component: GalleryListComponent},
  {path: 'galleries/:id', component: GalleryComponent},
  {path: 'admin', component: AdminComponent,
    children: [
      {path: '', redirectTo: 'adminDashboard', pathMatch: 'full'},
      {path: 'adminDashboard', component: AdminDashboardComponent},
      {path: 'adminFaq', component: AdminFaqComponent},
      {path: 'adminProducts/:productTypeId', component: AdminProductsComponent},
      {path: 'adminCarts', component: AdminCartComponent},
      {path: 'adminGalleries', component: AdminGalleriesComponent},
    ]
  },
  {path: 'login', component: LoginComponent},
  {path: 'checkout', component: ShoppingCheckoutComponent},
  {path: 'thankYou', component: ThankYouComponent},
  {path: '**', component: HomepageComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomepageComponent,
    FaqComponent,
    ContactUsComponent,
    ProductListComponent,
    AboutUsComponent,
    ProductComponent,
    FooterComponent,
    Shopping_cartComponent,
    UserInfoComponent,
    GalleryComponent,
    GalleryListComponent,
    AdminComponent,
    LoginComponent,
    FaqDialogComponent,
    GalleryDialogComponent,
    ProductDialogComponent,
    CartDialogComponent,
    ShoppingCheckoutComponent,
    ThankYouComponent,
    LoadingComponent,
    AdminFaqComponent,
    AdminProductsComponent,
    AdminSideBarComponent,
    AdminCartComponent,
    AdminDashboardComponent,
    AdminGalleriesComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    NgxJsonLdModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatDialogModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes, {scrollPositionRestoration: 'enabled'}),
    HttpClientModule
  ],
  providers: [
    ProductService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    FaqDialogComponent,
    GalleryDialogComponent,
    ProductDialogComponent,
    CartDialogComponent
  ]
})
export class AppModule { }
