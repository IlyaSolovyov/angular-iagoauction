import { Bidder } from "./bidder";

export class Bid {
  id: number;
  value: number;
  dateTime: Date;
  bidder: Bidder;

  constructor(id: number, value: number, dateTime: Date, bidder: Bidder) {
    this.id = id;
    this.value = value;
    this.dateTime = dateTime;
    this.bidder = bidder;
  }
}
