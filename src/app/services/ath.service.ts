import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Usuarios } from '../models/usuarios';
import { ThrowStmt } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class AthService {

  private _usuario: Usuarios;
  private _token: string;

  constructor(private http: HttpClient) { }

  //Seter y getter
  public get usuario(): Usuarios{
    if (this._usuario != null) {
      return this._usuario;
    } else if (this._usuario == null && sessionStorage.getItem('usuario') != null) {
      this._usuario = JSON.parse(sessionStorage.getItem('usuario')) as Usuarios;
      return this._usuario;
    }
    return new Usuarios();
  }

  public get token(): string{
    if (this._token != null) {
      return this._token;
    } else if (this._token == null && sessionStorage.getItem('token') != null) {
      this._token = sessionStorage.getItem('token');
      return this._token;
    }
    return null;
  }

  login(usuario: Usuarios):Observable<any>{
    const urlendpoint: string = 'http://localhost:8070/oauth/token';
    const credenciales = btoa('angularapp' + ':' + '12345');
    const httpHeaders = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic '+ credenciales});

    let params = new URLSearchParams();
    params.set('grant_type','password');
    params.set('username', usuario.username);
    params.set('password', usuario.password);
    return this.http.post(urlendpoint, params.toString(), {headers: httpHeaders});
  }

  guardarUsuario(accessToken: string):void{
    let payload = this.obtenerDatosToken(accessToken);
    this._usuario = new Usuarios();
    this._usuario.nombres = payload.nombres;
    this._usuario.apellidos = payload.apellidos;
    this._usuario.username = payload.user_name;
    this._usuario.roles = payload.authorities;
    sessionStorage.setItem('usuario', JSON.stringify(this._usuario));
  };

  guardarToken(accessToken: string):void{
    this._token = accessToken;
    sessionStorage.setItem('token', accessToken);
  };

  obtenerDatosToken(accessToken: string): any {
    if (accessToken != null) {
      return JSON.parse(atob(accessToken.split(".")[1]));
    }
    return null;
  }

  isAuthenticated(): boolean{
    let payload = this.obtenerDatosToken(this.token);
    if(payload != null && payload.user_name && payload.user_name.length>0){
      return true;
    }
    return false;
  }

  logout():void{
    this._token=null;
    this._usuario=null;
    sessionStorage.clear();
  }

  hasrole(role:string): boolean{
    if(this.usuario.roles.includes(role)){
      return true;
    }
    return false;
  }
}
