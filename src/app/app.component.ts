import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivationStart, Router } from '@angular/router';
import { filter, map } from 'rxjs';

import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Blog Post';

  constructor(
    private authService: AuthService,
    private router: Router,
    private pageTitle: Title
  ) {
    this.router.events
      .pipe(
        filter((e): e is ActivationStart => e instanceof ActivationStart),
        map((e) => e.snapshot.data?.['title']),
        filter((d) => !!d)
      )
      .subscribe((pageTitle) => {
        this.pageTitle.setTitle(pageTitle);
      });
  }

  ngOnInit(): void {
    this.authService.initAuthListener();
  }
}
