import { Component, OnInit } from '@angular/core';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { IntegranteService } from 'src/app/services/integrante.service';
import { AthService } from 'src/app/services/ath.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  totalProyecto:any;
  totalIntegra:any;
  
  constructor(private authService: AthService,
    private route:Router,
    private proyectoService: ProyectoService, 
    private integrantesService: IntegranteService) { }

  ngOnInit(): void {
    if(!this.authService.isAuthenticated()){
      this.route.navigate(['/login']);
    }
    this.totalProyecto = this.proyectoService.getTotalProyectos().subscribe(
      response => this.totalProyecto = response
    );
    this.totalIntegra = this.integrantesService.getTotalIntegrantes().subscribe(
      response => this.totalIntegra = response
    );
  }

}
