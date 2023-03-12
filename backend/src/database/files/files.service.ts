import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { And, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { FileEntity } from './file.entity';
import { FileCategoryEntity } from '../file-categories/file-category.entity';
import { FileDto } from '../../shared/dtos/file.dto';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(FileEntity)
    private fileRepository: Repository<FileEntity>,
  ) {}

  public getAll(): Promise<FileEntity[]> {
    return this.fileRepository.find({
      relations: { category: true },
      order: { date: 'DESC' },
    });
  }

  public getById(id: number): Promise<FileEntity> {
    return this.fileRepository.findOne({
      relations: { category: true },
      where: {
        id: id,
      },
    });
  }

  public getByCategory(categoryAbbreviation: string): Promise<FileEntity[]> {
    return this.fileRepository.find({
      relations: { category: true },
      where: {
        category: {
          abbreviation: categoryAbbreviation,
        },
      },
      order: {
        title: 'ASC',
      },
    });
  }

  public getByCategoryAndTimeRange(
    categoryAbbreviation: string,
    start: number,
    end: number,
  ): Promise<FileEntity[]> {
    return this.fileRepository.find({
      relations: { category: true },
      where: {
        date: And(MoreThanOrEqual(start), LessThanOrEqual(end)),
        category: {
          abbreviation: categoryAbbreviation,
        },
      },
      order: {
        title: 'ASC',
      },
    });
  }

  public getByFilename(filename: string): Promise<FileEntity> {
    return this.fileRepository.findOne({
      relations: { category: true },
      where: {
        filename: filename,
      },
    });
  }

  public async delete(id: number): Promise<void> {
    await this.fileRepository.delete(id);
  }

  public async create(
    dto: FileDto,
    category: FileCategoryEntity,
  ): Promise<FileEntity> {
    const entity = new FileEntity();
    entity.loadFromDto(dto);

    entity.category = category;

    await this.fileRepository.save(entity);

    return entity;
  }

  public async update(
    dto: FileDto,
    category: FileCategoryEntity,
  ): Promise<any> {
    const entity = new FileEntity();
    entity.loadFromDto(dto);

    entity.category = category;

    return this.fileRepository.update({ id: dto.id }, entity);
  }
}
