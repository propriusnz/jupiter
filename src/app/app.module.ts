import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Angular Material
import { MatDatepickerModule, MatInputModule, MatFormFieldModule, MatNativeDateModule, MatDialogModule, MatButtonModule, MatIconModule, MatDialogRef } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { CalendarUtilsModule } from './calendar-utils/module';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgxJsonLdModule } from 'ngx-json-ld';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
// All service follow
import { ProductService } from './service/product.service';
import { MatchService } from './service/match.service';
import { AuthService } from './service/auth.service';
import { AdminPanelService } from './service/admin-panel.service';
// All Guard follow
import { AdminAuthGuard } from './guards/admin-auth.guard'
import { UserAuthGuard } from './guards/user-auth.guard';
import { PaymentAuthGuard } from './guards/payment-auth.guard';
//All Data Follow
import { DataService } from './service/data.service';
// All components follow
import { AppComponent } from './app.component';
import { NavbarComponent } from './fcomponents/basic/navbar/navbar.component';
import { HomepageComponent } from './fcomponents/pages/homepage/homepage.component';
import { FaqComponent } from './fcomponents/pages/faq/faq.component';
import { ContactUsComponent } from './fcomponents/pages/contactUs/contactUs.component';
import { ProductListComponent } from './fcomponents/products/productList/productList.component';
import { AboutUsComponent } from './fcomponents/pages/aboutUs/aboutUs.component';
import { ProductComponent } from './fcomponents/products/product/product.component';
import { FooterComponent } from './fcomponents/basic/footer/footer.component';
import { ShoppingCartComponent } from './fcomponents/shopping-checkout/shopping-cart/shopping-cart.component';
import { ShoppingUserinfoComponent } from './fcomponents/shopping-checkout/shopping-userinfo/shopping-userinfo.component'
import { GalleryDetailComponent } from './fcomponents/gallery/gallery-detail/gallery-detail.component';
import { GalleryListComponent } from './fcomponents/gallery/gallery-list/gallery-list.component';
import { AdminComponent } from './fcomponents/admin/admin.component';
import { AdminLoginComponent } from './fcomponents/admin/admin-login/admin-login.component';
import { FaqdialogComponent } from './fcomponents/admin/admin-dialogs/faq-dialog/faq-dialog.component';
import { GallerydialogComponent } from './fcomponents/admin/admin-dialogs/gallery-dialog/gallery-dialog.component';
import { ProductdialogComponent } from './fcomponents/admin/admin-dialogs/product-dialog/product-dialog.component';
import { CartdialogComponent } from './fcomponents/admin/admin-dialogs/cart-dialog/cart-dialog.component';
import { ShoppingCheckoutComponent } from './fcomponents/shopping-checkout/shopping-checkout.component';
import { ThankYouComponent } from './fcomponents/thankYou/thankYou.component';
import { LoadingComponent } from './fcomponents/basic/loading/loading.component';
import { UserregistrationDialogComponent } from './fcomponents/basic/user-dialog/userregistration-dialog/userregistration-dialog.component';
import { UserloginDialogComponent } from './fcomponents/basic/user-dialog/userlogin-dialog/userlogin-dialog.component';
// admin components
import { AdminfaqComponent } from './fcomponents/admin/admin-faq/admin-faq.component';
import { AdminProductsComponent } from './fcomponents/admin/admin-products/admin-products.component';
import { AdminSideBarComponent } from './fcomponents/admin/admin-sideBar/admin-sideBar.component';
import { AdminCartComponent } from './fcomponents/admin/admin-cart/admin-cart.component';
import { AdminDashboardComponent } from './fcomponents/admin/admin-dashboard/admin-dashboard.component';
import { AdminGalleriesComponent } from './fcomponents/admin/admin-galleries/admin-galleries.component';
import { AdminImagesComponent } from './fcomponents/admin/admin-images/admin-images.component';
import { ForgotPasswordComponent } from './fcomponents/basic/user-dialog/forgot-password/forgot-password.component';
import { PaymentOptionsComponent } from './fcomponents/payment-options/payment-options.component';
import { EmailsentDialogComponent } from './fcomponents/basic/user-dialog/emailsent-dialog/emailsent-dialog.component';
import { ResetPasswordComponent } from './fcomponents/reset-password/reset-password.component';
import { UserDashboardComponent } from './fcomponents/user-dashboard/user-dashboard.component';
import { UserProfileComponent } from './fcomponents/user-dashboard/user-profile/user-profile.component';
import { OrderHistoryComponent } from './fcomponents/user-dashboard/order-history/order-history.component';
import { ManagePasswordComponent } from './fcomponents/user-dashboard/manage-password/manage-password.component';
import { ItemDetailComponent } from './fcomponents/user-dashboard/item-detail/item-detail.component';
import { PaymentResultComponent } from './fcomponents/payment-result/payment-result.component';
import { AdminUserListComponent } from './fcomponents/admin/admin-user-list/admin-user-list.component';
import { ProfileDialogComponent } from './fcomponents/admin/admin-dialogs/profile-dialog/profile-dialog.component';
import { ChildProductsDialogComponent } from './fcomponents/admin/admin-dialogs/child-products-dialog/child-products-dialog.component';
import { PopupDialogComponent } from './fcomponents/basic/user-dialog/popup-dialog/popup-dialog.component';
import { AdminHireCalendarDialogComponent } from './fcomponents/admin/admin-dialogs/admin-hire-calendar-dialog/admin-hire-calendar-dialog.component';
// import { PopoverModule } from 'ngx-bootstrap/popover';
import { TermsConditionsComponent } from './fcomponents/basic/user-dialog/terms-conditions/terms-conditions.component';
import { AdminVideoComponent } from './fcomponents/admin/admin-videos/admin-video.component';
import { AdminContactListComponent } from './fcomponents/admin/admin-contact-list/admin-contact-list.component';
import { NewUserInfoDialogComponent } from './fcomponents/basic/user-dialog/new-user-info-dialog/new-user-info-dialog.component';




