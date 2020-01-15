import { Component, OnInit } from '@angular/core';
import { GaleriasDto } from '../providers/dto/GaleriasDto';
import { GaleriaItem } from '../providers/entities/GaleriaItem.entity';
import { GaleriasService } from '../services/galerias/galerias.service';

@Component({
  selector: 'app-galerias',
  templateUrl: './galerias.component.html',
  styleUrls: ['./galerias.component.css']
})
export class GaleriasComponent implements OnInit {

  galerias: GaleriaItem[];

  constructor(
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

}
