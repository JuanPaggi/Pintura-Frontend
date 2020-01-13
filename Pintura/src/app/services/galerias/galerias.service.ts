import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GaleriasDto } from 'src/app/providers/dto/GaleriasDto';
import { Observable } from 'rxjs';
import { GaleriaItem } from 'src/app/providers/entities/GaleriaItem.entity';
import { environment } from 'src/environments/environment';
import { GaleriaByIdDto } from 'src/app/providers/dto/dtoById/GaleriaByIdDto';
import { CrearGaleriaDto } from 'src/app/providers/dto/dtoCrear/CrearGaleriaDto';

@Injectable({
  providedIn: 'root'
})
export class GaleriasService {

  constructor(private http: HttpClient) { }

  public getAllGalerias(body: GaleriasDto): Observable<GaleriaItem[]> {
    let headers = {};
    return this.http.get<GaleriaItem[]>(
        environment.apiEndpoint + '/galerias',
        headers
    );
  }

  public getGaleria(body: GaleriaByIdDto): Observable<GaleriaItem> {
    let headers = {};
    return this.http.get<GaleriaItem>( environment.apiEndpoint + '/galerias/' + body.id_galeria, headers );
  } 

  public addGaleria(body: CrearGaleriaDto): Observable<Response> {
    return this.http.post<Response>(
        environment.apiEndpoint + '/galerias',
        body
    );
  }

  public deleteGaleria(id_noticia: number): Observable<Response> {
    let headers = {};
    return this.http.delete<Response>(
        environment.apiEndpoint + '/galerias/' + id_noticia,
        headers
    );
  }

  public editGaleria(body: CrearGaleriaDto, id_galeria: string): Observable<Response> {
    let headers = {};
    return this.http.put<Response>(
        environment.apiEndpoint + '/galerias/' + id_galeria,
        body,
        headers
    );
  }
}
