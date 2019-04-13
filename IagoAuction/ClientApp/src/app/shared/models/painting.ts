export class Painting {
  id: number;
  title: string;
  description: string;
  author: string;
  suggestedStartPrice: number;
  imageUrl: string;

  constructor(id:number,title:string, description:string, author:string, suggestedStartPrice:number, imageUrl:string) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.author = author;
    this.suggestedStartPrice = suggestedStartPrice;
    this.imageUrl = imageUrl;
  }
}
