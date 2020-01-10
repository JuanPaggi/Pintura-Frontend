import { Component, OnInit } from '@angular/core';
import { User } from '../providers/model/user.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from '../services/usuarios/usuarios-service.service';
import { CrearUsuarioDto } from '../providers/dto/dtoCrear/CrearUsuarioDto';
import { UsuarioItem } from '../providers/entities/UsuarioItem.entity';
import { UsuariosDto } from '../providers/dto/UsuariosDto';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  usuarios: UsuarioItem[];

  id_usuario: number;
  usuario: String;
  clave: String;
  Rclave: String;
  formAddNoticia: FormGroup;

  check: boolean;

  htmlToAdd: String;

  user: User;

  constructor(
    private router: Router,
    private usuariosSrv: UsuariosService,
  ) { }
  ngOnInit() {
    this.formAddNoticia = new FormGroup({
      usuario: new FormControl(Validators.required),
      clave: new FormControl(Validators.required),
      Rclave: new FormControl(Validators.required),
    });
    this.user = this.usuariosSrv.getUserLoggedIn();
    this.getUsuarios();
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
      if (this.formAddNoticia.valid) {
        const usuario = new CrearUsuarioDto();
        usuario.usuario = this.usuario;
        usuario.clave = this.clave;
        this.usuariosSrv.addUsuario(usuario).subscribe(
          response => {
            this.router.navigateByUrl(`/login`);
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
