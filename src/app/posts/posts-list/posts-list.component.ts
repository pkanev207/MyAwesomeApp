import { Component, OnInit } from '@angular/core';

import { PostsService } from '../posts.service';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css'],
})
export class PostsListComponent implements OnInit {
  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.postsService.getAll();
  }
}
