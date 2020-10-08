import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PaisesService } from '../../servicios/paises.service';

@Component({
  selector: 'tabla-paises',
  templateUrl: './tabla-paises.component.html',
  styleUrls: ['./tabla-paises.component.css']
})
export class TablaPaisesComponent implements OnInit {

	@Input() paises: Array<any> = null;
	@Output() paisSel: EventEmitter<any | null> = new EventEmitter<any | null>();
	public subPel = null;
	constructor(private paisesServ: PaisesService) { }

	ngOnInit(): void {}

	public seleccionarPais(pais) {
		this.paisSel.emit(pais.name);
	}

	ngOnDestroy(): void {
		if (this.subPel !== null) {
			this.subPel.unsubscribe();
		}
	}

}
