import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Auction } from 'src/app/shared/models/auction';
import { AuctionService } from 'src/app/shared/services/auction.service';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { PaintingsService } from 'src/app/shared/services/paintings.service';
import { Painting } from 'src/app/shared/models/painting';

@Injectable()
export class PaintingDetailsPaintingResolver implements Resolve<Painting>  {
  constructor(private paintingsService: PaintingsService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Painting> {
    const paintingId = +route.paramMap.get('paintingId');

    return this.paintingsService.getPainting(paintingId).pipe(
      take(1),
      map(painting => {
        if (painting) {
          return painting;
        } else {
          console.log('Painting with specified ID not found!');
          this.router.navigate(['/paintings']);
          return null;
        }
      })
    );
  }
}
