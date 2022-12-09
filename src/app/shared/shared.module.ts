import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { ShortenContentPipe } from './pipes/shorten-content.pipe';
import { ShortenTitlePipe } from './pipes/shorten-title.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    MaterialModule
  ],
  declarations: [
    ShortenContentPipe,
    ShortenTitlePipe
  ]
})
export class SharedModule { }
