import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'movie',
    loadChildren: () => import('./pages/movie/movie/movie.module').then( m => m.MoviePageModule)
  },
  {
    path: 'serie',
    loadChildren: () => import('./pages/movie/serie/serie.module').then( m => m.SeriePageModule)
  },
  {
    path: 'new-movie',
    loadChildren: () => import('./pages/movie/new-movie/new-movie.module').then( m => m.NewMoviePageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
