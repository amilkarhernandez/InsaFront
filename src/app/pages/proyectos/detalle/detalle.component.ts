import { Component, OnInit } from '@angular/core';
import { Proyecto } from 'src/app/models/proyecto';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  proyecto: Proyecto = new Proyecto();
  
  constructor(private proyectoService: ProyectoService,
    private activateRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarProyecto();
    console.log(this.proyecto);
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

}
