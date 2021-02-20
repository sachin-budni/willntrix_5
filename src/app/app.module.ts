import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './materila.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FirebaseModule } from './firebase.module';
import { ShareModule } from './share.module';
import { AuthService } from './core/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { QuillModule } from 'ngx-quill';
import { NguCarouselModule } from '@ngu/carousel';
import { EndComponent } from './end/end.component';
import { RegisterFormsComponent } from './register-forms/register-forms.component';
import { DemoClassComponent } from './demo-class/demo-class.component';
import { PlacementComponent } from './placement/placement.component';
import { ReferComponent } from './refer/refer.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    EndComponent,
    RegisterFormsComponent,
    DemoClassComponent,
    PlacementComponent,
    ReferComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    FirebaseModule,
    ShareModule,
    HttpClientModule,
    FlexLayoutModule,
    QuillModule.forRoot(),
    NguCarouselModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