// All Routes follow
const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomepageComponent },
  { path: 'contactUs', component: ContactUsComponent },
  { path: 'aboutUs', component: AboutUsComponent },
  { path: 'faq', component: FaqComponent },
  // {path: 'category/:id', component: ProductListComponent, data : {some_data : 'category'}},
  { path: 'products/:productTypeId/:categoryTypeId', component: ProductListComponent, data: { some_data: 'products' } },
  { path: 'services/:productTypeId/:categoryTypeId', component: ProductListComponent, data: { some_data: 'services' } },
  // { path: 'testing', component: AdminHireCalendarDialogComponent },
  { path: 'packages', component: ProductListComponent, data: { some_data: 'package' } },
  { path: 'product/:id', component: ProductComponent },
  { path: 'galleries', component: GalleryListComponent },
  { path: 'galleries/:id', component: GalleryDetailComponent },
  {
    path: 'admin', component: AdminComponent, canActivate: [AdminAuthGuard],
    children: [
      { path: '', redirectTo: 'adminDashboard', pathMatch: 'full' },
      { path: 'adminDashboard', component: AdminDashboardComponent },
      { path: 'adminFaq', component: AdminfaqComponent },
      { path: 'adminProducts/:productTypeId', component: AdminProductsComponent },
      { path: 'adminCarts', component: AdminCartComponent },
      { path: 'adminGalleries', component: AdminGalleriesComponent },
      { path: 'adminImages', component: AdminImagesComponent },
      { path: 'adminUserlist', component: AdminUserListComponent },
      { path: 'admincontactlist', component: AdminContactListComponent },
      { path: 'video', component: AdminVideoComponent }
    ]
  },
  { path: 'login', component: AdminLoginComponent },
  { path: 'reset', component: ResetPasswordComponent },
  { path: 'userDashboard', component: UserDashboardComponent, canActivate: [UserAuthGuard] },
  { path: 'checkout', component: ShoppingCheckoutComponent },
  { path: 'thankYou', component: ThankYouComponent },
  { path: 'paymentoptions', component: PaymentOptionsComponent },
  { path: 'paymentresult', component: PaymentResultComponent, canActivate: [PaymentAuthGuard] },
  { path: '**', component: HomepageComponent }
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
    ShoppingCartComponent,
    ShoppingUserinfoComponent,
    GalleryDetailComponent,
    GalleryListComponent,
    AdminComponent,
    AdminLoginComponent,
    FaqdialogComponent,
    GallerydialogComponent,
    ProductdialogComponent,
    CartdialogComponent,
    ShoppingCheckoutComponent,
    ThankYouComponent,
    LoadingComponent,
    AdminfaqComponent,
    AdminProductsComponent,
    AdminSideBarComponent,
    AdminCartComponent,
    AdminDashboardComponent,
    AdminGalleriesComponent,
    AdminImagesComponent,
    UserregistrationDialogComponent,
    UserloginDialogComponent,
    ForgotPasswordComponent,
    PaymentOptionsComponent,
    EmailsentDialogComponent,
    ResetPasswordComponent,
    UserDashboardComponent,
    UserProfileComponent,
    OrderHistoryComponent,
    ManagePasswordComponent,
    ItemDetailComponent,
    PaymentResultComponent,
    AdminUserListComponent,
    ProfileDialogComponent,
    ChildProductsDialogComponent,
    PopupDialogComponent,
    AdminHireCalendarDialogComponent,
    TermsConditionsComponent,
    AdminVideoComponent,
    AdminContactListComponent,
    NewUserInfoDialogComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    NgxJsonLdModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatNativeDateModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatSlideToggleModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatRadioModule,
    MatSelectModule,
    MatSnackBarModule,
    MatCheckboxModule,
    DragDropModule,
    RouterModule.forRoot(appRoutes, { scrollPositionRestoration: 'enabled' }),
    HttpClientModule,
    BsDatepickerModule.forRoot(),
    CalendarUtilsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),

    BsDatepickerModule.forRoot(),
    // PopoverModule.forRoot()
  ],
  providers: [
    ProductService, DataService, MatchService, AdminAuthGuard, UserAuthGuard, PaymentAuthGuard, AuthService, AdminPanelService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    AdminHireCalendarDialogComponent,
    FaqdialogComponent,
    GallerydialogComponent,
    ProductdialogComponent,
    CartdialogComponent,
    UserregistrationDialogComponent,
    UserloginDialogComponent,
    ForgotPasswordComponent,
    EmailsentDialogComponent,
    ProfileDialogComponent,
    EmailsentDialogComponent,
    ItemDetailComponent,
    ChildProductsDialogComponent,
    ItemDetailComponent,
    PopupDialogComponent,
    TermsConditionsComponent,
    NewUserInfoDialogComponent
  ],
})
export class AppModule { }