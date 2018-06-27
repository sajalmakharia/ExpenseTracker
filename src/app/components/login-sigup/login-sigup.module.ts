import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginSigupRoutingModule } from './login-sigup-routing.module';
import { LoginSigupComponent } from './login-sigup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgxSpinnerModule} from 'ngx-spinner';
@NgModule({
  imports: [
    CommonModule,
    LoginSigupRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ],
  declarations: [LoginSigupComponent]
})
export class LoginSigupModule { }
