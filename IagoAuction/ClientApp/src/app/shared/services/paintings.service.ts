import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Painting } from '../models/painting';
import { HttpClient, HttpHeaders } from '../../../../node_modules/@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class PaintingsService {

  private resource = 'assets/json/paintings.json';
  pageSize = 4;
  batchSize = 3;

  constructor(protected http: HttpClient) { }

  // return current and next two pages
  getPaintingsBatch(batchIndex: number): Observable<Painting[][]> {
    return this.http.get<Painting[]>('/api/paintings/pages/' + (batchIndex + 1)).pipe(map((paintings: Painting[]) => {
      console.log(paintings);
      let paintingsBatch: Painting[][] = [];
      paintingsBatch[0] = paintings.slice(0, 4);
      paintingsBatch[1] = paintings.slice(4, 8);
      paintingsBatch[2] = paintings.slice(8, 12);
      return paintingsBatch;
    }));
   

  }

  getAvailablePaintings(): Observable<Painting[]> {
    return this.http.get<Painting[]>('/api/paintings/');
  }

  getPainting(id: number): Observable<Painting> {
    return this.http.get<Painting>('/api/paintings/' + id.toString());
  }

  addPainting(painting: Painting) {
    const formData = new FormData();
    formData.append('Title', painting.title);
    formData.append('Description', painting.description);
    formData.append('Author', painting.author);
    formData.append('SuggestedStartPrice', painting.suggestedStartPrice.toString());
    formData.append('ImageUrl', painting.imageUrl);
    const headers = new HttpHeaders({ 'enctype': 'multipart/form-data' });

    return this.http.post('/api/paintings', formData, { headers: headers });
  }

  updatePainting(painting: Painting, paintingId: number) {
    const formData = new FormData();
    formData.append('Title', painting.title);
    formData.append('Description', painting.description);
    formData.append('Author', painting.author);
    formData.append('SuggestedStartPrice', painting.suggestedStartPrice.toString());
    formData.append('ImageUrl', painting.imageUrl);

    const headers = new HttpHeaders({ 'enctype': 'multipart/form-data' });


    return this.http.put('/api/paintings/' + paintingId, formData, { headers: headers });
  }
}
