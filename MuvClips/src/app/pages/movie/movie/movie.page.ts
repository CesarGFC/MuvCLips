import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Movie } from 'src/app/models/movie/movie';
import { VideoPlayer } from '@ionic-native/video-player/ngx';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { FirebaseUserService } from 'src/app/services/firebase/firebaseUser/firebase-user.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.page.html',
  styleUrls: ['./movie.page.scss'],
})
export class MoviePage implements OnInit {

  movie: Movie;

  constructor(private route: ActivatedRoute,
              private video: VideoPlayer,
              private util: UtilsService,
              private auth: FirebaseUserService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.movie = JSON.parse(params.special);
    });
  }

  addList() {
    this.auth.getUser().onAuthStateChanged((user) => {
      if (user) {
        this.auth.addFavorite(user.email, this.movie.id);
      }
    });
  }

  watchLater() {
    this.auth.getUser().onAuthStateChanged((user) => {
      if (user) {
        this.auth.addWatchLater(user.email, this.movie.id);
      }
    });
  }

  play() {
    this.video.play(this.movie.movie);
  }
}
