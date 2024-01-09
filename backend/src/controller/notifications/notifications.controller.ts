import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UserRoles } from '../../shared/decorators/user-roles.decorator';
import { UserRole } from '../../shared/enums/user-role.enum';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth/jwt-auth.guard';
import { RoleAuthGuard } from '../../auth/guards/role-auth/role-auth.guard';
import { NotificationService } from '../../database/notification/notification.service';
import { NotificationReceiverEntity } from '../../database/notification/notification-receiver.entity';
import { NotificationReceiverDto } from '../../shared/dtos/notification-receiver.dto';

@Controller('notifications/')
export class NotificationsController {
  constructor(private notificationService: NotificationService) {}

  @UserRoles(UserRole.Admin)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Get('notifier/')
  public async getAllReceiver(): Promise<NotificationReceiverEntity[]> {
    return this.notificationService.getAll();
  }

  @UserRoles(UserRole.Admin)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Post('notifier/')
  public async createReceiver(@Body() dto: NotificationReceiverDto): Promise<NotificationReceiverEntity> {
    return this.notificationService.create(dto);
  }

  @UserRoles(UserRole.Admin)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Put('notifier/')
  public async updateReceiver(@Body() dto: NotificationReceiverDto): Promise<any> {
    return this.notificationService.update(dto);
  }

  @UserRoles(UserRole.Admin)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Delete('notifier/:id')
  public async deleteReceiver(@Param('id') id: number): Promise<any> {
    return this.notificationService.delete(id);
  }
}
