import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActoresService } from '../../servicios/actores.service';
import { PeliculasService } from '../../servicios/peliculas.service';
import { PaisesService } from '../../servicios/paises.service';
import { Actor } from '../../clases/actor';

@Component({
	selector: 'app-pelicula-alta',
	templateUrl: './pelicula-alta.component.html',
	styleUrls: ['./pelicula-alta.component.css']
})
export class PeliculaAltaComponent implements OnInit, OnDestroy {
	public altaPeliculaForm: FormGroup = new FormGroup({
		nombre: new FormControl(null, [Validators.required]),
		fechaDeEstreno: new FormControl(null, [Validators.required]),
		tipo: new FormControl(null, [Validators.required]),
		cantidadDePublico: new FormControl(null, [Validators.required]),
		actores: new FormControl(null, [Validators.required]),
		fotoDeLaPelicula: new FormControl(null),
		paisDeOrigen: new FormControl(null, [Validators.required]),
	});
	public mensajeError: string = null;
	public mensajeExito: string = null;
	public spinner: boolean = false;
	public fechaMin: string = null;
	public fechaMax: string = null;
	public listaActores: Array<Actor> = null;
	public listaPaises: Array<any> = null;
	public subAct = null;
	public subPel = null;
	constructor(private peliculas: PeliculasService, private actores: ActoresService, private paises: PaisesService) { }

	ngOnInit(): void {
		this.generarFechas();
		this.subAct = this.actores.traerTodosTiempoReal().subscribe(snap => {
			this.listaActores = snap.map(actor => {
				const x = actor.payload.doc.data()
				x['id'] = actor.payload.doc.id
				return { ...x as Actor };
			});
		});
		this.paises.traerTodos().then(snap => {
			this.listaPaises = snap as Array<any>;
		});
	}

	public generarFechas() {
		let date: Date = new Date();
		this.fechaMin = new Date('1878-06-15').toISOString().split('T')[0];
		this.fechaMax = new Date().toISOString().split('T')[0];
	}

	public seleccionarTipo(tipo) {
		console.log(tipo);
		this.altaPeliculaForm.controls.tipo.setValue(tipo);
	}

	public seleccionarFecha(fecha) {
		let fechaAux = Date.parse(fecha.target.value);
		console.log(fechaAux);
		this.altaPeliculaForm.controls.fechaDeEstreno.setValue(new Date(fechaAux).toLocaleDateString());
	}

	guardarPelicula() {
		console.log(this.altaPeliculaForm.controls)
		if (this.altaPeliculaForm.valid) {
			console.log('es valida');
			this.peliculas.agregarPelicula(this.altaPeliculaForm.value).then(() => {
				this.mensajeExito = 'pelicula dada de alta!';
			}).catch(() => {
				this.mensajeError = 'ha ocurrido un error durante la carga de la pelicula';
			}).finally(() => {
				setTimeout(() => {
					this.mensajeError = null;
				}, 3000)
			})
		} else {
			this.mensajeError = 'el formulario no es valido';
			setTimeout(() => {
				this.mensajeError = null;
			}, 3000)
		}
	}

	/*public seleccionarFoto(foto) {
		this.altaPeliculaForm.controls.foto.setValue(foto[0]);
	}*/

	ngOnDestroy(): void {
		if (this.subAct !== null) {
			this.subAct.unsubscribe();
		}
	}

}
