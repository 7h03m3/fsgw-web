export class LocationDto {
  id: number;
  name: string;
  street: string;
  zip: string;
  location: string;

  constructor() {
    this.id = 0;
    this.name = '';
    this.street = '';
    this.zip = '';
    this.location = '';
  }
}
