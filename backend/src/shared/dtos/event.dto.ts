import { EventCategoryDto } from './event-category.dto';
import { LocationDto } from './location.dto';

export class EventDto {
  id: number;
  title: string;
  start: number;
  end: number;
  category: EventCategoryDto;
  categoryId: number;
  location: LocationDto;
  locationId: number;
  public: boolean;

  constructor() {
    this.id = 0;
    this.title = '';
    this.start = Date.now();
    this.end = Date.now();
    this.category = new EventCategoryDto();
    this.categoryId = 0;
    this.location = new LocationDto();
    this.locationId = 0;
    this.public = false;
  }
}
