import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BlogService } from './service/blog.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SingleComponent } from './single/single.component';
import { MainComponent } from './main/main.component';
import { BlogAdminComponent } from './blog-admin/blog-admin.component';
import { QuillModule } from 'ngx-quill';
import { AdminService } from './service/admin.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CategoryComponent } from './category/category.component';
import { AdminGuard } from '../core/admin.guard';
import { AdminViewComponent } from './blog-admin/admin-view/admin-view.component';
import { BlogComponent } from './blogs/blog.component';
import { ShareModule } from './../share.module';
import { MaterialModule } from '../materila.module';
const route: Routes = [
  {
    path: '', component: MainComponent, children: [
      { path: '', component: BlogComponent },
      { path: 'category/:id', component: CategoryComponent },
      { path: 'admin', component: BlogAdminComponent, canActivate: [AdminGuard] },
      { path: 'admin/:id', component: BlogAdminComponent, canActivate: [AdminGuard] },
      { path: 'adminview', component: AdminViewComponent, canActivate: [AdminGuard] },
      { path: ':id', component: SingleComponent },
      { path: '**', redirectTo: '', pathMatch: 'full' },
    ]
  },
];
@NgModule({
  declarations: [BlogComponent, SingleComponent, MainComponent, BlogAdminComponent, CategoryComponent, AdminViewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    MaterialModule,
    FlexLayoutModule,
    QuillModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,
    ShareModule
  ],
  exports: [
    RouterModule
  ],
  providers: [BlogService, AdminService, AdminGuard]
})
export class BlogModule { }
