import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import   auth   from 'firebase/app';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../user.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  email: string = ""
  password: string = ""
  cpassword: string = ""
  name: string = ""
  constructor(
    public afAuth: AngularFireAuth,
    public alert: AlertController,
    public afStore: AngularFirestore,
    public router: Router,
    public user: UserService 
    ) { }

  ngOnInit() {
  }


  async presentAlert(title: string, content: string){
    const alert = await this.alert.create({
      header: title,
      message: content,
      buttons: ['OK']
    })
  }

  async register(){
    const {email, password, cpassword, name} = this
      if (password !== cpassword){
        this.showAlert("Error!", "Password doesn't match")
        return console.error("Passwords don't match")
      }
      try{
        const res = await this.afAuth.createUserWithEmailAndPassword(email, password)

        this.afStore
        .doc(`users/${res.user.uid}`)
        .set({
          email,
          name
        })

        this.user.setUser({
          email,
          uid: res.user.uid
        })

        this.presentAlert('Success', 'You are registered!')
        this.router.navigate(['/login'])
      }catch(error){
        console.dir(error)
        this.showAlert("Error!", error.message)
      } 
    }

    async showAlert(header: string, message: string){
      const alert = await this.alert.create({
        header,
        message,
        buttons: ["OK"]
      })
      await alert.present()
    }

    goToLogin(){
      this.router.navigate(['/login'])
    }
}
