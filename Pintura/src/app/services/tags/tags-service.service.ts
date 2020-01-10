import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TagsDto } from 'src/app/providers/dto/TagsDto';
import { Observable } from 'rxjs';
import { TagItem } from 'src/app/providers/entities/TagItem.entity';
import { environment } from 'src/environments/environment';
import { CrearTagDto } from 'src/app/providers/dto/dtoCrear/CrearTagDto';

@Injectable({
  providedIn: 'root'
})
export class TagsServiceService {

  constructor(private http: HttpClient) { }

  public getAllTags(body: TagsDto): Observable<TagItem[]> {
    let headers = {};
    return this.http.get<TagItem[]>(
        environment.apiEndpoint + '/tags',
        headers
    );
  }

  public addTag(body: CrearTagDto): Observable<Response> {
    return this.http.post<Response>(
        environment.apiEndpoint + '/tags',
        body
    );
  }

  public deleteTag(id_tag: number): Observable<Response> {
    let headers = {};
    return this.http.delete<Response>(
        environment.apiEndpoint + '/tags/' + id_tag,
        headers
    );
  }
}
