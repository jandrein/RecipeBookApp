import { NgModule, Pipe } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import firebaseConfig from './firebase'
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './user.service';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, 
    IonicModule.forRoot(),
     AppRoutingModule,
     AngularFireModule.initializeApp(firebaseConfig),
     AngularFireAuthModule,
     HttpClientModule,
     ReactiveFormsModule,
     
    ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
                UserService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
