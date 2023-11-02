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
}