import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewsEntity } from './news.entity';
import { NewsDto } from '../../shared/dtos/news.dto';
import { NewsCategory } from '../../shared/enums/news-category.enum';

@Injectable()
export class NewsService {
  constructor(@InjectRepository(NewsEntity) private repository: Repository<NewsEntity>) {}

  public async getAll(): Promise<NewsEntity[]> {
    return this.repository.find({ order: { date: 'DESC' } });
  }

  public async getAllPublic(limit: number): Promise<NewsEntity[]> {
    return this.repository.find({ where: { public: true }, order: { sticky: 'ASC', date: 'DESC' }, take: limit });
  }

  public async getAllPublicByCategory(limit: number, category: NewsCategory): Promise<NewsEntity[]> {
    return this.repository.find({
      where: { public: true, category: category },
      order: { sticky: 'ASC', date: 'DESC' },
      take: limit,
    });
  }

  public async getById(id: number): Promise<NewsEntity> {
    return this.repository.findOne({ where: { id: id } });
  }

  public async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  public async create(dto: NewsDto): Promise<NewsEntity> {
    const entity = new NewsEntity();
    entity.loadFromDto(dto);

    await this.repository.save(entity);

    return entity;
  }

  public async update(dto: NewsDto): Promise<any> {
    const entity = new NewsEntity();
    entity.loadFromDto(dto);

    return this.repository.update({ id: dto.id }, entity);
  }
}
