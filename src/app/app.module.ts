import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './pages/login/login.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { ProyectosComponent } from './pages/proyectos/proyectos.component';
import { IntegrantesComponent } from './pages/integrantes/integrantes.component';
import { FormusuarioComponent } from './pages/usuarios/formusuario/formusuario.component';
import { FormproyectoComponent } from './pages/proyectos/formproyecto/formproyecto.component';
import { FormintegranteComponent } from './pages/integrantes/formintegrante/formintegrante.component';
import { DetalleComponent } from './pages/proyectos/detalle/detalle.component';
import { UpfileproyectoComponent } from './pages/proyectos/upfileproyecto/upfileproyecto.component';
import { UpfileintegranteComponent } from './pages/integrantes/upfileintegrante/upfileintegrante.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'dasboard', component: DashboardComponent},
  {path: 'usuarios', component: UsuariosComponent},
  {path: 'formusuario', component: FormusuarioComponent},
  {path: 'formusuario/:id', component: FormusuarioComponent},
  {path: 'proyectos', component: ProyectosComponent},
  {path: 'proyectos/upfileproyecto', component: UpfileproyectoComponent},
  {path: 'formproyecto', component: FormproyectoComponent},
  {path: 'formproyecto/:id', component: FormproyectoComponent},
  {path: 'integrantes', component: IntegrantesComponent},
  {path: 'formintegrantes', component: FormintegranteComponent},
  {path: 'integrantes/upfileproyecto', component: UpfileintegranteComponent},
  {path: 'formintegrantes/:id', component: FormintegranteComponent},
  {path: 'formdetalle/:id', component: DetalleComponent},
  
  
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    DashboardComponent,
    LoginComponent,
    UsuariosComponent,
    ProyectosComponent,
    IntegrantesComponent,
    FormusuarioComponent,
    FormproyectoComponent,
    FormintegranteComponent,
    DetalleComponent,
    UpfileproyectoComponent,
    UpfileintegranteComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule, ReactiveFormsModule, MatAutocompleteModule, 
    MatInputModule, MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
