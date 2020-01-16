import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { PanelComponent } from './panel/panel.component';
import { HeaderComponent } from './header/header.component';
import { PanelUsuariosComponent } from './panel-usuarios/panel-usuarios.component';
import { PanelTagsComponent } from './panel-tags/panel-tags.component';
import { PanelGaleriasComponent } from './panel-galerias/panel-galerias.component';
import { PanelNoticiasComponent } from './panel-noticias/panel-noticias.component';
import { GaleriasComponent } from './galerias/galerias.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    PanelComponent,
    HeaderComponent,
    PanelUsuariosComponent,
    PanelTagsComponent,
    PanelGaleriasComponent,
    PanelNoticiasComponent,
    GaleriasComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
