import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IPost } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit, OnDestroy {
  post!: IPost;
  private currentPostSubs!: Subscription;
  isLoading = false;

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.currentPostSubs = this.postsService.getCurrentPost().subscribe({
      next: (post: {}) => {
        this.post = post as IPost;
      },
      error: (error: any) => {
        console.log(error);
      },
      complete: () => {},
    });
  }

  onSubmit(form: NgForm) {
    this.postsService.update(this.post.id!, {
      title: form.value.title,
      description: form.value.description,
      url: form.value.url,
    });
  }

  ngOnDestroy(): void {
    if (this.currentPostSubs) {
      this.currentPostSubs.unsubscribe();
    }
  }
}
