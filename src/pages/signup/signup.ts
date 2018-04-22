import { Component } from '@angular/core';
import { LoadingController, NavController, AlertController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  public form: FormGroup;

  constructor(private fb: FormBuilder, private navCtrl: NavController, private afAuth: AngularFireAuth, private loadingCtrl: LoadingController, private alertCtrl: AlertController) {
    this.form = this.fb.group({
      email: ['', Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(160),
        Validators.required
      ])],
      password: ['', Validators.compose([
        Validators.minLength(6),
        Validators.maxLength(20),
        Validators.required
      ])]
    });
  }

  submit() {
    let loader = this.loadingCtrl.create({ content: "Signing up..." })
    loader.present();

    this.afAuth.auth.createUserWithEmailAndPassword(this.form.controls['email'].value, this.form.controls['password'].value)
      .then(()=>{
        loader.dismiss();

        let alert = this.alertCtrl.create({
          title: 'Welcome!',
          subTitle: 'Your account has been created!',
          buttons: ['Wow, that\'s great news', 'Ok... Ok... Let me use it already']
        });
        alert.present();

        this.navCtrl.setRoot(HomePage);
      })
      .catch(()=>{
        loader.dismiss();

        let alert = this.alertCtrl.create({
          title: 'Sorry... Someone is misbehaving...',
          subTitle: 'Our servers couldn\'t complete your request',
          buttons: ['That\'s ok...', 'Kick the server!']
        });
        alert.present();
      });
  }

  goToLogin() {
    this.navCtrl.setRoot(LoginPage);
  }
}