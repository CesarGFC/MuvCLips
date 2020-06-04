import { Component } from '@angular/core';
import { MovieService } from '../services/firebase/movie/movie.service';
import { Movie } from '../models/movie/movie';
import { RouterService } from '../services/router/router.service';
import { FirebaseUserService } from '../services/firebase/firebaseUser/firebase-user.service';
import { UtilsService } from '../services/utils/utils.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  movies: Movie[];
  series: Movie[];

  slideOptions = {
    slidesPerView: 3
  };

  constructor(private movieService: MovieService,
              private router: RouterService,
              private firebase: FirebaseUserService,
              private util: UtilsService) {
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

      this.series = this.movies.filter((currentMovie) => {
        return (currentMovie.type.indexOf('S') > -1);
      });

      this.movies = this.movies.filter((currentMovie) => {
        return (currentMovie.type.indexOf('P') > -1);
      });
    });
  }

  watchMovie(movie: Movie) {
    this.router.navigateToWithParams('movie', movie);
  }

  watchSerie(movie: Movie) {
    this.router.navigateToWithParams('serie', movie);
  }

  signOut() {
    this.firebase.signOut().then(() => {
      this.router.navigateTo('');
    })
    .catch(() => {
      this.util.showMessageAlert('Atención', 'No se pudo cerrar la sesión, verifique su conexión a Internet');
    });
  }

}
