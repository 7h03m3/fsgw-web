import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DefaultValueService } from '../default-value/default-value.service';
import { EventCategoryEntity } from './event-category.entity';
import { EventCategoryDto } from '../../shared/dtos/event-category.dto';

@Injectable()
export class EventCategoriesService {
  constructor(
    @InjectRepository(EventCategoryEntity)
    private categoryRepository: Repository<EventCategoryEntity>,
    private defaultValues: DefaultValueService,
  ) {}

  public async onApplicationBootstrap() {
    const count = await this.categoryRepository.count();
    if (count == 0) {
      await this.defaultValues.loadDefaultEventCategories(
        this.categoryRepository,
      );
    }
  }

  public async getAll(): Promise<EventCategoryEntity[]> {
    return this.categoryRepository.find();
  }

  public async getById(id: number): Promise<EventCategoryEntity> {
    return this.categoryRepository.findOne({ where: { id: id } });
  }

  public async getByAbbreviation(
    abbreviation: string,
  ): Promise<EventCategoryEntity> | undefined {
    return this.categoryRepository.findOneBy({ abbreviation: abbreviation });
  }

  public async delete(id: number): Promise<void> {
    await this.categoryRepository.delete(id);
  }

  public async create(dto: EventCategoryDto): Promise<EventCategoryEntity> {
    const entity = new EventCategoryEntity();
    entity.loadFromDto(dto);

    await this.categoryRepository.save(entity);

    return entity;
  }

  public async update(dto: EventCategoryDto): Promise<any> {
    const entity = new EventCategoryEntity();
    entity.loadFromDto(dto);

    return this.categoryRepository.update({ id: dto.id }, entity);
  }
}
