import { Proyecto } from './proyecto';

export class Integrante {
    id:number;
    nombre:string;
    apellido:string;
    email:string;
    genero:string;
    proyecto: Proyecto;
}
