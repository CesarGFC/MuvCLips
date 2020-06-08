import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-movies-suggested',
  templateUrl: './movies-suggested.page.html',
  styleUrls: ['./movies-suggested.page.scss'],
})
export class MoviesSuggestedPage implements OnInit {
  public Suggestions: FormGroup;
  constructor( private fb: FormBuilder) { }

  ngOnInit() {
  }

}
