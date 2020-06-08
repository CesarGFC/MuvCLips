import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { MovieService } from '../services/firebase/movie/movie.service';
import { RouterService } from '../services/router/router.service';
import { Movie } from '../models/movie/movie';
import { User } from '../models/user/user';
import { FirebaseUserService } from '../services/firebase/firebaseUser/firebase-user.service';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {

  movies: Movie[];
  user: User;
  moviesToShow: Movie[] = [];
  title = 'Favoritos';


  constructor(private menu: MenuController,
              private movieService: MovieService,
              public router: RouterService,
              private userService: FirebaseUserService) { }

  ngOnInit() {
    this.userService.getUser().onAuthStateChanged((user) => {
      if (user) {
        this.userService.getFirestore().collection('users').ref.where('email', '==', user.email).onSnapshot((u) => {
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

          this.movieService.getMovies().subscribe(data => {
            this.movies = data.map(p => {
              return {
                id: p.payload.doc.id,
                title: p.payload.doc.get('titulo'),
                description: p.payload.doc.get('descripcion'),
                duration: p.payload.doc.get('duracion'),
                actors: p.payload.doc.get('actores'),
                directors: p.payload.doc.get('directores'),
                genre: p.payload.doc.get('genero'),
                classification: p.payload.doc.get('clasificacion'),
                lenguage: p.payload.doc.get('idioma'),
                punctuation: p.payload.doc.get('calificacion'),
                new: p.payload.doc.get('estreno'),
                cover: p.payload.doc.get('caratula'),
                movie: p.payload.doc.get('pelicula'),
                type: p.payload.doc.get('tipo')
              };
            });

            this.filter('F');
          });
        });
      }
    });
  }

  filter(find: string) {
    this.moviesToShow = [];

    if (find === 'F') {
      this.user.favorites.forEach((movie) => {
        const m = this.movies.filter((currentMovie) => {
                  return (currentMovie.id.indexOf(movie) > -1);
                });
        this.moviesToShow.push(m[0]);
      });

      this.title = 'Favoritos';
    } else if (find === 'W') {
      this.user.watchLater.forEach((movie) => {
        const m = this.movies.filter((currentMovie) => {
                  return (currentMovie.id.indexOf(movie) > -1);
                });

        this.moviesToShow.push(m[0]);
      });

      this.title = 'Ver más Tarde';
    } else if (find === 'V') {
      this.user.viewed.forEach((movie) => {
        const m = this.movies.filter((currentMovie) => {
                  return (currentMovie.id.indexOf(movie) > -1);
                });

        if (m[0] !== undefined) {
          this.moviesToShow.push(m[0]);
        }
      });

      this.title = 'Vistas';
    }

    this.menu.close('menu');
  }

  openMenu() {
    this.menu.enable(true, 'menu');
    this.menu.open('menu');

    if (this.menu.isOpen('menu')) {
      this.menu.close('menu');
    }
  }

  watchMovie(movie: Movie) {
    if (movie.type === 'P') {
      this.router.navigateToWithParams('movie', movie);
      return;
    }

    this.router.navigateToWithParams('serie', movie);
  }

  openForm(){
    this.router.navigateTo('movies-suggested');
  }

}
