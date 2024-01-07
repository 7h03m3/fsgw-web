import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { MaterialModule } from '../shared/material.module';
import { RecaptchaV3Module } from 'ng-recaptcha';

@NgModule({
  declarations: [UserLoginComponent],
  imports: [CommonModule, MaterialModule, UserRoutingModule, RecaptchaV3Module],
})
export class UserModule {}
