import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewMoviePageRoutingModule } from './new-movie-routing.module';

import { NewMoviePage } from './new-movie.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewMoviePageRoutingModule
  ],
  declarations: [NewMoviePage]
})
export class NewMoviePageModule {}
