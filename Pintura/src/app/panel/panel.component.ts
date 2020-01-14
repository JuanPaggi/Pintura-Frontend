import { Component, OnInit } from '@angular/core';
import { User } from '../providers/model/user.model';
import { Router } from '@angular/router';
import { UsuariosService } from '../services/usuarios/usuarios-service.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {

  user: User;

  panelUsuario: boolean;
  panelTag: boolean;
  panelNoticia: boolean;
  panelGaleria: boolean;

  constructor(
    private router: Router,
    private usuariosSrv: UsuariosService,
  ) {
    this.panelUsuario = false;
    this.panelTag = false;
    this.panelNoticia = false;
    this.panelGaleria = false;
   }
  ngOnInit() {
    this.user = this.usuariosSrv.getUserLoggedIn();
  }

  activarUsuarios(){
    this.panelUsuario = true;
    this.panelTag = false;
    this.panelNoticia = false;
    this.panelGaleria = false;
  }

  activarTags(){
    this.panelUsuario = false;
    this.panelTag = true;
    this.panelNoticia = false;
    this.panelGaleria = false;
  }

  activarNoticias(){
    this.panelUsuario = false;
    this.panelTag = false;
    this.panelNoticia = true;
    this.panelGaleria = false;
  }

  activarGalerias(){
    this.panelUsuario = false;
    this.panelTag = false;
    this.panelNoticia = false;
    this.panelGaleria = true;
  }

}
