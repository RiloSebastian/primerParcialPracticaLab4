export class Actor {
	public id?: number;
	public nombre: string;
	public apellido: string;
	public sexo: string;
	public fechaDeNacimiento: string;
	public foto: string;

	constructor(nombre: string, apellido: string, sexo: string, fechaDeNacimiento: string, foto: string, id?: number) {
		this.nombre = nombre;
		this.apellido = apellido;
		this.sexo = sexo;
		this.fechaDeNacimiento = fechaDeNacimiento;
		this.foto = foto;
		this.id = id;
	}
}