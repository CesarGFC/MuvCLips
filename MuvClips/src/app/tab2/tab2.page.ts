import { Component } from '@angular/core';
import { MovieService } from '../services/firebase/movie/movie.service';
import { Movie } from '../models/movie/movie';
import { RouterService } from '../services/router/router.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  movies: Movie[];
  temporal: Movie[];

  constructor(private movieService: MovieService, private router: RouterService) {
    this.initializeMovies();
  }

  initializeMovies() {
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
      this.temporal = this.movies;
    });
  }

  watchMovie(movie: Movie) {
    if (movie.type === 'P') {
      this.router.navigateToWithParams('movie', movie);
    } else {
      this.router.navigateToWithParams('serie', movie);
    }
  }

  filterList(evt) {
    this.movies = this.temporal;
    const searchTerm = evt.srcElement.value;

    if (!searchTerm) {
      return;
    }

    this.movies = this.movies.filter((currentMovie) => {
        return (currentMovie.title.toLocaleLowerCase().indexOf(searchTerm.toLocaleLowerCase()) > -1) ||
               (currentMovie.description.toLocaleLowerCase().indexOf(searchTerm.toLocaleLowerCase()) > -1) ||
               (currentMovie.lenguage.toLocaleLowerCase().indexOf(searchTerm.toLocaleLowerCase()) > -1);
    });
  }

}
