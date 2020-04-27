import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { Proyecto } from '../models/proyecto';
import { AthService } from './ath.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  public httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  private urlendpoint: string = 'http://localhost:8070/api/proyectos';

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

  //Metodos

  getListProyectos(): Observable<Proyecto[]>{
    return this.http.get<Proyecto[]>(this.urlendpoint, {headers: this.agregarAuthorization()}).pipe(
      catchError(e =>{
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

  getTotalProyectos(): Observable<[]>{
    return this.http.get<[]>(this.urlendpoint + '/totalproyectos', {headers: this.agregarAuthorization()}).pipe(
      catchError(e =>{
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

  //Metodos para consumir el servio
  create(proyecto: Proyecto): Observable<Proyecto> {
    return this.http.post<Proyecto> (this.urlendpoint, proyecto, {headers: this.agregarAuthorization()}).pipe(
      catchError(e =>{
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

  getProyecto(id): Observable<Proyecto>{
    return this.http.get<Proyecto>(`${this.urlendpoint}/${id}`, {headers: this.agregarAuthorization()}).pipe(
      catchError(e =>{
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  } 

  updateProyecto(proyecto: Proyecto): Observable<Proyecto>{
    return this.http.put<Proyecto>(`${this.urlendpoint}/${proyecto.id}`, proyecto, {headers: this.agregarAuthorization()}).pipe(
      catchError(e =>{
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

  deleteProyecto(id: number): Observable<Proyecto>{
    return this.http.delete<Proyecto>(`${this.urlendpoint}/${id}`, {headers: this.agregarAuthorization()}).pipe(
      catchError(e =>{
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

  subirArchivo(archivo: File):Observable<HttpEvent<{}>> {

    let formData = new FormData();
    formData.append("file", archivo);

    let httpHeaders = new HttpHeaders();
    let token = this.authService.token;
    if (token != null) {
      httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    const req = new HttpRequest('POST', `${this.urlendpoint}/subir`, formData, {
      headers: httpHeaders
    });

    return this.http.request(req).pipe(
      catchError(e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

}
