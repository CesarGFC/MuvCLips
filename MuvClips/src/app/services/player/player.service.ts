import { Injectable } from '@angular/core';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media/ngx';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(private player: StreamingMedia) { }

  watch(link: string) {
    const options: StreamingVideoOptions = {
      orientation: 'landscape',
      shouldAutoClose: true,
      controls: true
    };

    this.player.playVideo(link, options);
  }
}
