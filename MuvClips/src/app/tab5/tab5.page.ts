import { Component, OnInit } from '@angular/core';
import { FirebaseUserService } from '../services/firebase/firebaseUser/firebase-user.service';
import { RouterService } from '../services/router/router.service';
import { UtilsService } from '../services/utils/utils.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {

  constructor(private firebase: FirebaseUserService,
              private router: RouterService,
              private util: UtilsService,
              private alert: AlertController) { }

  ngOnInit() {
  }

  async signOut() {
    const alert = await this.alert.create({
      header: 'Atención',
      message: '¿Seguro que deseas salir?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: (blah) => {}
        }, {
          text: 'Cerrar sesión',
          handler: () => {
            this.firebase.signOut().then(() => {
              this.router.navigateTo('');
            })
            .catch(() => {
              this.util.showMessageAlert('Atención', 'No se pudo cerrar la sesión, verifique su conexión a Internet');
            });
          }
        }
      ]
    });

    await alert.present();
  }

  async changePassword() {
    const alert = await this.alert.create({
      header: 'Atención',
      message: '¿Seguro que deseas cambiar la contraseña?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: (blah) => {}
        }, {
          text: 'Enviar correo',
          handler: () => {
            this.firebase.getUser().onAuthStateChanged((user) => {
              if (user) {
                this.firebase.getUser().sendPasswordResetEmail(user.email).then(() => {
                  this.util.showMessageAlert('Atención', 'Se ha enviado un correo, verifique su correo electrónico');
                });
              }
            });
          }
        }
      ]
    });

    await alert.present();
  }

  about() {
    this.router.navigateTo('about');
  }
}
