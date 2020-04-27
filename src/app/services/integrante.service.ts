import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { Integrante } from '../models/integrante';
import { catchError } from 'rxjs/operators';
import { AthService } from './ath.service';

@Injectable({
  providedIn: 'root'
})
export class IntegranteService {

  public httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  private urlendpoint: string = 'http://localhost:8070/api/integrantes';

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

  getListIntegrantes(): Observable<Integrante[]>{
    return this.http.get<Integrante[]>(this.urlendpoint, {headers: this.agregarAuthorization()}).pipe(
      catchError(e =>{
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

  getTotalIntegrantes(): Observable<[]>{
    return this.http.get<[]>(this.urlendpoint + '/totalintegrantes');
  }

  create(inte: Integrante): Observable<Integrante> {
    return this.http.post<Integrante> (this.urlendpoint, inte, {headers: this.agregarAuthorization()}).pipe(
      catchError(e =>{
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

  getIntegrante(id): Observable<Integrante>{
    return this.http.get<Integrante>(`${this.urlendpoint}/${id}`, {headers: this.agregarAuthorization()}).pipe(
      catchError(e =>{
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  } 

  updateIntegrante(inte: Integrante): Observable<Integrante>{
    return this.http.put<Integrante>(`${this.urlendpoint}/${inte.id}`, inte, {headers: this.agregarAuthorization()}).pipe(
      catchError(e =>{
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

  deleteIntegrante(id: number): Observable<Integrante>{
    return this.http.delete<Integrante>(`${this.urlendpoint}/${id}`, {headers: this.agregarAuthorization()}).pipe(
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
