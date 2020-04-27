import { Component, OnInit } from '@angular/core';
import { Usuarios } from 'src/app/models/usuarios';
import swal from 'sweetalert2';
import { AthService } from 'src/app/services/ath.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: Usuarios;

  constructor(private authService: AthService, private route: Router) { 
    this.usuario=new Usuarios();
  }

  ngOnInit(): void {
    if(this.authService.isAuthenticated()){
      this.route.navigate(['/dasboard']);
    }
  }

  //Inicio de Session
  login():void{
    console.log(this.usuario);
    if(this.usuario.username==null || this.usuario.password == null){
      swal('Error Login', 'Username o Pasword Vacios !','error');
      return;
    }

    this.authService.login(this.usuario).subscribe(
      response => {
        console.log(response);
        this.authService.guardarUsuario(response.access_token);
        this.authService.guardarToken(response.access_token);

        this.route.navigate(['/dasboard']);
      }, err => {
        if(err.status == 400 || err.status == 401){
          swal('Error Login', 'Username o Pasword Incorrecta !','error');
        } 
      }
    );
  }

}
