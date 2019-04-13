import { Painting } from "src/app/shared/models/painting";

export class PaintingCard {
  painting: Painting;
  tilesWidth: number;
  tilesHeight: number;

  constructor(painting: Painting, tilesWidth: number, tilesHeight: number) {
    this.painting = painting;
    this.tilesWidth = tilesWidth;
    this.tilesHeight = tilesHeight;
  }
}
