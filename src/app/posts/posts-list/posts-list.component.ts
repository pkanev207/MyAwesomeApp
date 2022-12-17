import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { IPost } from '../post.model';
import { PostsService } from '../posts.service';
import { UIService } from 'src/app/shared/ui.service';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css'],
})
export class PostsListComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  private postsSubscription: Subscription[] = [];
  availablePosts: IPost[] = [];

  constructor(
    private postsService: PostsService,
    private uiService: UIService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.postsSubscription.push(
      this.postsService.getAll().subscribe({
        next: (posts: IPost[]) => {
          this.availablePosts = posts;
          this.isLoading = false;
        },
        error: (err) => {
          console.log(err);
          this.isLoading = false;
          this.uiService.showSnackbar(
            'Fetching posts failed, please try again later.',
            null,
            3000
          );
        },
        complete: () => console.log('Fetch completed!'),
      })
    );
  }

  ngOnDestroy(): void {
    if (this.postsSubscription.length > 0) {
      this.postsSubscription.forEach((sub) => sub.unsubscribe());
    }
  }
}
