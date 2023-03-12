import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileCategoryEntity } from './file-category.entity';
import { FileCategoryDto } from '../../shared/dtos/file-category.dto';
import { DefaultValueService } from '../default-value/default-value.service';

@Injectable()
export class FileCategoriesService {
  constructor(
    @InjectRepository(FileCategoryEntity)
    private categoryRepository: Repository<FileCategoryEntity>,
    private defaultValues: DefaultValueService,
  ) {}

  public async onApplicationBootstrap() {
    const count = await this.categoryRepository.count();
    if (count == 0) {
      await this.defaultValues.loadDefaultFileCategories(
        this.categoryRepository,
      );
    }
  }

  public async getAll(): Promise<FileCategoryEntity[]> {
    return this.categoryRepository.find();
  }

  public async getById(id: number): Promise<FileCategoryEntity> {
    return this.categoryRepository.findOne({ where: { id: id } });
  }

  public async getByAbbreviation(
    abbreviation: string,
  ): Promise<FileCategoryEntity> | undefined {
    return this.categoryRepository.findOneBy({ abbreviation: abbreviation });
  }

  public async delete(id: number): Promise<void> {
    await this.categoryRepository.delete(id);
  }

  public async create(dto: FileCategoryDto): Promise<FileCategoryEntity> {
    const entity = new FileCategoryEntity();
    entity.loadFromDto(dto);

    await this.categoryRepository.save(entity);

    return entity;
  }

  public async update(dto: FileCategoryDto): Promise<any> {
    const entity = new FileCategoryEntity();
    entity.loadFromDto(dto);

    return this.categoryRepository.update({ id: dto.id }, entity);
  }
}
