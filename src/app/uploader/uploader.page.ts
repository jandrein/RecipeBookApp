import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../user.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import  firestore  from '@firebase/app'
import { FormGroup, Validators, FormBuilder } from '@angular/forms';


interface postData {
  recipe: string;
  categ: string;
  ingred: string;
  instruct: string;
  name: string
}

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.page.html',
  styleUrls: ['./uploader.page.scss'],
})

export class UploaderPage implements OnInit {
  
  post = {
    recipe:'',
    categ: '',
    ingred: '',
    instruc: '',
    email: ''
  }
  
  postData: postData;
  postForm: FormGroup;

  constructor(
    public http: HttpClient,
    public afStore: AngularFirestore,
    // public user: UserService,
    public alert: AlertController,
    private router: Router,
    public fb: FormBuilder 
    ) { }

  ngOnInit() {
    this.postForm = this.fb.group({
      recipe: ['', [Validators.required]],
      categ:['', [Validators.required]],
      ingred: ['', [Validators.required]],
      instruc:['', [Validators.required]],
      email:['', [Validators.required]],
      })

  }

  async createRecipe(){
    const UID = this.afStore.createId();
    this.afStore.doc(`POST/${UID}`).set({
      recipe: this.postForm.value['recipe'],
      categ: this.postForm.value['categ'],
      ingred: this.postForm.value['ingred'],
      instruc: this.postForm.value['instruc'],
      email: this.postForm.value['email'],
    }).then(resp => {
      this.postForm.reset();
      this.showAlert("Success!", "Your recipe is uploaded!", '/tabs');
    })
      .catch(error => {
        console.log(error);
      });

  }
  async displayAlert(header: string, message: string){
    const alert = await this.alert.create({
      header,
      message,
      buttons:
      [
        {
          text: 'Okay',
          handler: () => 
          {
            this.router.navigate(['/uploader']);
          }
        },
        
      ]
    })
  }
  async showAlert(header: string, message: string, path: string){
    const alert = await this.alert.create({
      header,
      message,
      buttons: 
      [
        {
          text: 'Okay',
          handler: () => 
          {
            this.router.navigate(['/tabs']);
          }
        },
        
      ]
    })
    await  alert.present()
    }
}
