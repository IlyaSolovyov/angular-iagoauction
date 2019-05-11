import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Painting } from '../../../shared/models/painting';
import { PaintingsService } from '../../../shared/services/paintings.service';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Injectable()
export class PaintingCreationResolver implements Resolve<Painting> {
  constructor(private paintingsService: PaintingsService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Painting> {

    if (route.paramMap.get('paintingId') == null) {
      console.log('No ID specified. Navigating to painting creation page.');
      return null;
    }

    const id = +route.paramMap.get('paintingId');

    return this.paintingsService.getPainting(id).pipe(
      take(1),
      map(painting => {
        if (painting) {
          return painting;
        } else {
          console.log('Painting with specified ID not found!');
          this.router.navigate(['/admin/paintings']);
          return null;
        }
      })
    );
  }
}
