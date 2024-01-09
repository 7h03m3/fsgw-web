import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ContactMessageService } from '../../database/contact-message/contact-message.service';

import { ContactMessageDto } from '../../shared/dtos/contact-message.dto';
import { ContactMessageStatus } from '../../shared/enums/contact-message-status.enum';

import { UserRoles } from '../../shared/decorators/user-roles.decorator';
import { UserRole } from '../../shared/enums/user-role.enum';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth/jwt-auth.guard';
import { RoleAuthGuard } from '../../auth/guards/role-auth/role-auth.guard';
import { ContactMessageEntity } from '../../database/contact-message/contact-message.entity';
import { MailService } from '../../mail/mail.service';
import { SettingsService } from '../../database/settings/settings.service';
import { SettingType } from '../../shared/enums/setting-type.enum';

@Controller('contact-message/')
export class ContactMessageController {
  constructor(
    private contactMessages: ContactMessageService,
    private mailService: MailService,
    private settingsService: SettingsService,
  ) {}

  @UserRoles(UserRole.Admin, UserRole.ContentManager)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Get('')
  public async getAll(): Promise<ContactMessageEntity[]> {
    return this.contactMessages.getAll();
  }

  @Post()
  public async add(@Body() dto: ContactMessageDto): Promise<ContactMessageEntity> {
    const setting = await this.settingsService.getByType(SettingType.Contact);
    if (!setting || !setting.enable) {
      const errorMessage = 'contact messages are disabled';
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }

    const entity = await this.contactMessages.add(dto);

    this.mailService.onContactMessageAdd(entity).then(() => {});

    return entity;
  }

  @UserRoles(UserRole.Admin, UserRole.ContentManager)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Delete(':id')
  public async delete(@Param('id') id: number): Promise<any> {
    return this.contactMessages.delete(id);
  }

  @UserRoles(UserRole.Admin, UserRole.ContentManager)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Put('status/')
  public async setStatus(@Body() dto: ContactMessageDto): Promise<any> {
    return this.contactMessages.setStatus(dto.id, dto.status);
  }

  @UserRoles(UserRole.Admin, UserRole.ContentManager)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Get('status/count/:status')
  public async getStatusCount(@Param('status') status: ContactMessageStatus): Promise<number> {
    return this.contactMessages.getStatusCount(status);
  }
}
