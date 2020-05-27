import { Component } from '@angular/core';
import { MovieService } from '../services/firebase/movie/movie.service';
import { Movie } from '../models/movie/movie';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  movies: Movie[];

  constructor(private movieService: MovieService) {
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
    });
  }

}
