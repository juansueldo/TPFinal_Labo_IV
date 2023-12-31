import { User } from "./user.models";

export class Paciente implements User{
    id? : string;
    nombre: string;
    apellido: string;
    edad: number;
    dni: string;
    email!: string;
    img_1: string | undefined;
    tipo = "paciente";
    obraSocial: string;
    img_2: string | undefined;
  
    constructor(nombre = '', apellido = '', edad = 0, dni = '',email = '', obraSocial = '',img_1='',img_2='', id = '') {
      this.id = id;
      this.nombre = nombre;
      this.apellido = apellido;
      this.edad = edad;
      this.dni = dni;
      this.email = email;
      this.obraSocial = obraSocial;
      this.img_1= img_1;
      this.img_2= img_2;
    }
  
  }