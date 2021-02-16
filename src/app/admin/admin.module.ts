import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../materila.module';
import { AngularFireMessagingModule } from '@angular/fire/messaging';

const routes: Routes = [
  {path: '', component: AdminComponent}
];

@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule.forChild(routes),
    AngularFireMessagingModule
  ],
})
export class AdminModule { }
