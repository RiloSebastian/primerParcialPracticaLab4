import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import { Actor } from '../clases/actor';

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

  public borrarActor(id: string) {
    this.firestore.collection('actores').doc(id).delete();
  }

  public traerPorPais(pais){
    return this.traerTodos().then(snap =>{
      return snap.docs.filter(doc =>{
        if (doc.data().pais && doc.data().pais === pais){
          return true;
        } else{
          return false;
        }
      });
    });
  }

  public editarActor(actor: Actor){
    return this.firestore.collection('actores').doc(actor.id).set({
      nombre: actor.nombre,
      apellido: actor.apellido,
      fechaDeNacimiento: actor.fechaDeNacimiento,
      pais: actor.pais,
      sexo: actor.sexo,
      foto: actor.foto,
    },{merge: true});
  }

  public agregarActor(pelicula) {
    return this.firestore.collection('actores').add({
      nombre: pelicula.nombre,
      apellido: pelicula.apellido,
      fechaDeNacimiento: pelicula.fechaDeNacimiento,
      pais: pelicula.pais,
      sexo: pelicula.sexo,
      foto: pelicula.foto,
    });
  }

}
