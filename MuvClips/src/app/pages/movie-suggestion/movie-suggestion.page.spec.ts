import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MovieSuggestionPage } from './movie-suggestion.page';

describe('MovieSuggestionPage', () => {
  let component: MovieSuggestionPage;
  let fixture: ComponentFixture<MovieSuggestionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieSuggestionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MovieSuggestionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
