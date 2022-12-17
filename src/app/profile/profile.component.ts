import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { IPost } from '../posts/post.model';

import { AuthService } from '../auth/auth.service';
import { PostsService } from '../posts/posts.service';
import { UIService } from '../shared/ui.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  user = this.authService.getUser();
  private postsSubscription: Subscription[] = [];
  availablePosts: IPost[] = [];

  constructor(
    private authService: AuthService,
    private postsService: PostsService,
    private uiService: UIService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.postsSubscription.push(
      this.postsService.getAllByUserId(this.user.uid).subscribe({
        next: (data) =>
          data.forEach((el) => {
            this.isLoading = false;
            this.availablePosts.push(el.data() as IPost);
          }),

        error: (err) => {
          console.log(err);
          this.isLoading = false;
          this.uiService.showSnackbar(
            'Fetching posts failed, please try again later.',
            null,
            3000
          );
        },
        complete: () => {
          this.isLoading = false;
          console.log('Fetch completed!');
        },
      })
    );
  }

  ngOnDestroy(): void {
    if (this.postsSubscription.length > 0) {
      this.postsSubscription.forEach((sub) => sub.unsubscribe());
    }
  }
}
