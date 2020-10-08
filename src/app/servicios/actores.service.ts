import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ActoresService {
  public mockApi: string = 'https://api.mocki.io/v1/a4a285e1';

  constructor(private firestore: AngularFirestore, private http: HttpClient) {
    /*this.traerTodos().then(snap => {
      let arr = snap as Array<any>;
      arr.forEach(doc => {
        this.firestore.collection('actores').add(doc);
      })
    })*/
  }

  public traerTodosTiempoReal() {
    //return this.http.get(this.mockApi);
    return this.firestore.collection('actores').snapshotChanges();
  }

  public traerTodos() {
    //return this.http.get(this.mockApi).toPromise();
    return this.firestore.collection('actores').get().toPromise();
  }
}
