import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ContactComponent } from './contact.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../materila.module';

const routes: Routes = [
  { path: '', component: ContactComponent}
];

@NgModule({
  declarations: [ContactComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class ContactModule { }
