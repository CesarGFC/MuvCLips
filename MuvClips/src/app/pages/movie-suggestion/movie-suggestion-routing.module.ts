import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MovieSuggestionPage } from './movie-suggestion.page';

const routes: Routes = [
  {
    path: '',
    component: MovieSuggestionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MovieSuggestionPageRoutingModule {}
