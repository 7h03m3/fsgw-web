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
import { RegistrationController } from './registration/registration.controller';
import { ReportCourseRegistrationModule } from '../reports/course-registration/report-course-registration.module';
import { RegistrationsModule } from '../database/registrations/registrations.module';
import { MailModule } from '../mail/mail.module';
import { ContactMessageController } from './contact-message/contact-message.controller';
import { ContactMessageModule } from '../database/contact-message/contact-message.module';
import { NotificationsController } from './notifications/notifications.controller';
import { NotificationModule } from '../database/notification/notification.module';
import { SettingsController } from './settings/settings.controller';
import { SettingsModule } from '../database/settings/settings.module';
import { NewsController } from './news/news.controller';
import { NewsModule } from '../database/news/news.module';

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
    RegistrationsModule,
    ReportCourseRegistrationModule,
    MailModule,
    ContactMessageModule,
    NotificationModule,
    SettingsModule,
    NewsModule,
  ],
  controllers: [
    UserController,
    EventCategoryController,
    LocationController,
    EventController,
    FileController,
    FileCategoryController,
    RegistrationController,
    ContactMessageController,
    NotificationsController,
    SettingsController,
    NewsController,
  ],
})
export class ControllerModule {}
