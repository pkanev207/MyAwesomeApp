import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { IPost } from '../post.model';
import { IUser } from 'src/app/auth/user.model';

import { PostsService } from '../posts.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css'],
})
export class PostDetailsComponent implements OnInit, OnDestroy {
  post!: IPost;
  user!: IUser;
  id!: string;
  isAuthor: boolean = false;
  canLike: boolean = false;
  private detailsPageSubs: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postsService: PostsService,
    private userService: AuthService
  ) {}

  ngOnInit(): void {
    this.detailsPageSubs.push(
      this.route.params
        .pipe(
          map((params: Params) => {
            return params;
          })
        )
        .subscribe({
          next: (params) => {
            this.id = params['id'];
          },
          error: () => {},
          complete: () => {},
        })
    );

    this.detailsPageSubs.push(
      this.postsService.getOneById(this.id).subscribe({
        next: (res) => {
          this.post = res.payload.data() as IPost;
          this.user = this.userService.getUser();
          this.isAuthor = this.post.uid === this.user.uid;
        },
        error: () => {},
        complete: () => {},
      })
    );
  }

  logger() {
    console.log(this.id);
    console.log(this.post);
    console.log(this.user);
    console.log(this.isAuthor);
  }

  onDelete() {
    if (confirm('Delete this post?') == true) {
      this.postsService.del(this.id);
    } else {
      return;
    }
  }

  ngOnDestroy(): void {
    this.detailsPageSubs.forEach((sub) => sub.unsubscribe());
  }
}
