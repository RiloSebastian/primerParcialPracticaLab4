import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'detalle-pais',
	templateUrl: './detalle-pais.component.html',
	styleUrls: ['./detalle-pais.component.css']
})
export class DetallePaisComponent implements OnInit {
	@Input() pais: any;
	constructor() { }

	ngOnInit(): void {
		console.log(this.pais);
	}

}
