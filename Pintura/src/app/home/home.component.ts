import { Component, OnInit} from '@angular/core';
import { User } from '../providers/model/user.model';
import { Router } from '@angular/router';
import { UsuariosService } from '../services/usuarios/usuarios-service.service';
import { NoticiasDto } from '../providers/dto/NoticiasDto';
import { NoticiaItem } from '../providers/entities/NoticiaItem.entity';
import { NoticiasService } from '../services/noticias/noticias.service';
import { TagsService } from '../services/tags/tags-service.service';
import { TagsDto } from '../providers/dto/TagsDto';
import { TagItem } from '../providers/entities/TagItem.entity';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  noticias: NoticiaItem[];

  tagsId: number[];
  tags: TagItem[];

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
    this.getTags();
  }

    
  getNoticias() {
    this.noticiasSrv.getAllNoticias(new NoticiasDto()).subscribe(
      response => {
        this.noticias = response;
        console.log(this.noticias);
      }
    );
  }

  getTags() {
    this.tagsSrv.getAllTags(new TagsDto()).subscribe(
      response => {
        this.tags = response;
        this.tags.reverse();
      }
    );
  }

  encontrarTag(tag:number){
    this.tags.forEach(element => {
      console.log(tag);
      if (tag === element.id_tag) {
        console.log(element.etiqueta);
        return element.etiqueta;
      }
    });
  }

}
