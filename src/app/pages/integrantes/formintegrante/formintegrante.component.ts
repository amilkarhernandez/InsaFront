import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { Integrante } from 'src/app/models/integrante';
import { IntegranteService } from 'src/app/services/integrante.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { Proyecto } from 'src/app/models/proyecto';

@Component({
  selector: 'app-formintegrante',
  templateUrl: './formintegrante.component.html',
  styleUrls: ['./formintegrante.component.css']
})
export class FormintegranteComponent implements OnInit {

  integrante: Integrante = new Integrante();
  proyecto: Proyecto[];
  errores: string[];

  constructor(private integranteService: IntegranteService,
    private proyectoService: ProyectoService,
    private router: Router, 
    private activateRouter: ActivatedRoute) { }

    ngOnInit(): void {
      this.cargarIntegrante();
      this.cargarProyectos();
    }
  
    cargarIntegrante(): void {
      this.activateRouter.params.subscribe(
        params => { 
          let id = params['id']
          if(id){
            this.integranteService.getIntegrante(id).subscribe(
              (inte) => this.integrante = inte
            )
          }
      }
      )
    }

    cargarProyectos(): void {
      this.proyectoService.getListProyectos().subscribe(
        proyecto => this.proyecto = proyecto
     );
    }
  
    compararProyectos(o1: Proyecto, o2: Proyecto){
      return o1==null || o2==null? false: o1.id==o2.id;
    }

    create(): void {
      this.integranteService.create(this.integrante).subscribe(
        usuario => {
          this.router.navigate(['/integrantes'])
          swal('Nuevo Integrante', 'Integrante creado con Exito', 'success')
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Código del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
      );
    }
  
    update(): void {
      this.integranteService.updateIntegrante(this.integrante).subscribe(
        cliente => {
          this.router.navigate(['/integrantes'])
          swal('Integrante Actualizado', 'Integrante Actualizado con Exito', 'success')
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      )
    }

}
