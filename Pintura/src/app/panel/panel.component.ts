import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UsuarioItem } from '../providers/entities/UsuarioItem.entity';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TagItem } from '../providers/entities/TagItem.entity';
import { NoticiaItem } from '../providers/entities/NoticiaItem.entity';
import { GaleriaItem } from '../providers/entities/GaleriaItem.entity';
import { User } from '../providers/model/user.model';
import { Router } from '@angular/router';
import { UsuariosService } from '../services/usuarios/usuarios-service.service';
import { TagsService } from '../services/tags/tags-service.service';
import { NoticiasService } from '../services/noticias/noticias.service';
import { GaleriasService } from '../services/galerias/galerias.service';
import { UsuariosDto } from '../providers/dto/UsuariosDto';
import { CrearUsuarioDto } from '../providers/dto/dtoCrear/CrearUsuarioDto';
import { CrearNoticiaDto } from '../providers/dto/dtoCrear/CrearNoticiaDto';
import { NoticiasDto } from '../providers/dto/NoticiasDto';
import { TagsDto } from '../providers/dto/TagsDto';
import { CrearTagDto } from '../providers/dto/dtoCrear/CrearTagDto';
import { GaleriasDto } from '../providers/dto/GaleriasDto';
import { CrearGaleriaDto } from '../providers/dto/dtoCrear/CrearGaleriaDto';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {

  @ViewChild('imageUpload', {static: false}) imagInput: ElementRef;

  usuarios: UsuarioItem[];

  id_usuario: number;
  usuario: String;
  clave: String;
  Rclave: String;
  formAddUsuario: FormGroup;
  formAddNoticia: FormGroup;
  formAddTag: FormGroup;
  formAddGaleria: FormGroup;

  tituloNoticia: String;
  cuerpo: String;

  etiqueta: String;

  Usuario: UsuarioItem;

  tituloGaleria: String;

  tags: TagItem[];
  tagsIdNoticia: String;

  noticias: NoticiaItem[];

  galerias: GaleriaItem[];

  check: boolean;

  htmlToAdd: String;

  user: User;

  imageFileNoticia: number[][];
  imagenesUrlNoticia: String[];
  imagenRelevante: number[];

  imageFileGaleria: number[][];
  imagenesUrlGaleria: String[];

  constructor(
    private router: Router,
    private usuariosSrv: UsuariosService,
    private tagsSrv: TagsService,
    private noticiasSrv: NoticiasService,
    private galeriasSrv: GaleriasService,
  ) {
    this.imageFileNoticia = [];
    this.imagenesUrlNoticia = [];
    this.imagenRelevante = [];
    this.imageFileGaleria = [];
    this.imagenesUrlGaleria = [];
   }
  ngOnInit() {
    this.formAddUsuario = new FormGroup({
      usuario: new FormControl(Validators.required),
      clave: new FormControl(Validators.required),
      Rclave: new FormControl(Validators.required),
      tagsIdJuego: new FormControl(Validators.required),
    });
    this.formAddNoticia = new FormGroup({
      titulo: new FormControl(Validators.required),
      cuerpo: new FormControl(Validators.required),
    });
    this.formAddTag = new FormGroup({
      etiqueta: new FormControl(Validators.required),
    });
    this.formAddGaleria = new FormGroup({
      titulo: new FormControl(Validators.required),
    });
    this.user = this.usuariosSrv.getUserLoggedIn();
    this.getUsuarios();
    this.getTags();
    this.getNoticias();
    this.getGalerias();
  }

    //----------- USUARIOS ------------

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

  //----------- NOTICIAS ------------

  openImageNoticia() {
    this.imagInput.nativeElement.click();
    this.imagInput.nativeElement.onchange = () => {
      const fr = new FileReader();
      let firstExecution = true;
      fr.onload = () => {
        if(firstExecution) {
          const arrayBuffer = fr.result as ArrayBuffer;
          this.imageFileNoticia.push(Array.from(new Uint8Array(arrayBuffer)));
          firstExecution = false;
          console.log('Imagen cargada');
          fr.readAsDataURL(this.imagInput.nativeElement.files[0]);
        } else {
          this.imagenesUrlNoticia.push(fr.result as string);
          console.log(this.imagenesUrlNoticia);
        }
      
      };
      fr.readAsArrayBuffer(this.imagInput.nativeElement.files[0]);
    };
  }

  agregarNoticia(){
    if (this.formAddNoticia.valid) {
      const noticia = new CrearNoticiaDto();
      noticia.cuerpo = this.cuerpo;
      noticia.titulo = this.tituloNoticia;
      noticia.id_usuario = 9;
      if (this.tagsIdNoticia != null) {
        noticia.tags = this.tagsIdNoticia.split(',').map(Number);
      }else{
        noticia.tags= [];
      }
      noticia.nombreImagen = "image";
      if (this.imageFileNoticia != null) {
        noticia.archivoImagen = this.imageFileNoticia;
        noticia.archivoImagen_relevante = this.imageFileNoticia[0];
      }else{
        noticia.archivoImagen = [];
        noticia.archivoImagen_relevante = [];
      }
      this.noticiasSrv.addNoticia(noticia).subscribe(
        response=>{
            //this.router.navigateByUrl(`/`);
            location.reload();
        }
      );
    } else {
      console.log('Formulario invalido');
    }
  }

  deleteImage(idx: number) {
    this.imageFileNoticia.splice(idx,1);
    this.imagenesUrlNoticia.splice(idx,1);
  }

  getNoticias() {
    this.noticiasSrv.getAllNoticias(new NoticiasDto()).subscribe(
      response => {
        this.noticias = response;
      }
    );
  }

  borrarNoticia(id:number){
    this.noticiasSrv.deleteNoticia(id).subscribe();
    for (let index = 0; index < this.noticias.length; index++) {
      if (this.noticias[index].id_noticia === id) {
        this.noticias.splice(index,1);
      }
    }
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
  }

    //----------- GALERIAS ------------

    getGalerias() {
      this.galeriasSrv.getAllGalerias(new GaleriasDto()).subscribe(
        response => {
          this.galerias = response;
        }
      );
    }

    borrarGaleria(id:number){
      this.galeriasSrv.deleteGaleria(id).subscribe();
      for (let index = 0; index < this.galerias.length; index++) {
        if (this.galerias[index].id_galeria === id) {
          this.galerias.splice(index,1);
        }
      }
    }

    agregarGaleria(){
      if (this.formAddTag.valid) {
        const galeria = new CrearGaleriaDto();
        galeria.titulo = this.tituloGaleria;
        galeria.id_usuario = 9;
        if (this.imageFileGaleria != null) {
          galeria.archivoImagen = this.imageFileGaleria;
        }else{
          galeria.archivoImagen = [];
        }
        this.galeriasSrv.addGaleria(galeria).subscribe(
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
    }

    openImageGaleria() {
      this.imagInput.nativeElement.click();
      this.imagInput.nativeElement.onchange = () => {
        const fr = new FileReader();
        let firstExecution = true;
        fr.onload = () => {
          if(firstExecution) {
            const arrayBuffer = fr.result as ArrayBuffer;
            this.imageFileGaleria.push(Array.from(new Uint8Array(arrayBuffer)));
            firstExecution = false;
            console.log('Imagen cargada');
            fr.readAsDataURL(this.imagInput.nativeElement.files[0]);
          } else {
            this.imagenesUrlGaleria.push(fr.result as string);
            console.log(this.imagenesUrlGaleria);
          }
        
        };
        fr.readAsArrayBuffer(this.imagInput.nativeElement.files[0]);
      };
    }


  deleteImageGaleria(idx: number) {
    this.imageFileGaleria.splice(idx,1);
    this.imagenesUrlGaleria.splice(idx,1);
  }

}