import { Actor } from './actor';

export class Pelicula {
	public id?: string;
	public nombre: string;
	public tipo: string;
	public fechaDeEstreno: string;
	public cantidadDePublico: number;
	public fotoDeLaPelicula: string;
	public actores: Array<Actor>;

	constructor(nombre: string, tipo: string, fechaDeEstreno: string, cantidadDePublico: number, fotoDeLaPelicula: string, actores:Array<Actor>, id?: string) {
		this.nombre = nombre;
		this.tipo = tipo;
		this.fechaDeEstreno = fechaDeEstreno;
		this.cantidadDePublico = cantidadDePublico;
		this.fotoDeLaPelicula = fotoDeLaPelicula;
		this.id = id;
	}
}