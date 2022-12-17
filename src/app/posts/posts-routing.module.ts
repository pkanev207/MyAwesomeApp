import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { PostsListComponent } from './posts-list/posts-list.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: PostsListComponent,
    data: { title: 'Posts' },
  },
  { path: 'create', component: CreateComponent, data: { title: 'Create' } },
  { path: ':id', component: PostDetailsComponent, data: { title: 'Details' } },
  { path: ':id/edit', component: EditComponent, data: { title: 'Edit' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostsRoutingModule {}
