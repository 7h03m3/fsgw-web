import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationReceiverEntity } from './notification-receiver.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NotificationReceiverEntity])],
  providers: [NotificationService],
  controllers: [],
  exports: [NotificationService],
})
export class NotificationModule {}
