import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EventEntity } from '../events/event.entity';
import { EventCategoryDto } from '../../shared/dtos/event-category.dto';

@Entity('event-categories')
export class EventCategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  abbreviation: string;

  @OneToMany((type) => EventEntity, (event) => event.category)
  events: EventEntity[];

  public loadFromDto(dto: EventCategoryDto) {
    this.id = dto.id;
    this.name = dto.name;
    this.abbreviation = dto.abbreviation;
  }
}
