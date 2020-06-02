import { Injectable } from '@angular/core';
import { VideoPlayer } from '@ionic-native/video-player/ngx';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(private player: VideoPlayer) { }

  watch(link: string) {
    
  }
}
