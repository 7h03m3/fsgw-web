import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UsersModule } from '../database/users/users.module';
import { AuthModule } from '../auth/auth.module';
import { SharedModule } from '../shared/shared.module';
import { EventCategoryController } from './event-category/event-category.controller';
import { EventCategoriesModule } from '../database/event-categories/event-categories.module';
import { LocationController } from './location/location.controller';
import { LocationsModule } from '../database/locations/locations.module';
import { EventController } from './event/event.controller';
import { EventsModule } from '../database/events/events.module';

@Module({
  imports: [
    UsersModule,
    EventsModule,
    EventCategoriesModule,
    LocationsModule,
    AuthModule,
    SharedModule,
  ],
  controllers: [
    UserController,
    EventCategoryController,
    LocationController,
    EventController,
  ],
})
export class ControllerModule {}
