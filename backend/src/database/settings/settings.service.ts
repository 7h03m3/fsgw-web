import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SettingEntity } from './settings.entity';
import { SettingDto } from '../../shared/dtos/setting.dto';
import { SettingType } from '../../shared/enums/setting-type.enum';
import { DefaultValueService } from '../default-value/default-value.service';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(SettingEntity)
    private repository: Repository<SettingEntity>,
    private defaultValues: DefaultValueService,
  ) {}

  public async onApplicationBootstrap() {
    const count = await this.repository.count();
    if (count == 0) {
      await this.defaultValues.loadDefaultSettings(this.repository);
    }
  }

  public async getAll(): Promise<SettingEntity[]> {
    return this.repository.find();
  }

  public async getByType(type: SettingType): Promise<SettingEntity> {
    return this.repository.findOne({ where: { type: type } });
  }

  public async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  public async create(dto: SettingDto): Promise<SettingEntity> {
    const entity = new SettingEntity();
    entity.loadFromDto(dto);

    await this.repository.save(entity);

    return entity;
  }

  public async update(dto: SettingDto): Promise<any> {
    const entity = new SettingEntity();
    entity.loadFromDto(dto);

    return this.repository.update({ id: dto.id }, entity);
  }
}
