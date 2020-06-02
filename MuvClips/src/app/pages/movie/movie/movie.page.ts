import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Movie } from 'src/app/models/movie/movie';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { FirebaseUserService } from 'src/app/services/firebase/firebaseUser/firebase-user.service';
import { User } from 'src/app/models/user/user';
import { PlayerService } from 'src/app/services/player/player.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.page.html',
  styleUrls: ['./movie.page.scss'],
})
export class MoviePage implements OnInit {

  movie: Movie;
  user: User;
  addedList = false;
  addedToWatch = false;

  constructor(private route: ActivatedRoute,
              private video: PlayerService,
              private util: UtilsService,
              private firebase: FirebaseUserService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.movie = JSON.parse(params.special);
    });

    this.isInList();
    this.isInListToWatch();
  }

  isInList() {
    this.firebase.getUser().onAuthStateChanged((user) => {
      if (user) {
        this.firebase.getFirestore().collection('users').ref.where('email', '==', user.email).get().then((u) => {
          u.forEach((doc) => {
            this.user = {
              id: doc.id,
              name: doc.get('name'),
              lastName: doc.get('lastName'),
              email: doc.get('email'),
              password: doc.get('password'),
              favorites: doc.get('favorites'),
              watchLater: doc.get('watchLater')
            };
          });

          if (this.user.favorites.indexOf(this.movie.id) > -1) {
            this.addedList = true;
          }
        });
      }
    });
  }

  isInListToWatch() {
    this.firebase.getUser().onAuthStateChanged((user) => {
      if (user) {
        this.firebase.getFirestore().collection('users').ref.where('email', '==', user.email).get().then((u) => {
          u.forEach((doc) => {
            this.user = {
              id: doc.id,
              name: doc.get('name'),
              lastName: doc.get('lastName'),
              email: doc.get('email'),
              password: doc.get('password'),
              favorites: doc.get('favorites'),
              watchLater: doc.get('watchLater')
            };
          });

          if (this.user.watchLater.indexOf(this.movie.id) > -1) {
            this.addedToWatch = true;
          }
        });
      }
    });
  }

  addList() {
    if (!this.addedList) {
      this.firebase.getUser().onAuthStateChanged((user) => {
        if (user) {
          this.firebase.addFavorite(user.email, this.movie.id);
        }
      });

      this.addedList = true;
      return;
    }

    this.firebase.getUser().onAuthStateChanged((user) => {
      if (user) {
        this.firebase.removeFavorite(this.movie, user.email);
      }
    });

    this.addedList = false;
  }

  watchLater() {
    if (!this.addedToWatch) {
      this.firebase.getUser().onAuthStateChanged((user) => {
        if (user) {
          this.firebase.addWatchLater(user.email, this.movie.id);
        }
      });

      this.addedToWatch = true;
      return;
    }

    this.firebase.getUser().onAuthStateChanged((user) => {
      if (user) {
        this.firebase.removeWatchLater(this.movie, user.email);
      }
    });
    this.addedToWatch = false;
  }

  play() {
    this.video.watch(this.movie.movie);
  }
}
