import { Lot } from "./lot";

export class Auction {
  id: number;
  title: string;
  description: string;
  lots: Lot[]
  startDate: Date;
  endDate: Date;

  constructor(id: number, title: string, description: string, lots: Lot[], startDate: Date, endDate: Date) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.lots = lots!=null? lots : [];
    this.startDate = startDate;
    this.endDate = endDate;
  }
}
