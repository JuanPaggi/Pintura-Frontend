import { Component, OnInit } from '@angular/core';
import { GaleriasDto } from '../providers/dto/GaleriasDto';
import { GaleriaItem } from '../providers/entities/GaleriaItem.entity';
import { GaleriasService } from '../services/galerias/galerias.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-galerias',
  templateUrl: './galerias.component.html',
  styleUrls: ['./galerias.component.css']
})
export class GaleriasComponent implements OnInit {

  galerias: GaleriaItem[];

  constructor(
    private router: Router,
    private galeriasSrv: GaleriasService,
  ) { }

  ngOnInit() {
    this.getGalerias();
  }

  getGalerias() {
    this.galeriasSrv.getAllGalerias(new GaleriasDto()).subscribe(
      response => {
        this.galerias = response;
      }
    );
  }

  volverHome(){
    this.router.navigateByUrl(`/`);
  }

}
