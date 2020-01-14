import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../services/usuarios/usuarios-service.service';
import { TagsService } from '../services/tags/tags-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../providers/model/user.model';
import { TagsDto } from '../providers/dto/TagsDto';
import { CrearTagDto } from '../providers/dto/dtoCrear/CrearTagDto';
import { TagItem } from '../providers/entities/TagItem.entity';

@Component({
  selector: 'app-panel-tags',
  templateUrl: './panel-tags.component.html',
  styleUrls: ['./panel-tags.component.css']
})
export class PanelTagsComponent implements OnInit {

  formAddTag: FormGroup;

  tags: TagItem[];
  tagsIdNoticia: String;

  etiqueta: String;

  htmlToAdd: String;

  user: User;

  constructor(
    private usuariosSrv: UsuariosService,
    private tagsSrv: TagsService,
  ) { }

  ngOnInit() {
    this.formAddTag = new FormGroup({
      etiqueta: new FormControl(Validators.required),
    });
    this.user = this.usuariosSrv.getUserLoggedIn();
    this.getTags();
  }


  //----------- TAGS ------------

  getTags() {
    this.tagsSrv.getAllTags(new TagsDto()).subscribe(
      response => {
        this.tags = response;
        this.tags.reverse();
      }
    );
  }

  borrarTag(id:number){
    this.tagsSrv.deleteTag(id).subscribe();
    for (let index = 0; index < this.tags.length; index++) {
      if (this.tags[index].id_tag === id) {
        this.tags.splice(index,1);
      }
    }
  }

  agregarTag(){
    if (this.formAddTag.valid) {
      const tag = new CrearTagDto();
      tag.etiqueta = this.etiqueta;
      this.tagsSrv.addTag(tag).subscribe(
        response => {
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
  }

}
