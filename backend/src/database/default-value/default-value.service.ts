import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from '../users/user.entity';
import { UserRole } from '../../shared/enums/user-role.enum';
import { EventCategoryEntity } from '../event-categories/event-category.entity';
import { LocationEntity } from '../locations/location.entity';

@Injectable()
export class DefaultValueService {
  public async loadDefaultUsers(repository: Repository<UserEntity>) {
    const entity = new UserEntity();
    entity.userName = 'admin';
    entity.firstName = '';
    entity.lastName = '';
    entity.password =
      '$2b$10$2mIynFxnRczL2vBE9msevOnz4XEcRBSnaBfrcy4zsO7edy47Ve/7K';
    entity.roles = [UserRole.Admin];
    await repository.save(entity);
  }

  public async loadDefaultLocations(repository: Repository<LocationEntity>) {
    await this.addLocation(
      'Schiessanlage Ohrbühl',
      'Seenerstrasse 139',
      '8404',
      'Winterthur',
      repository,
    );
  }

  public async loadDefaultEventCategories(
    repository: Repository<EventCategoryEntity>,
  ) {
    await this.addEventCategory('Allgemein', 'Allg', repository);
    await this.addEventCategory('Bundesübung', 'BU', repository);
    await this.addEventCategory('Feldschiessen', 'FS', repository);
    await this.addEventCategory('Freie Übungen', 'FU', repository);
    await this.addEventCategory('Jungschützenkurs', 'JS', repository);
    await this.addEventCategory('Jahresmeisterschaft', 'JM', repository);
  }

  private async addEventCategory(
    name: string,
    abbreviation: string,
    repository: Repository<EventCategoryEntity>,
  ) {
    const entity = new EventCategoryEntity();
    entity.name = name;
    entity.abbreviation = abbreviation;
    await repository.save(entity);
  }

  private async addLocation(
    name: string,
    street: string,
    zip: string,
    location: string,
    repository: Repository<LocationEntity>,
  ) {
    const entity = new LocationEntity();
    entity.name = name;
    entity.street = street;
    entity.zip = zip;
    entity.location = location;
    await repository.save(entity);
  }
}
