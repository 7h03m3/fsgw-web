import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EventCategoryEntity } from '../event-categories/event-category.entity';
import { EventDto } from '../../shared/dtos/event.dto';
import { LocationEntity } from '../locations/location.entity';

@Entity('events')
export class EventEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'bigint' })
  start: number;

  @Column({ type: 'bigint' })
  end: number;

  @ManyToOne((type) => EventCategoryEntity, (category) => category.events)
  @JoinColumn({ name: 'categoryId' })
  category: EventCategoryEntity;

  @Column()
  categoryId: number;

  @ManyToOne((type) => LocationEntity, (location) => location.events)
  @JoinColumn({ name: 'locationId' })
  location: LocationEntity;

  @Column()
  locationId: number;

  @Column({ default: false })
  public: boolean;

  public loadFromDto(dto: EventDto) {
    this.id = dto.id;
    this.title = dto.title;
    this.start = dto.start;
    this.end = dto.end;
    this.public = dto.public;
  }
}
