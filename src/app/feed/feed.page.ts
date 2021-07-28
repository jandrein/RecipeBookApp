import { Component, OnInit } from '@angular/core';
import firebaseConfig from '../firebase';
import {FirebaseService} from '../firebase.services'


@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {
  searchTerm: string;
  postList = [];

  constructor(
    private firebaseService : FirebaseService,
    ) { }

  ngOnInit() {
    this.firebaseService.read_students().subscribe(data => {

      this.postList = data.map(e => {
        return {
          recipe: e.payload.doc.data()['recipe'],
          categ: e.payload.doc.data()['categ'],
          ingred: e.payload.doc.data()['ingred'],
          instruc: e.payload.doc.data()['instruc'],
          email: e.payload.doc.data()['email']
        };
      })
      console.log(this.postList);

    });
  }
}