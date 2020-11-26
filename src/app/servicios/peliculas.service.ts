import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class PeliculasService {
	public mockApi: string = 'https://api.mocki.io/v1/40013b0a';

	constructor(private firestore: AngularFirestore, private http: HttpClient) {
	}

	public traerTodosTiempoReal() {
		//return this.http.get(this.mockApi);
		return this.firestore.collection('peliculas').snapshotChanges();
	}

	public traerTodos() {
		//return this.http.get(this.mockApi).toPromise();
		return this.firestore.collection('peliculas').get().toPromise();
	}

	public traerPorActor(nombre, apellido){
		return this.traerTodos().then(snap =>{
			return snap.docs.filter(doc =>{
				if (doc.data().actores.nombre === nombre && doc.data().actores.apellido === apellido){
					return true;
				} else{
					return false;
				}
			});
		});
	}

	public traerPorPais(pais){
		return this.traerTodos().then(snap =>{
			return snap.docs.filter(doc =>{
				if (doc.data().paisDeOrigen && doc.data().paisDeOrigen === pais){
					return true;
				} else{
					return false;
				}
			});
		});
	}

	public borrarPelicula(id: string) {
		this.firestore.collection('peliculas').doc(id).delete();
	}

	public agregarPelicula(pelicula) {
		return this.firestore.collection('peliculas').add({
			nombre: pelicula.nombre,
			tipo: pelicula.tipo,
			fechaDeEstreno: pelicula.fechaDeEstreno,
			cantidadDePublico: pelicula.cantidadDePublico,
			fotoDeLaPelicula: pelicula.fotoDeLaPelicula,
			paisDeOrigen: pelicula.paisDeOrigen,
			actores: pelicula.actores
		});
	}
}
