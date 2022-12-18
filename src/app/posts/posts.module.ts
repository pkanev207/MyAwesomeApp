import { NgModule } from '@angular/core';
import { PostsRoutingModule } from './posts-routing.module';
import { SharedModule } from '../shared/shared.module';

import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { PostsListComponent } from './posts-list/posts-list.component';
import { PostItemComponent } from './post-item/post-item.component';
import { PostDetailsComponent } from './post-details/post-details.component';

@NgModule({
  declarations: [
    CreateComponent,
    EditComponent,
    PostsListComponent,
    PostItemComponent,
    PostDetailsComponent,
  ],
  imports: [SharedModule, PostsRoutingModule],
})
export class PostsModule {}
