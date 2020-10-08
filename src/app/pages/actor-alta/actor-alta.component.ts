import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActoresService } from '../../servicios/actores.service';
import { PaisesService } from '../../servicios/paises.service';
import { Actor } from '../../clases/actor';

@Component({
	selector: 'app-actor-alta',
	templateUrl: './actor-alta.component.html',
	styleUrls: ['./actor-alta.component.css']
})
export class ActorAltaComponent implements OnInit, OnDestroy {

	public altaPeliculaForm: FormGroup = new FormGroup({
		nombre: new FormControl(null, [Validators.required]),
		fechaDeNacimiento: new FormControl(null, [Validators.required]),
		sexo: new FormControl(null, [Validators.required]),
		apellido: new FormControl(null, [Validators.required]),
		pais: new FormControl(null),
		foto: new FormControl(null),
	});

	public mensajeError: string = null;
	public spinner: boolean = false;
	public fechaMin: string = null;
	public fechaMax: string = null;
	public listapaises: Array<any> = null;
	public subAct = null;

	constructor(private paises: PaisesService, private actores: ActoresService) { }

	ngOnInit(): void {
		this.generarFechas();
		this.subAct = this.paises.traerTodosTiempoReal().subscribe(snap => {
			this.listapaises = snap as Array<any>;
			console.log(this.listapaises);
		});
	}

	public generarFechas() {
		let date: Date = new Date();
		this.fechaMin = new Date('1900-01-01').toISOString().split('T')[0];
		this.fechaMax = new Date().toISOString().split('T')[0];
	}

	public seleccionarTipo(tipo) {
		console.log(tipo);
		this.altaPeliculaForm.controls.sexo.setValue(tipo);
	}

	public seleccionarFecha(fecha) {
		let fechaAux = Date.parse(fecha.target.value);
		console.log(fechaAux);
		this.altaPeliculaForm.controls.fechaDeNacimiento.setValue(new Date(fechaAux).toLocaleDateString());
	}

	guardarActor() {
		console.log(this.altaPeliculaForm.controls)
		if (this.altaPeliculaForm.valid) {
			console.log('es valida');
			this.actores.agregarActor(this.altaPeliculaForm.value).then(() => {

			}).catch(() => {
				this.mensajeError = 'ha ocurrido un error durante la carga del actor';
			})
		} else {
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
