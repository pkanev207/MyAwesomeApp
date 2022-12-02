import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit, OnDestroy {
  @Output() closeSidenav = new EventEmitter<void>();
  isAuth = false;
  authSubscription?: Subscription;


  constructor() { }

  ngOnInit(): void { }

  onClose() {
    this.closeSidenav.emit();
  }

  onLogout() {
    this.onClose();
    // this.authService.logout();
  }

  ngOnDestroy(): void {
    // this.authSubscription?.unsubscribe();
  }

}
