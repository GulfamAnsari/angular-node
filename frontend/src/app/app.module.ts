import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { AppRoutingModule } from './app.rounting'
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http'
import { RequestOptions } from '@angular/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { LoginService } from './login/login.service';
import { SignupService } from './sign-up/sign-up.service';
import { AuthService } from './guards/auth.service';
import { SignUpComponent } from './sign-up/sign-up.component'

import { AuthRequestOptions } from './guards/auth.request.options';
import { AuthErrorHandler } from './guards/auth.error.handler';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule
  ],
  providers: [LoginService, SignupService, AuthService, {
    provide: RequestOptions,
    useClass: AuthRequestOptions
  }, 
  {
    provide: ErrorHandler, 
    useClass: AuthErrorHandler
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
