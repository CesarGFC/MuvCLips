import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FirebaseUserService } from '../../services/firebase/firebaseUser/firebase-user.service';
import { RouterService } from '../../services/router/router.service';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginGroup: FormGroup;

  constructor(private fb: FormBuilder,
              private firebase: FirebaseUserService,
              private router: RouterService,
              private util: UtilsService) {
    this.firebase.currentUser();
  }

  ngOnInit() {
    this.loginGroup = this.fb.group({
      email: [''],
      password: ['']
    });
  }

  signIn() {
    const email = this.loginGroup.get('email').value;
    const password = this.loginGroup.get('password').value;

    this.firebase.signIn(email, password).then(() => {
      this.router.navigateTo('tabs');
    })
    .catch(() => {
      this.util.showMessageAlert('Atención', 'Correo o contraseña incorrectos');
    });
  }

}
