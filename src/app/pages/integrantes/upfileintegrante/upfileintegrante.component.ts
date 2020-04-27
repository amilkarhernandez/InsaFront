import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { IntegranteService } from 'src/app/services/integrante.service';


@Component({
  selector: 'app-upfileintegrante',
  templateUrl: './upfileintegrante.component.html',
  styleUrls: ['./upfileintegrante.component.css']
})
export class UpfileintegranteComponent implements OnInit {

  private archivoSeleccionado: File;

  constructor(private integranteService: IntegranteService, private route:Router) { }

  ngOnInit(): void {
  }

  seleccionarArchivo(event){
    this.archivoSeleccionado = event.target.files[0];
    console.log(this.archivoSeleccionado);
  }

  subirArchivo(){
    if (!this.archivoSeleccionado) {
      swal('Error Upload: ', 'Debe seleccionar una Archivo', 'error');
    } else {
      this.integranteService.subirArchivo(this.archivoSeleccionado).subscribe(
        response => {
          this.route.navigateByUrl('/formproyecto', {skipLocationChange: true}).then(()=>
          this.route.navigate(["/integrantes"])); 
          swal('Información!', 'Se Agregó Correctamente el Archivo', 'success');
        }
      );
    }
        
  }

}
