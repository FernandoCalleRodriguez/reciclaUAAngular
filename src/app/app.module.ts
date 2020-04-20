
import { PuntoService } from './shared/services/punto.service';
import { EstanciaService } from './shared/services/estancia.service';
import { PlantaService } from './shared/services/planta.service';
import { EdificioService } from './shared/services/edificio.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { LoginComponent } from './login/login.component';
import { CrearComponent } from './admin/crear/crear.component';
import { ListadminComponent } from './admin/listadmin/listadmin.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { ListwebComponent } from './web/listweb/listweb.component';
import { ModificarwebComponent } from './web/modificarweb/modificarweb.component';
import { CrearwebComponent } from './web/crearweb/crearweb.component';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from './shared/services/usuario.service';
import { HttpClientModule } from '@angular/common/http';
 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { ToastrModule } from 'ngx-toastr';

import { PlantaComponent } from './planta/planta.component';
import { EstanciaComponent } from './estancia/estancia.component';
import { EdificioComponent } from './edificio/edificio.component';
import { PuntoComponent } from './punto/punto.component';

import { DataTablesModule } from 'angular-datatables';
import { ContenedorComponent } from './contenedor/contenedor.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    SidebarComponent,

    LoginComponent,

    CrearComponent,
    ListadminComponent,

    UsuarioComponent,

    ListwebComponent,
    CrearwebComponent,
    ModificarwebComponent,
    PlantaComponent,
    EstanciaComponent,
    EdificioComponent,
    PuntoComponent,
    ContenedorComponent,
    ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    SweetAlert2Module.forRoot(),
    DataTablesModule,
    
    
  ],
  providers: [
    UsuarioService,
    EdificioService,
    PlantaService,
    EstanciaService,
    PuntoService,
  ],
  exports: [
    NavbarComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
