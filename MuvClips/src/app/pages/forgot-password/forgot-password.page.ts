import { Component, OnInit } from '@angular/core';
import { FirebaseUserService } from 'src/app/services/firebase/firebaseUser/firebase-user.service';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  txt: string;

  constructor(private firebase: FirebaseUserService, private util: UtilsService) { }

  ngOnInit() {
  }

  sendMessage() {
    if (this.txt === undefined || this.txt === '') {
      this.util.showMessageAlert('Atención', 'Llene el campo con el correo que se registró');
      return;
    }

    this.firebase.getUser().sendPasswordResetEmail(this.txt).then(() => {
      this.util.showMessageAlert('Atención', 'Se ha enviado el correo, verifique su correo electrónico');
    }).catch(() => {
      this.util.showMessageAlert('Atención', 'Verifique que esté ingresando bien el correo electrónico');
    });
  }

}
