export class EventModel {
  constructor(
    public type: string,
    public amount: number,
    public categoryId: number,
    public date: string,
    public description: string,
    public id?: number,
    public categoryName?: string
  ) {

  }
}
