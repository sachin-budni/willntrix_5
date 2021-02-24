import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './core/admin.guard';
import { AuthGuard } from './core/auth.guard';

const routes: Routes = [
  { path: 'blog', loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule) },
  { path: 'about', loadChildren: () => import('./about/about.module').then(m => m.AboutModule) },
  { path: 'contact', loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule) },
  { path: 'FAQ', loadChildren: () => import('./faq/faq.module').then(m => m.FaqModule) },
  { path: 'signup', loadChildren: () => import('./register/register.module').then(m => m.RegisterModule) },
  { path: 'admin-panel',
    loadChildren: () => import('./admin-panel/admin-panel.module').then(m => m.AdminPanelModule), canActivate: [AuthGuard] },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: 'review', loadChildren: () => import('./review/review.module').then(m => m.ReviewModule) },
  { path: 'student', loadChildren: () => import('./student/student.module').then(m => m.StudentModule), canActivate: [AuthGuard] },
  { path: 'studentregister',
    loadChildren: () => import('./student-register/student-register.module').then(m => m.StudentRegisterModule), canActivate: [AuthGuard] },
  { path: 'webinar', loadChildren: () => import('./workshop/workshop.module').then(m => m.WorkshopModule), canActivate: [AuthGuard] },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canActivate: [AdminGuard] },
  { path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule), canActivate: [AuthGuard] },
  { path: 'resetpassword', loadChildren: () => import('./reset-password/reset-password.module').then(m => m.ResetPasswordModule) },
  { path: 'course', loadChildren: () => import('./course/course.module').then(m => m.CourseModule) },
  { path: '',  loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled',
    scrollOffset: [0, 64]
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
