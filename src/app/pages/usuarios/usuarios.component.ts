import { Component, OnInit } from '@angular/core';
import { Usuarios } from 'src/app/models/usuarios';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AthService } from 'src/app/services/ath.service';
import swal from 'sweetalert2';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuario: Usuarios[];

  constructor(private usuarioService: UsuarioService,
    public authService: AthService,) { }

  ngOnInit(): void {
    this.usuarioService.getListUsuarios().subscribe(
      usuarios => this.usuario = usuarios
   );
  }

  delete(usuario: Usuarios): void{
    swal({
      title: 'Estas Seguro?',
      text: "Seguro deseas Eliminar este Usuario?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.value) {
        this.usuarioService.deleteUsuario(usuario.id).subscribe(
          reponse => {
            this.usuario = this.usuario.filter(user=> user !== usuario)
            swal(
              'Borrado!',
              'El Usuario ha sido Eliminado con Exito',
              'success'
            )
          }
        )
        
      }
    })
  }

}
