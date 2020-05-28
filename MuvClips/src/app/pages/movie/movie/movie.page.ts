import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Movie } from 'src/app/models/movie/movie';
import { VideoPlayer } from '@ionic-native/video-player/ngx';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.page.html',
  styleUrls: ['./movie.page.scss'],
})
export class MoviePage implements OnInit {

  movie: Movie;

  constructor(private route: ActivatedRoute,
              private video: VideoPlayer,
              private util: UtilsService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.movie = JSON.parse(params.special);
    });
  }

  play() {
    this.video.play(this.movie.movie);
  }
}
