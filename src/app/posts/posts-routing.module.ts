import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { PostsListComponent } from './posts-list/posts-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: PostsListComponent },
  { path: 'create', component: CreateComponent },
  { path: ':id', component: PostDetailsComponent },
  { path: ':id/edit', component: EditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostsRoutingModule {}
