import { Component, OnInit} from '@angular/core';
import { User } from '../providers/model/user.model';
import { Router } from '@angular/router';
import { UsuariosService } from '../services/usuarios/usuarios-service.service';
import { NoticiasDto } from '../providers/dto/NoticiasDto';
import { NoticiaItem } from '../providers/entities/NoticiaItem.entity';
import { NoticiasService } from '../services/noticias/noticias.service';
import { TagsService } from '../services/tags/tags-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  noticias: NoticiaItem[];

  tagsId: number[];

  user: User;

  constructor(
    private router: Router,
    private usuariosSrv: UsuariosService,
    private noticiasSrv: NoticiasService,
    private tagsSrv: TagsService,
  ) {}
  
  ngOnInit() {
    this.user = this.usuariosSrv.getUserLoggedIn();
    this.getNoticias();
  }

    
  getNoticias() {
    this.noticiasSrv.getAllNoticias(new NoticiasDto()).subscribe(
      response => {
        this.noticias = response;
        console.log(this.noticias);
      }
    );
  }

}
