import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { PostsListComponent } from './posts-list/posts-list.component';

const routes: Routes = [
  { path: 'posts', component: PostsListComponent },
  { path: 'posts/create', component: CreateComponent },
  { path: 'posts/:id', component: PostDetailsComponent },
  { path: 'posts/:id/edit', component: EditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostsRoutingModule {}
