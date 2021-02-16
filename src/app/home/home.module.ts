import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { LoginService } from '../core/login.service';
import { Routes, RouterModule } from '@angular/router';
import { NguCarouselModule } from '@ngu/carousel';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Layer1Component } from './layer1/layer1.component';
import { SeoService } from '../core/seo.service';
import { MaterialModule } from '../materila.module';
import { ShareModule } from '../share/share.module';

const routes: Routes = [
  { path: '', component: HomeComponent}
];

@NgModule({
  declarations: [HomeComponent, Layer1Component],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NguCarouselModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    ShareModule
  ],
  providers: [LoginService, SeoService]
})
export class HomeModule { }
