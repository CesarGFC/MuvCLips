import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder,  ReactiveFormsModule  } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MoviesSuggestedPageRoutingModule } from './movies-suggested-routing.module';

import { MoviesSuggestedPage } from './movies-suggested.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    MoviesSuggestedPageRoutingModule,
    FormBuilder
  ],
  declarations: [MoviesSuggestedPage]
})
export class MoviesSuggestedPageModule {}
