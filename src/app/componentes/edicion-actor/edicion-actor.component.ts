import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActoresService } from '../../servicios/actores.service';
import { PaisesService } from '../../servicios/paises.service';
import { Actor } from '../../clases/actor';

@Component({
	selector: 'edicion-actor',
	templateUrl: './edicion-actor.component.html',
	styleUrls: ['./edicion-actor.component.css']
})
export class EdicionActorComponent implements OnInit {
	@Input() actor: Actor;
	public edicionActorForm: FormGroup = new FormGroup({
		id: new FormControl(null),
		nombre: new FormControl(null, [Validators.required]),
		fechaDeNacimiento: new FormControl(null, [Validators.required]),
		sexo: new FormControl(null, [Validators.required]),
		apellido: new FormControl(null, [Validators.required]),
		pais: new FormControl(null),
		foto: new FormControl(null),
	});
	public mensajeError: string = null;
	public fechaMin: string = null;
	public fechaMax: string = null;
	public listapaises: Array<any> = null;
	public subAct = null;

	constructor(private paises: PaisesService, private actores: ActoresService) { }

	ngOnInit(): void {
		this.edicionActorForm.controls.id.setValue(this.actor.id);
		this.edicionActorForm.controls.pais.setValue(this.actor.pais);
		this.edicionActorForm.controls.nombre.setValue(this.actor.nombre);
		this.edicionActorForm.controls.apellido.setValue(this.actor.apellido);
		this.edicionActorForm.controls.foto.setValue(this.actor.foto);
		this.edicionActorForm.controls.sexo.setValue(this.actor.sexo);
		this.edicionActorForm.controls.fechaDeNacimiento.setValue(this.actor.fechaDeNacimiento);

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
		this.edicionActorForm.controls.sexo.setValue(tipo);
	}

	public seleccionarPais(pais) {
		console.log(pais);
		this.edicionActorForm.controls.pais.setValue(pais);
	}

	public seleccionarFecha(fecha) {
		let fechaAux = Date.parse(fecha.target.value);
		console.log(fechaAux);
		this.edicionActorForm.controls.fechaDeNacimiento.setValue(new Date(fechaAux).toLocaleDateString());
	}

	guardarActor() {
		console.log(this.edicionActorForm.controls)
		if (this.edicionActorForm.valid) {
			console.log('es valida');
			console.log(this.edicionActorForm.value);
			this.actores.editarActor(this.edicionActorForm.value).then(() => {

			}).catch(() => {
				this.mensajeError = 'ha ocurrido un error durante la carga del actor';
			})
		} else {
			this.mensajeError = 'el formulario no es valido';
		}
	}

	ngOnDestroy(): void {
		if (this.subAct !== null) {
			this.subAct.unsubscribe();
		}
	}

}
