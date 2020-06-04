import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewMoviePage } from './new-movie.page';

describe('NewMoviePage', () => {
  let component: NewMoviePage;
  let fixture: ComponentFixture<NewMoviePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewMoviePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewMoviePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
