export class AuctionDto {
  id: number;
  title: string;
  description: string;
  paintingIds: number[]
  startDate: Date;
  endDate: Date;

  constructor(id: number, title: string, description: string, paintingIds: number[], startDate: Date, endDate: Date) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.paintingIds = paintingIds != null ? paintingIds : [];
    this.startDate = startDate;
    this.endDate = endDate;
  }
}
