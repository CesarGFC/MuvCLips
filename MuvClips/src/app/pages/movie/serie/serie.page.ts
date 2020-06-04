import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie/movie';
import { ActivatedRoute } from '@angular/router';
import { Serie } from 'src/app/models/serie/serie';
import { MovieService } from 'src/app/services/firebase/movie/movie.service';
import { PlayerService } from 'src/app/services/player/player.service';
import { User } from 'src/app/models/user/user';
import { FirebaseUserService } from 'src/app/services/firebase/firebaseUser/firebase-user.service';

@Component({
  selector: 'app-serie',
  templateUrl: './serie.page.html',
  styleUrls: ['./serie.page.scss'],
})
export class SeriePage implements OnInit {

  movie: Movie;
  serie: Serie;
  seasons: any[];
  SelectedSeason: string;
  chapters = [];
  user: User;
  addedList = false;
  addedToWatch = false;

  constructor(private router: ActivatedRoute,
              private firebase: MovieService,
              private auth: FirebaseUserService,
              private player: PlayerService) { }

  ngOnInit() {
    this.router.queryParams.subscribe(params => {
      this.movie = JSON.parse(params.special);
    });

    this.firebase.getSeries(this.movie.id).then((serie) => {
      serie.forEach((s) => {
        this.serie = {
          id: s.id,
          serie: s.get('serie'),
          seasons: s.get('temporadas')
        };
      });

      this.seasons = this.serie.seasons;
    });

    this.isInList();
  }

  watchChapter(i: string) {
    if (i !== undefined) {
      const c = this.chapters[i];
      let link = '';

      Object.keys(c).map(ch => {
        if (ch === 'capitulo') {
          link = c[ch];
        }
      });

      this.auth.getUser().onAuthStateChanged((user) => {
        if (user) {
          this.auth.addViewed(user.email, this.movie.id);
        }
      });

      this.player.watch(link);
    }
  }

  get(data: string, i: string): string {
    if (i !== undefined) {
      const c = this.chapters[i];
      let name = '';
      let description = '';

      Object.keys(c).map(ch => {
        if (ch === 'nombre') {
          name = c[ch];
        }

        if (ch === 'descripcion') {
          description = c[ch];
        }
      });

      if (data === 'name') {
        return name;
      }

      if (data === 'description') {
       return description;
      }
    }
  }

  updateList() {
    const season = this.serie.seasons[this.SelectedSeason];
    const chapters = Object.keys(season).map(s => season[s]);
    this.chapters = chapters[0];
  }

  addList() {
    if (!this.addedList) {
      this.auth.getUser().onAuthStateChanged((user) => {
        if (user) {
          this.auth.addFavorite(user.email, this.movie.id);
        }
      });

      this.addedList = true;
      return;
    }

    this.auth.getUser().onAuthStateChanged((user) => {
      if (user) {
        this.auth.removeFavorite(this.movie, user.email);
      }
    });

    this.addedList = false;
  }

  watchLater() {
    if (!this.addedToWatch) {
      this.auth.getUser().onAuthStateChanged((user) => {
        if (user) {
          this.auth.addWatchLater(user.email, this.movie.id);
        }
      });

      this.addedToWatch = true;
      return;
    }

    this.auth.getUser().onAuthStateChanged((user) => {
      if (user) {
        this.auth.removeWatchLater(this.movie, user.email);
      }
    });
    this.addedToWatch = false;
  }

  isInList() {
    this.auth.getUser().onAuthStateChanged((user) => {
      if (user) {
        this.auth.getFirestore().collection('users').ref.where('email', '==', user.email).get().then((u) => {
          u.forEach((doc) => {
            this.user = {
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

          if (this.user.favorites.indexOf(this.movie.id) > -1) {
            this.addedList = true;
          }

          this.isInListToWatch();
        });
      }
    });
  }

  isInListToWatch() {
    if (this.user.watchLater.indexOf(this.movie.id) > -1) {
      this.addedToWatch = true;
    }
  }
}
