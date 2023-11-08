import { Especialidad } from "./interfaces.models";
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
    especialidades!: Especialidad[];
    estados:Registro | undefined;
  
    constructor(nombre = '', apellido = '', edad = 0, dni = '',email = '',especialidades=[], id = '') {
      this.id = id;
      this.nombre = nombre;
      this.apellido = apellido;
      this.edad = edad;
      this.dni = dni;
      this.email = email;
      this.especialidades = especialidades;
      this.estados= Registro.pendiente;
    }
  
  }
export enum Registro{
    pendiente,
    aceptado,
    rechazado
}