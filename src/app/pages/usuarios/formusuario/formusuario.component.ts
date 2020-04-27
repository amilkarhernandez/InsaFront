import { Component, OnInit } from '@angular/core';
import { Usuarios } from 'src/app/models/usuarios';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-formusuario',
  templateUrl: './formusuario.component.html',
  styleUrls: ['./formusuario.component.css']
})
export class FormusuarioComponent implements OnInit {

  usuario:Usuarios = new Usuarios;
  errores: string[];

  constructor(private usuarioService: UsuarioService,
    private router: Router, 
    private activateRouter: ActivatedRoute) { }

    ngOnInit(): void {
      this.cargarProducto();
    }
  
    cargarProducto(): void {
      this.activateRouter.params.subscribe(
        params => { 
          let id = params['id']
          if(id){
            this.usuarioService.getUsuario(id).subscribe(
              (usuario) => this.usuario = usuario
            )
          }
      }
      )
    }
  
    create(): void {
      this.usuarioService.create(this.usuario).subscribe(
        usuario => {
          this.router.navigate(['/usuarios'])
          swal('Nuevo Usuario', 'Usuario creado con Exito', 'success')
      },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      );
    }
  
    update(): void {
      this.usuarioService.updateUsuario(this.usuario).subscribe(
        cliente => {
          this.router.navigate(['/usuarios'])
          swal('Usuaro Actualizado', 'Usuario Actualizado con Exito', 'success')
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      )
    }

}
