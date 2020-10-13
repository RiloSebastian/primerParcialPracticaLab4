import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {
	public api:string = 'https://restcountries.eu/rest/v2';
  constructor(private http: HttpClient) { }

  public traerTodosTiempoReal() {
		return this.http.get(this.api);
	}

	public traerTodos() {
		return this.http.get(this.api).toPromise();
	}

	public traerUno(nombre:string){
		return this.http.get(this.api+'/name/'+nombre).toPromise();
	}
}
