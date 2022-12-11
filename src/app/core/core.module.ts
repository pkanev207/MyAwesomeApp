import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { HeaderComponent } from './header/header.component';
import { SidenavComponent } from './sidenav/sidenav.component';

@NgModule({
  declarations: [HeaderComponent, SidenavComponent],
  imports: [CommonModule, RouterModule, MaterialModule],
  exports: [HeaderComponent, SidenavComponent],
})
export class CoreModule {}
