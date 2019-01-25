import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//All imports follow
import {MatDatepickerModule} from '@angular/material/datepicker';

// All service follow

//All components follow
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NavbarComponent} from './fcomponents/basic/navbar/navbar.component';
import {HomepageComponent} from './fcomponents/pages/homepage/homepage.component';
import { FaqComponent } from './fcomponents/pages/faq/faq.component';
import {ContactUsComponent} from './fcomponents/pages/contactUs/contactUs.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomepageComponent,
    FaqComponent,
    ContactUsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
