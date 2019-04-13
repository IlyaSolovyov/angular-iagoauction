import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Painting } from '../models/painting';
import { HttpClient } from '../../../../node_modules/@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class PaintingsService {

  private resource = 'assets/json/paintings.json';
  pageSize = 4;
  batchSize = 3;

  constructor(protected http: HttpClient) { }

  // return current and next two pages
  getNewsBatch(batchIndex: number): Observable<Painting[][]> {
    return this.http.get<Painting[]>(this.resource).pipe(map(result => {
      const pages: Painting[][] = [];
      const postsOffset = this.pageSize * this.batchSize * batchIndex;

      for (let i = 0; i < this.batchSize; i++) {
        pages[i] = [];
        for (let j = 0; j < this.pageSize; j++) {

          const index = postsOffset + i * this.pageSize + j;
          const painting = result[index];

          if (painting !== undefined) {
            pages[i].push(result[index]);
          } else {
            break;
          }

        }
      }
      return pages;
    }));
  }

  getPainting(id: number): Observable<Painting> {
    return this.http.get<Painting[]>(this.resource).pipe(map(result => {
      return result.find(article => article.id === id);
    }));
  }
}
