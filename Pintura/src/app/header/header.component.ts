import { Component, OnInit } from '@angular/core';
import { User } from '../providers/model/user.model';
import { Router } from '@angular/router';
import { UsuariosService } from '../services/usuarios/usuarios-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: User;

  constructor(
    private router: Router,
    private usuariosSrv: UsuariosService,
  ) {}
  ngOnInit() {
    this.user = this.usuariosSrv.getUserLoggedIn();
  }

  irLogin(){
    this.router.navigateByUrl(`/login`);
  }

  clickSalir(){
    this.usuariosSrv.setUserLoggedOut();
    window.location.reload();
  }

  irPanel(){
    this.router.navigateByUrl(`/panel`);
  }

  irHome(){
    this.router.navigateByUrl(`/`);
  }

}
