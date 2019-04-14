import { Painting } from "./painting";
import { Bid } from "./bid";

export class Lot {
  id: number;
  painting: Painting;
  bids: Bid[];

  constuctor(id: number, painting: Painting, bids: Bid[]) {
    this.id = id;
    this.painting = painting;
    this.bids = bids != null ? bids : [];
  }
}
