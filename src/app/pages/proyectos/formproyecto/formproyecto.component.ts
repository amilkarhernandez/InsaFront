import { Component, OnInit } from '@angular/core';
import { Proyecto } from 'src/app/models/proyecto';
import { Router, ActivatedRoute } from '@angular/router';
import { ProyectoService } from 'src/app/services/proyecto.service';
import swal from 'sweetalert2';
import { Integrante } from 'src/app/models/integrante';

@Component({
  selector: 'app-formproyecto',
  templateUrl: './formproyecto.component.html',
  styleUrls: ['./formproyecto.component.css']
})
export class FormproyectoComponent implements OnInit {

  
  proyecto: Proyecto = new Proyecto();
  integ: Integrante = new Integrante();
  errores: string[];

  constructor(private proyectoService: ProyectoService,
    private router: Router, 
    private activateRouter: ActivatedRoute) { }

    ngOnInit(): void {
      console.log(this.proyecto);
      this.cargarProyecto();
    }
  
    cargarProyecto(): void {
      this.activateRouter.params.subscribe(
        params => { 
          let id = params['id']
          if(id){
            this.proyectoService.getProyecto(id).subscribe(
              (proyecto) => this.proyecto = proyecto
            )
          }
      }
      )
    }
  
    create(proyectoForm): void {
      console.log(this.proyecto);
      this.proyectoService.create(this.proyecto).subscribe(
        proyecto => {
          this.router.navigate(["/proyectos"]);
          swal('Nuevo Proyecto', 'Proyecto creado con Exito', 'success')
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Código del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
      );
    }
  
    update(): void {
      this.proyectoService.updateProyecto(this.proyecto).subscribe(
        proyecto => {
          this.router.navigate(['/proyectos'])
          swal('Proyecto Actualizado', 'Proyecto Actualizado con Exito', 'success')
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      )
    }

    selecionar(): void{
      let nuevoItem = new Integrante();
      this.proyecto.integrante.push(nuevoItem);
    }

    eliminarItem(nombre: string): void {
      console.log(nombre);
      //this.factura.items = this.factura.items.filter((item: ItemFactura) => id !== item.producto.id);
      this.proyecto.integrante = this.proyecto.integrante.filter((item: Integrante) => nombre !== item.nombre);
    }

}
