import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventCategoryEntity } from '../event-categories/event-category.entity';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { EventEntity } from './event.entity';
import { EventDto } from '../../shared/dtos/event.dto';
import { LocationEntity } from '../locations/location.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(EventEntity)
    private eventRepository: Repository<EventEntity>,
  ) {}

  public getAll(): Promise<EventEntity[]> {
    return this.eventRepository.find({
      relations: { category: true, location: true },
    });
  }

  public getAllPublicByTime(time: number): Promise<EventEntity[]> {
    return this.eventRepository.find({
      order: { start: 'ASC' },
      where: { public: true, start: MoreThanOrEqual(time) },
      relations: { category: true, location: true },
    });
  }

  public getAllPublicByTimeAndCategory(
    time: number,
    categoryAbbreviation: string,
  ): Promise<EventEntity[]> {
    return this.eventRepository.find({
      order: { start: 'ASC' },
      where: {
        public: true,
        category: {
          abbreviation: categoryAbbreviation,
        },

        start: MoreThanOrEqual(time),
      },
      relations: { category: true, location: true },
    });
  }

  public async delete(id: number): Promise<void> {
    await this.eventRepository.delete(id);
  }

  public async create(
    dto: EventDto,
    category: EventCategoryEntity,
    location: LocationEntity,
  ): Promise<EventEntity> {
    const entity = new EventEntity();
    entity.loadFromDto(dto);

    entity.category = category;
    entity.location = location;

    await this.eventRepository.save(entity);

    return entity;
  }

  public async update(
    dto: EventDto,
    category: EventCategoryEntity,
    location: LocationEntity,
  ): Promise<any> {
    const entity = new EventEntity();
    entity.loadFromDto(dto);

    entity.category = category;
    entity.location = location;

    return this.eventRepository.update({ id: dto.id }, entity);
  }
}
