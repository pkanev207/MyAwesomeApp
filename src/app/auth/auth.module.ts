import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [RegisterComponent, LoginComponent],
  imports: [
    ReactiveFormsModule,
    SharedModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
