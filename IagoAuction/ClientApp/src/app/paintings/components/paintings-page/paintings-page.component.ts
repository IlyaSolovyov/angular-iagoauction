import { Component } from '@angular/core';
import { PaintingCard } from '../../models/painting-card';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, empty } from 'rxjs';
import { map, takeWhile, concat } from 'rxjs/operators';
import { PaintingsService } from 'src/app/shared/services/paintings.service';

@Component({
    selector: 'paintings-paintings-page',
    templateUrl: './paintings-page.component.html',
    styleUrls: ['./paintings-page.component.scss']
})

export class PaintingsPageComponent {

  paintingsCollection: PaintingCard[][];
  currentBatchIndex: number;
  maxBatchIndex: number;
  batchSize: number;

  currentPageNumbers: number[];
  selectedPageNumber: number;
  maxPageNumber: number;
  pageSize: number;

  upcomingBatch: PaintingCard[][];
  upcomingBatchNumber: number;
  upcomingBatchExists: boolean;

  constructor(private paintingsService: PaintingsService, private route: ActivatedRoute, private router: Router) {
    this.pageSize = paintingsService.pageSize;
    this.batchSize = paintingsService.batchSize;

    this.currentBatchIndex = -1;
    this.maxBatchIndex = -1;

    this.selectedPageNumber = 0;
    this.maxPageNumber = 0;
    this.paintingsCollection = [];
    this.upcomingBatchExists = false;
  }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      // retrieve page id
      const pageId = +params.get('pageId');
      const requestedPageNumber = (pageId <= 0) ? 1 : pageId;

      // determine whether a batch different from current was requested
      if (this.isOutOfBatch(requestedPageNumber, this.currentBatchIndex, this.batchSize)) {
        const requestedBatchIndex = this.determineBatchIndex(requestedPageNumber, this.batchSize);

        // determine whether requested batch has been loaded previously
        if (requestedBatchIndex <= this.maxBatchIndex) {
          this.currentBatchIndex = requestedBatchIndex;
          this.selectedPageNumber = requestedPageNumber;

          this.currentPageNumbers =
            this.determinePageNumbers(this.currentBatchIndex, this.paintingsCollection, this.batchSize);

          this.upcomingBatchExists = (this.currentBatchIndex === this.maxBatchIndex)
            ? (this.currentBatchIndex < this.upcomingBatchNumber)
            : true;


        } else {
          // get observables of all the unfetched batches
          const observables: Observable<PaintingCard[][]>[] = [];
          for (let i = this.maxBatchIndex + 1; i <= requestedBatchIndex; i++) {
            observables.push(this.getNewsBatchObservable(i));
          }

          // observables from an array will be called one-by-one and cancelled if previous HTTP call returned an empty array
          const combinedObservable: Observable<PaintingCard[][]> = empty().pipe(concat(...observables),
            takeWhile(batch => {
              for (let i = 0; i < batch.length; i++) {
                if (batch[i].length > 0) {
                  return true;
                }
              }
              return false;
            }));

          // call subscribe on prepared array of observables
          combinedObservable.subscribe(batch => {
            for (let i = 0; i < batch.length; i++) {
              if (batch[i].length > 0) {
                this.paintingsCollection.push(batch[i]);
              }
            }

            // update current and maximum batch indexes and update page list accordingly
            this.currentBatchIndex = this.maxBatchIndex + 1;
            this.maxBatchIndex = this.currentBatchIndex;

            this.currentPageNumbers =
              this.determinePageNumbers(this.currentBatchIndex, this.paintingsCollection, this.batchSize);
            this.selectedPageNumber = requestedPageNumber <= this.paintingsCollection.length
              ? requestedPageNumber
              : this.paintingsCollection.length;

            // determine whether additional batches exist to disable related UI-controls if needed
            this.getNewsBatchObservable(this.maxBatchIndex + 1).subscribe(result => {
              this.upcomingBatch = result;
              this.upcomingBatchExists = this.determineIfUpcomingBatchExists(this.upcomingBatch);
              this.upcomingBatchNumber = this.upcomingBatchExists ? this.maxBatchIndex + 1 : -1;
              this.maxPageNumber = this.upcomingBatchExists
                ? this.currentPageNumbers[this.batchSize - 1] + 1
                : this.currentPageNumbers[this.currentPageNumbers.length - 1];
            });
          });
        }
      } else {
        this.selectedPageNumber = requestedPageNumber;
      }
    });
  }

  changePage(currentPageNumber: number, direction: number) {
    this.router.navigate([`/paintings/${currentPageNumber + direction}`]);
  }

  changeBatch(currentBatchNumber: number, direction: number) {
    this.router.navigate([`/paintings/${(currentBatchNumber + direction) * this.batchSize + 1}`]);
  }

  determineIfUpcomingBatchExists(upcomingBatch: PaintingCard[][]) {
    if (upcomingBatch == null) {
      return false;
    }
    if (upcomingBatch[0].length === 0) {
      return false;
    }
    return true;
  }

  private getNewsBatchObservable(batchIndex: number): Observable<PaintingCard[][]> {
    return this.paintingsService.getNewsBatch(batchIndex).pipe(map(result => {
      const pageCards: PaintingCard[][] = [];

      for (let i = 0; i < result.length; i++) {
        pageCards[i] = [];

        for (let j = 0; j < result[i].length; j++) {
          pageCards[i].push(new PaintingCard(result[i][j]));
        }
      }
      return pageCards;
    }));
  }

  private isOutOfBatch(pageNumber: number, batchIndex: number, batchSize: number): boolean {
    return (Math.ceil(pageNumber / batchSize) - 1 !== batchIndex);
  }

  private determineBatchIndex(pageNumber: number, batchSize: number): number {
    return Math.ceil(pageNumber / batchSize) - 1;
  }

  private determinePageNumbers(batchIndex: number, paintingsCollection: PaintingCard[][], batchSize: number): number[] {
    const numbers: number[] = [];

    for (let i = 0; i < batchSize; i++) {
      const index = batchIndex * batchSize + i;

      if (paintingsCollection[index]) {

        if (paintingsCollection[index].length > 0) {
          numbers.push(index + 1);
        }
      }
    }
    return numbers;
  }

}
