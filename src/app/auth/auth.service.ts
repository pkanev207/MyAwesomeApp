import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthData } from './auth-data.model';
// import { TrainingService } from '../training/training.service';
import { UIService } from '../shared/ui.service';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authChange = new Subject<boolean>();
  private isAuthenticated = false;

  user: User | any;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    // private trainingService: TrainingService,
    private snackbar: MatSnackBar,
    private uiService: UIService
  ) {}

  initAuthListener() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        console.log(user.email);
        this.user = {
          name: user?.displayName,
          email: user?.email,
          uid: user?.uid,
        };

        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/profile']);
      } else {
        this.user = {};

        // this.trainingService.cancelSubscriptions();
        this.authChange.next(false);
        this.router.navigate(['']);
        this.isAuthenticated = false;
      }
    });
  }

  registerUser(authData: AuthData) {
    this.uiService.loadingStateChanged.next(true);
    this.afAuth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then((res) => {
        console.log(res);
        // this.user = {
        //   name: res.user?.displayName,
        //   email: res.user?.email,
        //   uid: res.user?.uid,
        // };
        // console.log(this.user);

        // this.uiService.loadingStateChanged.next(false);
      })
      .catch((error) => {
        console.log(error);
        // this.uiService.loadingStateChanged.next(false);
        // this.uiService.showSnackbar(error.message, null, 3000);
        // this.snackbar.open(error.message, null!, { duration: 3000 });
      });
  }

  login(authData: AuthData) {
    // this.uiService.loadingStateChanged.next(true);
    this.afAuth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then((res) => {
        console.log(res);

        // this.user = {
        //   name: res.user?.displayName,
        //   email: res.user?.email,
        //   uid: res.user?.uid,
        // };
        // console.log(this.user);

        // this.router.navigate(['']);
        // this.uiService.loadingStateChanged.next(false);
      })
      .catch((error) => {
        console.log(error);
        // this.uiService.loadingStateChanged.next(false);
        // this.uiService.showSnackbar(error.message, null, 3000);
        // this.snackbar.open(error.message, null!, { duration: 3000 });
      });
  }

  logout() {
    this.afAuth.signOut();
    this.user = {};
    // this.router.navigate(['/login']);
  }

  isAuth() {
    return this.isAuthenticated;
  }

  getUser() {
    return { ...this.user };
  }

  // get Iuser() {
  //   return { ...this.user };
  // }
}
