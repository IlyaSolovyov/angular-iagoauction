import { Painting } from "src/app/shared/models/painting";

export class PaintingCard {
  painting: Painting;
  //add UI-specific fields here

  constructor(painting: Painting) {
    this.painting = painting;
  }
}
