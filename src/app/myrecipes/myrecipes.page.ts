import { Component, OnInit, Injectable  } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import {FirebaseService} from '../firebase.services'
import { UserService } from '../user.service';

@Component({
  selector: 'app-myrecipes',
  templateUrl: './myrecipes.page.html',
  styleUrls: ['./myrecipes.page.scss'],
})

export class MyrecipesPage implements OnInit {

  studentList = [];
  currentUser ;
  postUpload = [] ;
  userDoc: any;

  constructor(private firebaseService: FirebaseService,
    public fireauth: AngularFireAuth,
    private fireStore: AngularFirestore, private router: Router) { }

  ngOnInit() {

  //  const UID = console.log(sessionStorage.getItem('uid'));
  const UID: string= sessionStorage.getItem('uid');
  const Lemail: string = sessionStorage.getItem('email')
  //  const res  = this.fireStore.doc(`Students/${UID}`);

  // const res  = this.fireStore.doc('Students' +'/' + UID);
  // console.log(res)

  //  res.get({
      
  //  })
    this.firebaseService.getCurrentUserInfo(UID).subscribe(data =>
    {
      this.currentUser = data;
      console.log(this.currentUser)
    })

      this.firebaseService.getPost(Lemail).subscribe(POST =>
          {
            this.postUpload = POST
            console.log(this.postUpload);
      
          }); 
  }


RemovePost(uid){
  this.firebaseService.delete_post(uid);
}

logOut() {
  this.fireauth.signOut().then(() => {
    this.router.navigate(['/login']);
  });
}
  

}
