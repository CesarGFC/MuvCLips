import { Injectable } from '@angular/core';
import { User } from '../../../models/user/user';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { RouterService } from '../../router/router.service';
import { UtilsService } from '../../utils/utils.service';
import { Movie } from 'src/app/models/movie/movie';

@Injectable({
  providedIn: 'root'
})
export class FirebaseUserService {

  email: string;

  constructor(private firestore: AngularFirestore,
              private auth: AngularFireAuth,
              private router: RouterService,
              private util: UtilsService) { }

  getUser() {
    return this.auth;
  }

  getFirestore() {
    return this.firestore;
  }

  currentUser() {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.router.navigateTo('tabs');
      }
    });
  }

  exist() {
    return this.firestore.collection('users');
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

  signOut() {
    return this.auth.signOut();
  }

  removeWatchLater(movie: Movie, email: string) {
    let user: User;

    this.firestore.collection('users').ref.where('email', '==', email).get().then((u) => {
      u.forEach((doc) => {
        user = {
          id: doc.id,
          name: doc.get('name'),
          lastName: doc.get('lastName'),
          email: doc.get('email'),
          password: doc.get('password'),
          favorites: doc.get('favorites'),
          watchLater: doc.get('watchLater'),
          viewed: doc.get('viewed')
        };
      });

      user.watchLater.splice(user.favorites.indexOf(movie.id), 1);

      this.firestore.collection('users').doc(user.id).set(user).then(() => {
        this.util.showMessageToast('Se ha removido de su lista para ver más tarde');
      })
      .catch(() => {
        this.util.showMessageAlert('Atención', 'No se pudo remover, verifique su conexión a internet');
      });
    });
  }

  addWatchLater(email: string, idMovie: string) {
    let user: User;

    this.firestore.collection('users').ref.where('email', '==', email).get().then((u) => {
      u.forEach((doc) => {
        user = {
          id: doc.id,
          name: doc.get('name'),
          lastName: doc.get('lastName'),
          email: doc.get('email'),
          password: doc.get('password'),
          favorites: doc.get('favorites'),
          watchLater: doc.get('watchLater'),
          viewed: doc.get('viewed')
        };
      });

      user.watchLater.push(idMovie);

      this.firestore.collection('users').doc(user.id).set(user).then(() => {
        this.util.showMessageToast('Se agrego a la lista para ver después');
      })
      .catch(() => {
        this.util.showMessageAlert('Atención', 'Verifique su conexión a internet');
      });
    });
  }

  addViewed(email: string, idMovie: string) {
    let user: User;

    this.firestore.collection('users').ref.where('email', '==', email).get().then((u) => {
      u.forEach((doc) => {
        user = {
          id: doc.id,
          name: doc.get('name'),
          lastName: doc.get('lastName'),
          email: doc.get('email'),
          password: doc.get('password'),
          favorites: doc.get('favorites'),
          watchLater: doc.get('watchLater'),
          viewed: doc.get('viewed')
        };
      });

      user.viewed.push(idMovie);

      this.firestore.collection('users').doc(user.id).set(user);
    });
  }

  removeFavorite(movie: Movie, email: string) {
    let user: User;

    this.firestore.collection('users').ref.where('email', '==', email).get().then((u) => {
      u.forEach((doc) => {
        user = {
          id: doc.id,
          name: doc.get('name'),
          lastName: doc.get('lastName'),
          email: doc.get('email'),
          password: doc.get('password'),
          favorites: doc.get('favorites'),
          watchLater: doc.get('watchLater'),
          viewed: doc.get('viewed')
        };
      });

      user.favorites.splice(user.favorites.indexOf(movie.id), 1);

      this.firestore.collection('users').doc(user.id).set(user).then(() => {
        this.util.showMessageToast('Se ha removido de su lista de favoritos');
      })
      .catch(() => {
        this.util.showMessageAlert('Atención', 'No se pudo remover, verifique su conexión a internet');
      });
    });
  }

  addFavorite(email: string, idMovie: string) {
    let user: User;

    this.firestore.collection('users').ref.where('email', '==', email).get().then((u) => {
      u.forEach((doc) => {
        user = {
          id: doc.id,
          name: doc.get('name'),
          lastName: doc.get('lastName'),
          email: doc.get('email'),
          password: doc.get('password'),
          favorites: doc.get('favorites'),
          watchLater: doc.get('watchLater'),
          viewed: doc.get('viewed')
        };
      });

      user.favorites.push(idMovie);

      this.firestore.collection('users').doc(user.id).set(user).then(() => {
        this.util.showMessageToast('Se agrego a su lista de favoritos');
      })
      .catch(() => {
        this.util.showMessageAlert('Atención', 'Verifique su conexión a internet');
      });
    });
  }
}
