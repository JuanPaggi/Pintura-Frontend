import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from '../services/usuarios/usuarios-service.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { User } from '../providers/model/user.model';
import { UsuariosDto } from '../providers/dto/UsuariosDto';
import { UsuarioItem } from '../providers/entities/UsuarioItem.entity';
import { CrearUsuarioDto } from '../providers/dto/dtoCrear/CrearUsuarioDto';

@Component({
  selector: 'app-panel-usuarios',
  templateUrl: './panel-usuarios.component.html',
  styleUrls: ['./panel-usuarios.component.css']
})
export class PanelUsuariosComponent implements OnInit {

  formAddUsuario: FormGroup;
  usuario: String;
  clave: String;
  Rclave: String;
  check: boolean;
  usuarios: UsuarioItem[];

  htmlToAdd: String;

  user: User;

  constructor(    
      private router: Router,
      private usuariosSrv: UsuariosService
    ) { }

  ngOnInit() {
    this.getUsuarios();
    this.user = this.usuariosSrv.getUserLoggedIn();
    this.formAddUsuario = new FormGroup({
      usuario: new FormControl(Validators.required),
      clave: new FormControl(Validators.required),
      Rclave: new FormControl(Validators.required),
      tagsIdJuego: new FormControl(Validators.required),
    });
  }

  getUsuarios() {
    this.usuariosSrv.getUsuarios(new UsuariosDto()).subscribe(
      response => {
        this.usuarios = response;
      }
    );
  }

  agregarUsuario(){
    if (this.Rclave === this.clave && this.check) {
      if (this.formAddUsuario.valid) {
        const usuario = new CrearUsuarioDto();
        usuario.usuario = this.usuario;
        usuario.clave = this.clave;
        this.usuariosSrv.addUsuario(usuario).subscribe(
          response => {
            //this.router.navigateByUrl(`/`);
            location.reload();
          }, err => {
            if(err.status === 400){
              this.htmlToAdd = '<p>Datos Incorrectos</p>';
            }
          }
        )
      } else {
        console.log('Formulario invalido');
      }
    } else {
      this.htmlToAdd = '<p >Datos Incorrectos</p>';
    }
  }

  borrarUsuario(id:number){
    this.usuariosSrv.deleteUsuario(id).subscribe();
    for (let index = 0; index < this.usuarios.length; index++) {
      if (this.usuarios[index].id_usuario === id) {
        this.usuarios.splice(index,1);
      }
    }
  }

}
