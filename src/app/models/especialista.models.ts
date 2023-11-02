export class Especialista{
    id? : string;
    nombre: string;
    apellido: string;
    edad: number;
    dni: string;
    email: string;
    especialidades!: any[];
    img_1: string | undefined;
    estados:{
      registro: Registro;
    } | undefined
  
    constructor(nombre = '', apellido = '', edad = 0, dni = '',email = '', id = '') {
      this.id = id;
      this.nombre = nombre;
      this.apellido = apellido;
      this.edad = edad;
      this.dni = dni;
      this.email = email;
      estados:{
        registro:Registro
    }
    }
  
  }
export enum Registro{
    pendiente,
    aceptado,
    rechazado
}