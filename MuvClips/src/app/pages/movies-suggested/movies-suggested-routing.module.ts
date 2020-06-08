import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoviesSuggestedPage } from './movies-suggested.page';

const routes: Routes = [
  {
    path: '',
    component: MoviesSuggestedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoviesSuggestedPageRoutingModule {}
