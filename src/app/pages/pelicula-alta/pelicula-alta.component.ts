import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActoresService } from '../../servicios/actores.service';
import { PeliculasService } from '../../servicios/peliculas.service';
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
		actores: new FormControl(null),
		fotoDeLaPelicula: new FormControl(null),
	});
	public mensajeError: string = null;
	public spinner: boolean = false;
	public fechaMin: string = null;
	public fechaMax: string = null;
	public listaActores: Array<Actor> = null;
	public subAct = null;
	constructor(private peliculas: PeliculasService, private actores: ActoresService) { }

	ngOnInit(): void {
		this.generarFechas();
		this.subAct = this.actores.traerTodosTiempoReal().subscribe(snap => {
			this.listaActores = snap.map(actor => {
				const x = actor.payload.doc.data()
				x['id'] = actor.payload.doc.id
				return { ...x as Actor };
			});
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

	guardarPelicula(){
		console.log(this.altaPeliculaForm.controls)
		if(this.altaPeliculaForm.valid){
			console.log('es valida');
			this.peliculas.agregarPelicula(this.altaPeliculaForm.value).then(()=>{

			}).catch(()=>{
				this.mensajeError = 'ha ocurrido un error durante la carga de la pelicula';
			})
		} else{
			this.mensajeError = 'el formulario no es valido';
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
