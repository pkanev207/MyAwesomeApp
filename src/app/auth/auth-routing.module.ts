import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  AngularFireAuthGuard,
  redirectLoggedInTo,
  canActivate,
} from '@angular/fire/compat/auth-guard';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const redirectLoggedInToProfile = () => redirectLoggedInTo(['profile']);

const routes: Routes = [
  {
    path: 'auth/register',
    component: RegisterComponent,
    canActivate: [AngularFireAuthGuard],
    data: { title: 'Register Page', authGuardPipe: redirectLoggedInToProfile },
  },
  {
    path: 'auth/login',
    component: LoginComponent,
    canActivate: [AngularFireAuthGuard],
    data: { title: 'Login Page', authGuardPipe: redirectLoggedInToProfile },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
