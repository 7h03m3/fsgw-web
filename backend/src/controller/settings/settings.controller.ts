import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { UserRoles } from '../../shared/decorators/user-roles.decorator';
import { UserRole } from '../../shared/enums/user-role.enum';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth/jwt-auth.guard';
import { RoleAuthGuard } from '../../auth/guards/role-auth/role-auth.guard';
import { SettingEntity } from '../../database/settings/settings.entity';
import { SettingsService } from '../../database/settings/settings.service';
import { SettingDto } from '../../shared/dtos/setting.dto';
import { SettingType } from '../../shared/enums/setting-type.enum';

@Controller('settings')
export class SettingsController {
  constructor(private settingsService: SettingsService) {}

  @Get(':type')
  public getByType(@Param('type') type: SettingType): Promise<SettingEntity> {
    return this.settingsService.getByType(type);
  }

  @UserRoles(UserRole.Admin, UserRole.ContentManager)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Get()
  public getAll(): Promise<SettingEntity[]> {
    return this.settingsService.getAll();
  }

  @UserRoles(UserRole.Admin, UserRole.ContentManager)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Put()
  public async update(@Body() dto: SettingDto): Promise<any> {
    return this.settingsService.update(dto);
  }
}
