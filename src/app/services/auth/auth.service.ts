import { Injectable } from '@angular/core';

//FIREBASE
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { Observable, Subject } from 'rxjs';
import { User } from 'src/app/models/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;
  userAdmin: boolean;

  constructor(public authFire: AngularFireAuth, public firestore: AngularFirestore) {
    //GUARDADO DE DATOS DEL USUARIO Y SETEO EN NULL CUANDO CIERRA SESION
    this.authFire.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
        this.setUserData(user);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  //CREAR UN NUEVO USUARIO CON EMAIL Y CONTRASEÑA
  async registerUser(email: string, password: string) {
    try {
      return this.authFire.createUserWithEmailAndPassword(email, password).then((result) => {
        this.setUserData(result.user);
      });
    } catch (error) {
      console.log(error);
    }
  }


  // INICIO DE SESIÓN CON USUARIO Y CONTRASEÑA
  async loginUser(email: string, password: string) {
    try {
      return await this.authFire.signInWithEmailAndPassword(email, password).then((result) => {
        this.setUserData(result.user);
      });
    } catch (error) {
      console.log(error);
    }
  }

  //INICIO DE SESIÓN CON GOOGLE PROVIDER
  async loginGoogle() {
    try {
      return await this.authFire.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    } catch (error) {
      return null;
    }
  }

  //RECUPERAR CONTRASEÑA
  async ForgotPassword(passwordResetEmail: string) {
    try {
      return await this.authFire.sendPasswordResetEmail(passwordResetEmail).then(() => {
        alert('Correo de recuperación enviado, por favor verifica tu bandeja de entrada.');
      });
    } catch (error) {
      console.log(error);
    }
  }

  //CERRAR SESIÓN
  async logout() {
    try {
      localStorage.removeItem('user');
      await this.authFire.signOut();
    } catch (error) {
      console.log(error);
    }
  }

  //GUARDADO DEL USER EN FIRESTORE
  setUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.firestore.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      admin: user.admin = false
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  getUser(uid: string) : Observable<any> {
    const userRef: AngularFirestoreDocument<any> = this.firestore.doc(`users/${uid}`);
    const data = userRef.valueChanges()
    return data
  }

  //DEVUELVE TRUE SI EL USUARIO INICIO SESION
  userLogged(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user != null;
  }
}
