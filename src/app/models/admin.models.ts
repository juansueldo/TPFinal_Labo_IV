import { User } from "./user.models";

export class Admin implements User{
    id?: string;
    nombre: string;
    apellido: string;
    edad: number;
    dni: string;
    email: string;
    img_1: string;
    tipo = 'admin';
    constructor(nombre='',apellido='',edad = 0,dni='',email='',img_1=''){
        this.nombre = nombre;
        this.apellido =apellido;
        this.edad = edad;
        this.dni = dni;
        this.email = email;
        this.img_1 = img_1;
        this.tipo = 'admin';
    }
}