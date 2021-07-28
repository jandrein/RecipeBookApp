import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  collectionName = 'POST';

  constructor(
    private firestore: AngularFirestore
  ) { }

  create_account(record) {
    return this.firestore.collection(this.collectionName).add(record);
  }

  read_students() {
    return this.firestore.collection(this.collectionName).snapshotChanges();
  }


  update_post(recordID, record) {
    this.firestore.doc(this.collectionName + '/' + recordID).update(record);
  }

  delete_post(record_id) {
    this.firestore.doc(this.collectionName + '/' + record_id).delete();
  }

  getCurrentUserInfo(id: string)
  {
    return this.firestore.collection('POST').doc(id).valueChanges();
  }
  getPost(email:string){
    return this.firestore.collection<any>('POST', ref =>
        ref.where('email', '==', email)).valueChanges();
  }
  
}
