import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { FirebaseUserService } from 'src/app/services/firebase/firebaseUser/firebase-user.service';
import { RouterService } from 'src/app/services/router/router.service';

@Component({
  selector: 'app-movie-suggestion',
  templateUrl: './movie-suggestion.page.html',
  styleUrls: ['./movie-suggestion.page.scss'],
})
export class MovieSuggestionPage implements OnInit {

  txt: string;

  constructor(private util: UtilsService,
              private firebase: FirebaseUserService,
              private router: RouterService) { }

  ngOnInit() {
  }

  sendSuggestion() {
    if (this.txt === undefined || this.txt === '') {
      this.util.showMessageAlert('Atención', 'Debe de llenar el campo antes de enviarlo');
      return;
    }

    this.firebase.getFirestore().collection('suggestions').add({suggestion: this.txt}).then(() => {
      this.util.showMessageToast('Su sugerencia ha sido enviada, la tomaremos en cuenta');
      this.txt = '';
      this.router.navigateTo('tabs');
    }).catch(() => {
      this.util.showMessageAlert('Atención', 'Algo salió mal, verifique su conexión a Internet');
    });
  }

}
