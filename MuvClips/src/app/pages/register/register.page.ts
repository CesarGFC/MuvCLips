import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseUserService } from '../../services/firebase/firebaseUser/firebase-user.service';
import { UtilsService } from '../../services/utils/utils.service';
import { User } from 'src/app/models/user/user';
import { RouterService } from '../../services/router/router.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerGroup: FormGroup;

  constructor(private fb: FormBuilder,
              private firebase: FirebaseUserService,
              private util: UtilsService,
              private router: RouterService) { }

  ngOnInit() {
    const email = '^[^@]+@[^@]+\.[a-zA-Z]{2,}$';
    this.registerGroup = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.pattern(email)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      rPassword: ['', Validators.required]
    });
  }

  saveUser() {
    if (this.registerGroup.invalid) {
      this.util.showMessageAlert('Atención', 'Datos ingresados invalidos, favor de verificarlos');
      return;
    }

    const password = this.registerGroup.get('password').value;
    const rPassword = this.registerGroup.get('rPassword').value;

    if (password !== rPassword) {
      this.util.showMessageAlert('Atención', 'Las contraseñas no coinciden');
      return;
    }

    const email = this.registerGroup.get('email').value;

    const user: User = {
      name: this.registerGroup.get('name').value,
      lastName: this.registerGroup.get('lastName').value,
      email: this.registerGroup.get('email').value,
      password: this.registerGroup.get('password').value
    };

    this.firebase.saveUser(user).then(() => {
      this.firebase.createAccount(email, password).then(() => {
        this.util.showMessageToast('Se registró exitosamente');
        this.firebase.signIn(email, password).then(() => {
          this.router.navigateTo('tabs');
        })
        .catch(() => {
          this.util.showMessageAlert('Atención', 'Este al iniciar sesión, vuelva a intentarlo');
          this.router.navigateTo('');
        });
      })
      .catch(() => {
        this.util.showMessageAlert('Atención', 'Este correo ya existe');
      });
    }).catch(() => {
      this.util.showMessageAlert('Atención', 'Algo salió mal, por favor verifique su conexión a Internet');
    });
  }

}
