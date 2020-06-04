import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie/movie';
import { ActivatedRoute } from '@angular/router';
import { PlayerService } from 'src/app/services/player/player.service';

@Component({
  selector: 'app-new-movie',
  templateUrl: './new-movie.page.html',
  styleUrls: ['./new-movie.page.scss'],
})
export class NewMoviePage implements OnInit {

  movie: Movie;

  constructor(private route: ActivatedRoute,
              private video: PlayerService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.movie = JSON.parse(params.special);
    });
  }

  play() {
    this.video.watch(this.movie.movie);
  }

}
