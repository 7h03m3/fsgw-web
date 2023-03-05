import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserEntity } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DefaultValueModule } from '../default-value/default-value.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), DefaultValueModule],
  providers: [UsersService],
  controllers: [],
  exports: [UsersService],
})
export class UsersModule {}
