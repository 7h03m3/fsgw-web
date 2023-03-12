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
import { FileController } from './file/file.controller';
import { FileCategoryController } from './file-category/file-category.controller';
import { FilesModule } from '../database/files/files.module';
import { FileCategoriesModule } from '../database/file-categories/file-categories.module';

@Module({
  imports: [
    UsersModule,
    EventsModule,
    EventCategoriesModule,
    LocationsModule,
    FilesModule,
    FileCategoriesModule,
    AuthModule,
    SharedModule,
  ],
  controllers: [
    UserController,
    EventCategoryController,
    LocationController,
    EventController,
    FileController,
    FileCategoryController,
  ],
})
export class ControllerModule {}
