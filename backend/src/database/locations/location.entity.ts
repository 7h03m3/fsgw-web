import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { LocationDto } from '../../shared/dtos/location.dto';
import { EventEntity } from '../events/event.entity';

@Entity('locations')
export class LocationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  street: string;

  @Column()
  zip: string;

  @Column()
  location: string;

  @OneToMany((type) => EventEntity, (event) => event.category)
  events: EventEntity[];

  public loadFromDto(dto: LocationDto) {
    this.id = dto.id;
    this.name = dto.name;
    this.street = dto.street;
    this.zip = dto.zip;
    this.location = dto.location;
  }
}
