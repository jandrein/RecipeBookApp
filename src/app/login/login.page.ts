import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import  auth  from 'firebase/app';
import { UserService } from '../user.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

email: string=""
password: string=""

  constructor(private router: Router,public ngFireAuth: AngularFireAuth,public alert: AlertController, public fb:FormBuilder) {
    
   }

  ngOnInit() {

  }

  async login() {
    try{
    const user = await this.ngFireAuth.signInWithEmailAndPassword(this.email,this.password);
    console.log(user);
    if(user.user.email){
      const UID = user.user.uid
      const Lemail = this.email
      sessionStorage.setItem('email',Lemail)
      sessionStorage.setItem("uid",UID)
      this.showAlert("Success!", "Welcome aboard!");
      this.router.navigate(['/tabs']);
    }
  }catch(error) {
    console.dir(error)
    this.showAlert("Error!", error.message)
  }
  }
  goToReg() {
    this.router.navigate(['/register']);
  }
  async showAlert(header: string, message: string){
    const alert = await this.alert.create({
      header,
      message,
      buttons: ["OK"]
    })
    await  alert.present()
  }
  
}

