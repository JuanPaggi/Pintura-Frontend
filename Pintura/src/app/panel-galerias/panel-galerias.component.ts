import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UsuariosService } from '../services/usuarios/usuarios-service.service';
import { GaleriasService } from '../services/galerias/galerias.service';
import { GaleriaItem } from '../providers/entities/GaleriaItem.entity';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { User } from '../providers/model/user.model';
import { GaleriasDto } from '../providers/dto/GaleriasDto';
import { CrearGaleriaDto } from '../providers/dto/dtoCrear/CrearGaleriaDto';

@Component({
  selector: 'app-panel-galerias',
  templateUrl: './panel-galerias.component.html',
  styleUrls: ['./panel-galerias.component.css']
})
export class PanelGaleriasComponent implements OnInit {

  @ViewChild('imageUpload', {static: false}) imagInput: ElementRef;

  tituloGaleria: String;
  galerias: GaleriaItem[];

  formAddGaleria: FormGroup;

  htmlToAdd: String;

  imageFileGaleria: number[][];
  imagenesUrlGaleria: String[];

  user: User;

  constructor(
    private usuariosSrv: UsuariosService,
    private galeriasSrv: GaleriasService,
  ) { 
    this.imageFileGaleria = [];
    this.imagenesUrlGaleria = [];
  }

  ngOnInit() {
    this.getGalerias();
    this.formAddGaleria = new FormGroup({
      titulo: new FormControl(Validators.required),
    });
    this.user = this.usuariosSrv.getUserLoggedIn();
  }

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
    if (this.formAddGaleria.valid) {
      const galeria = new CrearGaleriaDto();
      galeria.titulo = this.tituloGaleria;
      galeria.id_usuario = this.user.id_usuario;
      if (this.imageFileGaleria != null) {
        galeria.archivoImagen = this.imageFileGaleria;
      }else{
        galeria.archivoImagen = [];
      }
      this.galeriasSrv.addGaleria(galeria).subscribe(
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
