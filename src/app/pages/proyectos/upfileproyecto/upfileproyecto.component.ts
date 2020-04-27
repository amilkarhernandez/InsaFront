import { Component, OnInit } from '@angular/core';
import { ProyectoService } from 'src/app/services/proyecto.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upfileproyecto',
  templateUrl: './upfileproyecto.component.html',
  styleUrls: ['./upfileproyecto.component.css']
})
export class UpfileproyectoComponent implements OnInit {

  private archivoSeleccionado: File;

  constructor(private proyectoService: ProyectoService, private route:Router) { }

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
      this.proyectoService.subirArchivo(this.archivoSeleccionado).subscribe(
        response => {
          // this.route.navigateByUrl('/proyectos', { skipLocationChange: true });
          // this.route.navigate(['/proyectos']);
          
          swal('Información!', 'Se Agregó Correctamente el Archivo', 'success');
          this.route.navigateByUrl('/formproyecto', {skipLocationChange: true}).then(()=>
          this.route.navigate(["/proyectos"])); 
        }
      );
    }
        
  }

}
