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
  ],
})
export class DatabaseModule {}
