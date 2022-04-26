import { Injectable } from '@angular/core';

//FIREBASE
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';

// import { User } from 'src/app/models/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public authFire: AngularFireAuth) { }

  async loginGoogle(email: string, password: string) {
    try {
      return await this.authFire.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    } catch (error) {
      return null;
    }
  }

  async logout() {
    try {
      await this.authFire.signOut();
    } catch (error) {
      console.log(error);
    }
  }

  getUserLogged() {
    return this.authFire.authState;
  }

}
