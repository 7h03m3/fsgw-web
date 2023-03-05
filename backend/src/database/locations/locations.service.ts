import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DefaultValueService } from '../default-value/default-value.service';
import { LocationEntity } from './location.entity';
import { LocationDto } from '../../shared/dtos/location.dto';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(LocationEntity)
    private locationRepository: Repository<LocationEntity>,
    private defaultValues: DefaultValueService,
  ) {}

  public async onApplicationBootstrap() {
    const count = await this.locationRepository.count();
    if (count == 0) {
      await this.defaultValues.loadDefaultLocations(this.locationRepository);
    }
  }

  public async getAll(): Promise<LocationEntity[]> {
    return this.locationRepository.find();
  }

  public async getById(id: number): Promise<LocationEntity> {
    return this.locationRepository.findOne({ where: { id: id } });
  }

  public async delete(id: number): Promise<void> {
    await this.locationRepository.delete(id);
  }

  public async create(dto: LocationDto): Promise<LocationEntity> {
    const entity = new LocationEntity();
    entity.loadFromDto(dto);

    await this.locationRepository.save(entity);

    return entity;
  }

  public async update(dto: LocationDto): Promise<any> {
    const entity = new LocationEntity();
    entity.loadFromDto(dto);

    return this.locationRepository.update({ id: dto.id }, entity);
  }
}
