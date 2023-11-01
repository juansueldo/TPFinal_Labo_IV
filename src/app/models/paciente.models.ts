export class Paciente{
    id? : string;
    nombre: string;
    apellido: string;
    edad: number;
    dni: string;
    email!: string;
    obraSocial: string;
    img_1: string | undefined;
    img_2: string | undefined;
  
    constructor(nombre = '', apellido = '', edad = 0, dni = '',email = '', obraSocial = '', id = '') {
      this.id = id;
      this.nombre = nombre;
      this.apellido = apellido;
      this.edad = edad;
      this.dni = dni;
      this.email = email;
      this.obraSocial = obraSocial;
    }
  
  }