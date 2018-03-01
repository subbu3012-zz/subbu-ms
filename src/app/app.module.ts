import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppComponent } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

export const firebaseConfig = {
  apiKey: "AIzaSyBdA7sfuErWcOKwmtI-8lnLpr07N6f5Yug",
  authDomain: "subbu-work1.firebaseapp.com",
  databaseURL: "https://subbu-work1.firebaseio.com",
  projectId: "subbu-work1",
  storageBucket: "subbu-work1.appspot.com",
  messagingSenderId: "461016956415"
};

@NgModule({
  declarations: [
    AppComponent,
    // HttpClient
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule, // for database
    AngularFireAuthModule,
    HttpClientModule,
    MatInputModule, MatButtonModule, MatCardModule, MatSnackBarModule,
    MatIconModule, MatDatepickerModule, MatSelectModule, MatSliderModule, MatSlideToggleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
