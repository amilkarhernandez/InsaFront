import { Integrante } from './integrante';

export class Proyecto {
    id:number;
    codigoProyecto:string;
    projNombre:string;
    projDescripcion:string;
    totalHoras:number;
    costoTotal: number;
    integrante: Array<Integrante> = [];
}
