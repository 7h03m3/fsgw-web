import { EventDto } from './event.dto';

export class EventCategoryDto {
  id: number;
  name: string;
  abbreviation: string;
  events: EventDto[];

  constructor() {
    this.id = 0;
    this.name = '';
    this.abbreviation = '';
    this.events = new Array<EventDto>();
  }
}
