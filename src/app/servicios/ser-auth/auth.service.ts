import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
// import { AngularFireAuth} from 'angularfire2/auth';
import { AngularFireAuth } from 'angularfire2/auth';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // correo: string = 'admin@gmail,com';
  correo

  constructor(
    public afAuth: AngularFireAuth
  ) { }
 
  registerUser(email: string, password: string){
    return new Promise((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(userData => resolve(userData),
      err => reject(err));
    });
  }

  // loginEmail(email: string, password: string){
  loginEmail(email: string, password: string){
    this.correo = email;
    // this.correo = 'cliente@gmail.com';
    return new Promise((resolve, reject)=>{
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
      // this.afAuth.auth.signInWithEmailAndPassword('admin@gmail.com', 'administrador')
      .then(userData => resolve(userData),
      err => reject(err));
    });
  }

  getAuth(){
    return this.afAuth.authState.map(auth => auth);
  }

  logOut(){
    return this.afAuth.auth.signOut();
  }
}
