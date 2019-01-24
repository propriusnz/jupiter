import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//All imports follow

// All service follow

//All components follow
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NavbarComponent} from './fcomponents/basic/navbar/navbar.component';
import {HomepageComponent} from './fcomponents/pages/homepage/homepage.component';
import { FaqComponent } from './fcomponents/pages/faq/faq.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomepageComponent,
    FaqComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
