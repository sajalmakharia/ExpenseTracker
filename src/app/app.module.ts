import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule} from 'angularfire2/auth';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { AuthService } from './shared/services/auth.service';
import { AuthGuardService } from './shared/guard/auth-guard.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ItemComponent } from './components/home/item/item.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DataService } from './shared/services/data.service';
@NgModule({
  declarations: [
    AppComponent,
    ItemComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgxSpinnerModule.forRoot(),
    ToastrModule.forRoot(),
    NgbModule.forRoot(),
    AppRoutingModule
  ],
  providers: [AuthService,AuthGuardService,DataService],
  bootstrap: [AppComponent],
  entryComponents: [
    ItemComponent
  ]
})
export class AppModule { }
