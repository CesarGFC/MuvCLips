import { Injectable } from '@angular/core';
import { User } from '../../../models/user/user';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { RouterService } from '../../router/router.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseUserService {

  constructor(private firestore: AngularFirestore,
              private auth: AngularFireAuth,
              private router: RouterService) { }

  currentUser() {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.router.navigateTo('tabs');
      }
    });
  }

  createAccount(email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  signIn(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  saveUser(user: User) {
    return this.firestore.collection('users').add(user);
  }
}
