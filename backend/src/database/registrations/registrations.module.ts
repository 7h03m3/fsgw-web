import { Module } from '@nestjs/common';
import { RegistrationsService } from './registrations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegistrationEntity } from './registration.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RegistrationEntity])],
  providers: [RegistrationsService],
  exports: [RegistrationsService],
})
export class RegistrationsModule {}
