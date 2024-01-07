import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { RegistrationEntity } from './registration.entity';
import { RegistrationDto } from '../../shared/dtos/registration.dto';
import { DateHelper } from '../../shared/classes/date-helper.classes';

@Injectable()
export class RegistrationsService {
  constructor(
    @InjectRepository(RegistrationEntity)
    private repository: Repository<RegistrationEntity>,
  ) {}

  public async getAllByYear(year: number): Promise<RegistrationEntity[]> {
    const timeStart = DateHelper.getYearStart(year).getTime();
    const timeEnd = DateHelper.getYearEnd(year).getTime();
    return this.repository.find({
      where: {
        date: Between(timeStart, timeEnd),
      },
      order: {
        date: 'ASC',
      },
    });
  }

  public async getById(id: number): Promise<RegistrationEntity> {
    return this.repository.findOne({ where: { id: id } });
  }

  public async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  public async create(dto: RegistrationDto): Promise<RegistrationEntity> {
    const entity = new RegistrationEntity();
    entity.loadFromDto(dto);

    await this.repository.save(entity);

    return entity;
  }

  public async update(dto: RegistrationDto): Promise<any> {
    const entity = new RegistrationEntity();
    entity.loadFromDto(dto);

    return this.repository.update({ id: dto.id }, entity);
  }
}
