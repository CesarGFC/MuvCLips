import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MovieSuggestionPageRoutingModule } from './movie-suggestion-routing.module';

import { MovieSuggestionPage } from './movie-suggestion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MovieSuggestionPageRoutingModule
  ],
  declarations: [MovieSuggestionPage]
})
export class MovieSuggestionPageModule {}
