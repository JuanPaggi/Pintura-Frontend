import { Component, OnInit } from '@angular/core';
import { User } from '../providers/model/user.model';
import { Router } from '@angular/router';
import { UsuariosService } from '../services/usuarios/usuarios-service.service';
import { LoginDto } from '../providers/dto/dtoLogin/LoginDto';
import { UsuarioByIdDto } from '../providers/dto/dtoById/UsuarioByIdDto';
import { UsuarioItem } from '../providers/entities/UsuarioItem.entity';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  id_usuario: number;
  usuario: String;
  clave: String;

  Usuario: UsuarioItem;

  htmlToAdd: String;
  user: User;

  constructor(
    private router: Router,
    private usuariosSrv: UsuariosService,
  ) { }

  ngOnInit() {
    this.user = this.usuariosSrv.getUserLoggedIn();
  }

  //---------Login---------

  ComprobarUsuario(){
    let login = new LoginDto();
    login.usuario = this.usuario;
    login.clave = this.clave;
    this.usuariosSrv.verificarUsuario(login).subscribe(
      response => {
        if(response != 0){
          this.id_usuario = response;
          this.usuariosSrv.getUsuario( new UsuarioByIdDto(this.id_usuario)).subscribe(
            response=>{
              this.Usuario = response;
              this.logIn(this.usuario, this.id_usuario, event);
              window.location.href = "/";
            }
          );
        } else{
          this.htmlToAdd = '<p>Datos Incorrectos<p>';
        }
      }
    )
  }

  logIn(username: String, id_usuario: number, event: Event) {
    event.preventDefault(); 
    let u: User = {username, id_usuario};  
    this.usuariosSrv.setUserLoggedIn(u);
  }

}
