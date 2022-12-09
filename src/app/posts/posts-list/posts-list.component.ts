import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { IPost } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css'],
})
export class PostsListComponent implements OnInit, OnDestroy {
  private postsSubscription: Subscription[] = [];
  availablePosts: IPost[] = [];

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.postsSubscription.push(
      this.postsService.getAll().subscribe({
        next: (posts: IPost[]) => {
          this.availablePosts = posts;
          console.log(this.availablePosts);
        },
        error: () => {},
        complete: () => console.log('Fetch completed!'),
      })
    );
  }

  ngOnDestroy(): void {
    this.postsSubscription.forEach((sub) => sub.unsubscribe());
  }
}
