import { Component, OnInit } from '@angular/core';
import { Proyecto } from 'src/app/models/proyecto';
import { ProyectoService } from 'src/app/services/proyecto.service';
import swal from 'sweetalert2';
import { AthService } from 'src/app/services/ath.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {

  proyecto: Proyecto[];
  

  constructor(private proyectoService:ProyectoService, public authService: AthService) { }

  ngOnInit(): void {
    this.proyectoService.getListProyectos().subscribe(
      proyectos => this.proyecto = proyectos 
   );
   
  }

  delete(proyecto: Proyecto): void{
    swal({
      title: 'Estas Seguro?',
      text: "Seguro deseas Eliminar este Proyecto?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.value) {
        this.proyectoService.deleteProyecto(proyecto.id).subscribe(
          reponse => {
            this.proyecto = this.proyecto.filter(proy=> proy !== proyecto)
            swal(
              'Borrado!',
              'El Proyecto ha sido Eliminado con Exito',
              'success'
            )
          }
        )
        
      }
    })
  }

}
