import {NgModule} from '@angular/core';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

@NgModule({
    imports: [
        AngularFireModule.initializeApp(environment.config)
    ],
    exports: [
        AngularFireModule,
        AngularFireDatabaseModule,
        AngularFirestoreModule,
        AngularFireMessagingModule,
        AngularFireStorageModule,
        AngularFireAuthModule
    ]
})
export class FirebaseModule {}


/**  Copyright 2020 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */