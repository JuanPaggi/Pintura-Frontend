import { Component, OnInit} from '@angular/core';
import { User } from '../providers/model/user.model';
import { Router } from '@angular/router';
import { UsuariosService } from '../services/usuarios/usuarios-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: User;

  constructor(
    private router: Router,
    private usuariosSrv: UsuariosService,
  ) {}
  ngOnInit() {
    this.user = this.usuariosSrv.getUserLoggedIn();
  }


  clickedSalir(){
    this.usuariosSrv.setUserLoggedOut();
    window.location.reload();
  }

  irLogin(){
    this.router.navigateByUrl(`/login`);
  }

  irPanel(){
    this.router.navigateByUrl(`/panel`);
  }

}
