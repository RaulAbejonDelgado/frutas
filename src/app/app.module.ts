import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";//para hacer uso del banana in a box
import {HttpClientModule} from '@angular/common/http'; //peticiones http asincronas

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FrutaComparadorComponent } from './components/fruta-comparador/fruta-comparador.component';
import { FrutaCardComponent } from './components/fruta-card/fruta-card.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BackofficeComponent } from './components/backoffice/backoffice.component';
import { LoginComponent } from './components/login/login.component';
import { BackofficeGuard } from './guards/backoffice.guard';
import { FrutaEditableComponent } from './components/fruta-editable/fruta-editable.component';
import { DestacarDirective } from './directives/destacar.directive';

@NgModule({
  declarations: [
    AppComponent,
    FrutaComparadorComponent,
    FrutaCardComponent,
    NavbarComponent,
    BackofficeComponent,
    LoginComponent,
    FrutaEditableComponent,
    DestacarDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    BackofficeGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
