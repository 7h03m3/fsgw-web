import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DefaultValueService } from '../default-value/default-value.service';
import { UserDto } from '../../shared/dtos/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private defaultValues: DefaultValueService,
  ) {}

  public async onApplicationBootstrap() {
    const count = await this.usersRepository.count();
    if (count == 0) {
      await this.defaultValues.loadDefaultUsers(this.usersRepository);
    }
  }

  public getAll(): Promise<UserEntity[]> {
    return this.usersRepository.find({
      select: {
        id: true,
        userName: true,
        firstName: true,
        lastName: true,
        roles: true,
        password: false,
      },
    });
  }

  public getById(id: number): Promise<UserEntity> {
    return this.usersRepository.findOneBy({ id });
  }

  public async getByName(name: string): Promise<UserEntity> | undefined {
    return this.usersRepository.findOneBy({ userName: name });
  }

  public async delete(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  public async create(dto: UserDto): Promise<UserEntity> {
    const entity = new UserEntity();
    entity.loadFromDto(dto);

    await this.usersRepository.save(entity);

    return entity;
  }

  public async update(user: UserDto): Promise<any> {
    await this.usersRepository
      .createQueryBuilder()
      .update(UserEntity)
      .set({
        userName: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
        roles: user.roles,
      })
      .where('id = :id', { id: user.id })
      .execute();
  }

  public async updatePassword(
    userId: number,
    newHashedPassword: string,
  ): Promise<any> {
    return await this.usersRepository
      .createQueryBuilder()
      .update(UserEntity)
      .set({
        password: newHashedPassword,
      })
      .where('id = :id', { id: userId })
      .execute();
  }
}
