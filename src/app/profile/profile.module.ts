import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ShareModule } from '../share.module';
import { MaterialModule } from '../materila.module';

const routes: Routes = [
  {path: '', component: ProfileComponent}
]

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    MaterialModule,
    FlexLayoutModule
  ]
})
export class ProfileModule { }
