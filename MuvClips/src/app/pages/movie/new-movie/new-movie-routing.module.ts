import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewMoviePage } from './new-movie.page';

const routes: Routes = [
  {
    path: '',
    component: NewMoviePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewMoviePageRoutingModule {}
