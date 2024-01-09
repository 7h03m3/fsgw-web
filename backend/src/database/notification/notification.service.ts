import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { NotificationReceiverDto } from '../../shared/dtos/notification-receiver.dto';
import { NotificationReceiverEntity } from './notification-receiver.entity';
import { NotificationSource } from '../../shared/enums/notification-source.enum';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(NotificationReceiverEntity)
    private receiverRepository: Repository<NotificationReceiverEntity>,
  ) {}

  public getAll(): Promise<NotificationReceiverEntity[]> {
    return this.receiverRepository.find();
  }

  public async getAllBySource(source: NotificationSource): Promise<NotificationReceiverEntity[]> {
    const list = await this.getAll();

    return list.filter((entry) => {
      return entry.triggers.includes(source);
    });
  }

  public async create(dto: NotificationReceiverDto): Promise<NotificationReceiverEntity> {
    const entity = new NotificationReceiverEntity();
    dto.id = 0;
    entity.loadFromDto(dto);

    await this.receiverRepository.save(entity);

    return entity;
  }

  public async update(dto: NotificationReceiverDto): Promise<any> {
    const entity = new NotificationReceiverEntity();
    entity.loadFromDto(dto);

    return this.receiverRepository.update({ id: dto.id }, entity);
  }

  public async delete(id: number): Promise<void> {
    await this.receiverRepository.delete(id);
  }
}
