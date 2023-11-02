import { User } from "./user.models";

export class Especialista implements User{
    id? : string;
    nombre: string;
    apellido: string;
    edad: number;
    dni: string;
    email: string;
    img_1: string | undefined;
    tipo = "especialista";
    especialidades!: any[];
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