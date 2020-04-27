import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { Usuarios } from '../models/usuarios';
import { AthService } from './ath.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  private urlendpoint: string = 'http://localhost:8070/api/usuarios';

  constructor(private http: HttpClient, private router: Router, private authService: AthService) { }

  private agregarAuthorization(){
    let token = this.authService.token;
    if (token != null) {
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    return this.httpHeaders;
  }

  //Se verifica si esta autorizado, con los erres 401(NO Autorizado) y 404(Prohibido)
  private isNoAutorizado(e): Boolean{
    if(e.status==401 || e.status==403){
      if(this.authService.isAuthenticated()){
        if(this.isTokenExpirado()){
          this.authService.logout();
          this.router.navigate(['/login'])
        }
        this.authService.logout();
      }
      this.router.navigate(['/login'])
      return true;
    }
    return false;
  }

  isTokenExpirado():boolean{
    let token = this.authService.token;
    let payload = this.authService.obtenerDatosToken(token);
    let now = new Date().getTime() / 1000;
    if(payload.exp < now){
      return true;
    }
    return false;
  }

  //Metodos para Crud un Usuario

  getListUsuarios(): Observable<Usuarios[]>{
    return this.http.get<Usuarios[]>(this.urlendpoint, {headers: this.agregarAuthorization()}).pipe(
      catchError(e =>{
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

  create(producto: Usuarios): Observable<Usuarios> {
    return this.http.post<Usuarios> (this.urlendpoint, producto, {headers: this.agregarAuthorization()}).pipe(
      catchError(e =>{
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

  getUsuario(id): Observable<Usuarios>{
    return this.http.get<Usuarios>(`${this.urlendpoint}/${id}`, {headers: this.agregarAuthorization()}).pipe(
      catchError(e =>{
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  } 

  updateUsuario(usuario: Usuarios): Observable<Usuarios>{
    return this.http.put<Usuarios>(`${this.urlendpoint}/${usuario.id}`, usuario, {headers: this.agregarAuthorization()}).pipe(
      catchError(e =>{
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

  deleteUsuario(id: number): Observable<Usuarios>{
    return this.http.delete<Usuarios>(`${this.urlendpoint}/${id}`, {headers: this.agregarAuthorization()}).pipe(
      catchError(e =>{
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }
  
}
