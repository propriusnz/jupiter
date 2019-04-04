import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule,MatInputModule,MatFormFieldModule,MatNativeDateModule, MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule,Routes }   from '@angular/router';
import {HttpClientModule} from '@angular/common/http';

// All service follow
import{ProductService} from './service/product.service'


//All components follow
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './fcomponents/basic/navbar/navbar.component';
import { HomepageComponent } from './fcomponents/pages/homepage/homepage.component';
import { FaqComponent } from './fcomponents/pages/faq/faq.component';
import { ContactUsComponent } from './fcomponents/pages/contactUs/contactUs.component';
import { ProductListComponent } from './fcomponents/products/productList/productList.component'
import { AboutUsComponent } from './fcomponents/pages/aboutUs/aboutUs.component';
import { ProductComponent } from './fcomponents/products/product/product.component';
import { FooterComponent } from './fcomponents/basic/footer/footer.component';
import { Shopping_cartComponent } from './fcomponents/shopping_cart/shopping_cart.component';
import { UserInfoComponent} from './fcomponents/userInfo/userInfo.component';
import { GalleryComponent} from './fcomponents/gallery/gallery.component';
import { GalleryListComponent } from './fcomponents/gallery-list/gallery-list.component';
import { AdminComponent } from './fcomponents/admin/admin.component';
import { LoginComponent } from './fcomponents/login/login.component'
import { FaqDialogComponent } from './fcomponents/AdminDialogs/FaqDialog/FaqDialog.component'
import { GalleryDialogComponent } from './fcomponents/AdminDialogs/galleryDialog/galleryDialog.component'
import { ProductDialogComponent } from './fcomponents/AdminDialogs/productDialog/productDialog.component'

//All Routes follow

//All Routes follow
const appRoutes: Routes=[
  {path:'contactUs', component:ContactUsComponent},
  {path:'aboutUs', component:AboutUsComponent},
  {path:'faq', component:FaqComponent},
  {path:'homepage', component:HomepageComponent},
  {path:'', component:HomepageComponent},
  {path:'category/:id', component:ProductListComponent,data : {some_data : 'category'}},
  {path:'hire', component:ProductListComponent,data : {some_data : 'hire'}},
  {path:'services', component:ProductListComponent,data : {some_data : 'service'}},
  {path:'packages',component:ProductListComponent,data : {some_data : 'package'}},
  {path:'product/:id',component:ProductComponent},
  {path:'shoppingCart',component:Shopping_cartComponent},
  {path:'userInfo',component:UserInfoComponent},
  {path:'galleries', component:GalleryListComponent},
  {path:'galleries/:id',component:GalleryComponent},
  {path:'admin',component:AdminComponent},
  {path:'login',component:LoginComponent}
]

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
    ProductDialogComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatDialogModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes,{scrollPositionRestoration: 'enabled'}),
    HttpClientModule
  ],
  providers: [
    ProductService
  ],
  bootstrap: [AppComponent],
  entryComponents:[
    FaqDialogComponent,
    GalleryDialogComponent,
    ProductDialogComponent
  ]
})
export class AppModule { }
