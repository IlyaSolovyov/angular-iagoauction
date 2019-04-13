import { Component, Input } from '@angular/core';
import { PaintingCard } from '../../models/painting-card';

@Component({
    selector: 'paintings-painting-card',
    templateUrl: './painting-card.component.html',
    styleUrls: ['./painting-card.component.scss']
})

export class PaintingCardComponent {

  @Input()
  paintingCard: PaintingCard;

    constructor() {

    }
}
