import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import 'rxjs/add/operator/take';
import { DataService } from './data.service';
@Injectable()
export class AuthService {

  authState: any = null;
  fullName: any;
  constructor(private afAuth: AngularFireAuth,
              private fireDb: AngularFireDatabase,
              private dataServ: DataService) {
                this.afAuth.authState.subscribe((auth) => {
                this.authState = auth;
                });
  }
  // Returns true if user is logged in
  get authenticated(): boolean {
    return this.authState !== null;
  }
  // Returns current user data
  get currentUser(): any {
    return this.authenticated ? this.authState : null;
  }

  // Returns
  get currentUserObservable(): any {
    return this.afAuth.authState;
  }

  // Returns current user UID
  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : '';
  }
  // get current Logged in User Name
  getUserName(){
    this.fullName=this.fireDb.list(`users/${this.currentUserId}`);
    return this.fullName;
  }
  emailSignUp(data: Object) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(data['email'], data['pass'])
      .then((user) => {
        resolve({'uid': user['uid']});
        this.authState = user;
        this.fullName = data['name'];
        this.dataServ.changeUserName(this.fullName);
        this.updateUserData();
      })
      .catch(error => {
        reject({'userError': error.message});
      });
    })
  }

  emailLogin(email: string, password: string) {
    
    return new Promise((resolve, reject) => {
       this.afAuth.auth.signInWithEmailAndPassword(email, password)
       .then((user) => {
         this.authState = user;
         resolve(user);
         //this.updateUserData();
       })
       .catch(error => {
         reject(error);});
      });
  }


  //// Sign Out ////
  signOut(): void {
    this.dataServ.changeUserName("");
    this.afAuth.auth.signOut();

  }

  //// Helpers ////
  private updateUserData(): void {
    // Writes user name and email to realtime db
    // useful if your app displays information about users or for admin features
      const path = `users/${this.currentUserId}`; // Endpoint on firebase
      const data = {
                    email: this.authState.email,
                    uid: this.currentUserId,
                    name: this.fullName
                  };

      this.fireDb.object(path).update(data)
      .catch(error => console.log(error));

    }
}
