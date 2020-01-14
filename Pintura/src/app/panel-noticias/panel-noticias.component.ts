import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UsuariosService } from '../services/usuarios/usuarios-service.service';
import { NoticiasService } from '../services/noticias/noticias.service';
import { NoticiaItem } from '../providers/entities/NoticiaItem.entity';
import { User } from '../providers/model/user.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CrearNoticiaDto } from '../providers/dto/dtoCrear/CrearNoticiaDto';
import { TagItem } from '../providers/entities/TagItem.entity';
import { NoticiasDto } from '../providers/dto/NoticiasDto';

@Component({
  selector: 'app-panel-noticias',
  templateUrl: './panel-noticias.component.html',
  styleUrls: ['./panel-noticias.component.css']
})
export class PanelNoticiasComponent implements OnInit {

  @ViewChild('imageUpload', {static: false}) imagInput: ElementRef;

  noticias: NoticiaItem[];

  tituloNoticia: String;
  cuerpo: String;

  htmlToAdd: String;
  formAddNoticia: FormGroup;

  tags: TagItem[];
  tagsIdNoticia: String;

  user: User;

  imageFileNoticia: number[][];
  imagenesUrlNoticia: String[];
  imagenRelevante: number[];

  constructor(
    private usuariosSrv: UsuariosService,
    private noticiasSrv: NoticiasService,
  ) {
    this.imageFileNoticia = [];
    this.imagenesUrlNoticia = [];
    this.imagenRelevante = [];
   }

  ngOnInit() {
    this.user = this.usuariosSrv.getUserLoggedIn();
    this.formAddNoticia = new FormGroup({
      titulo: new FormControl(Validators.required),
      cuerpo: new FormControl(Validators.required),
    });
    this.getNoticias();
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

}
