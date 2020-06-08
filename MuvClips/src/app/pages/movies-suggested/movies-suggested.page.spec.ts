import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MoviesSuggestedPage } from './movies-suggested.page';

describe('MoviesSuggestedPage', () => {
  let component: MoviesSuggestedPage;
  let fixture: ComponentFixture<MoviesSuggestedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoviesSuggestedPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MoviesSuggestedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
