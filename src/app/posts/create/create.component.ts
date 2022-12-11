import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { PostsService } from '../posts.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  isLoading = false;

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    this.postsService.create(form.value);
  }
}
