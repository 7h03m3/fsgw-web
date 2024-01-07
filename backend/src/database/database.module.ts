import { Module } from '@nestjs/common';
import { DefaultValueService } from './default-value/default-value.service';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './users/user.entity';
import { DefaultValueModule } from './default-value/default-value.module';
import { EventsModule } from './events/events.module';
import { LocationsModule } from './locations/locations.module';
import { EventCategoriesModule } from './event-categories/event-categories.module';
import { EventCategoryEntity } from './event-categories/event-category.entity';
import { EventEntity } from './events/event.entity';
import { LocationEntity } from './locations/location.entity';
import { FileCategoriesModule } from './file-categories/file-categories.module';
import { FilesModule } from './files/files.module';
import { FileEntity } from './files/file.entity';
import { FileCategoryEntity } from './file-categories/file-category.entity';
import { RegistrationsModule } from './registrations/registrations.module';
import { RegistrationEntity } from './registrations/registration.entity';
import { ContactMessageEntity } from './contact-message/contact-message.entity';
import { NotificationReceiverEntity } from './notification/notification-receiver.entity';
import { SettingsModule } from './settings/settings.module';
import { SettingEntity } from './settings/settings.entity';

@Module({
  providers: [DefaultValueService],
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.name'),
        entities: [
          UserEntity,
          EventEntity,
          EventCategoryEntity,
          LocationEntity,
          FileEntity,
          FileCategoryEntity,
          RegistrationEntity,
          ContactMessageEntity,
          NotificationReceiverEntity,
          SettingEntity,
        ],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    DefaultValueModule,
    EventsModule,
    LocationsModule,
    EventCategoriesModule,
    FileCategoriesModule,
    FilesModule,
    RegistrationsModule,
    SettingsModule,
  ],
})
export class DatabaseModule {}
