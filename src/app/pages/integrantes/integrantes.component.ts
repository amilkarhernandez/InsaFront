import { Component, OnInit } from '@angular/core';
import { Integrante } from 'src/app/models/integrante';
import { IntegranteService } from 'src/app/services/integrante.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-integrantes',
  templateUrl: './integrantes.component.html',
  styleUrls: ['./integrantes.component.css']
})
export class IntegrantesComponent implements OnInit {

  integrantes:Integrante[];

  constructor(private integranteService:IntegranteService) { }

  ngOnInit(): void {
    this.integranteService.getListIntegrantes().subscribe(
      integrantes => this.integrantes = integrantes
   );
  }

  delete(integrante: Integrante): void{
    swal({
      title: 'Estas Seguro?',
      text: "Seguro deseas Eliminar este Integrante?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.value) {
        this.integranteService.deleteIntegrante(integrante.id).subscribe(
          reponse => {
            this.integrantes = this.integrantes.filter(inte=> inte !== integrante)
            swal(
              'Borrado!',
              'El Integrante ha sido Eliminado con Exito',
              'success'
            )
          }
        )
        
      }
    })
  }

}
