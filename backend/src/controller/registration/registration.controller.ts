import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserRoles } from '../../shared/decorators/user-roles.decorator';
import { UserRole } from '../../shared/enums/user-role.enum';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth/jwt-auth.guard';
import { RoleAuthGuard } from '../../auth/guards/role-auth/role-auth.guard';
import { RegistrationsService } from '../../database/registrations/registrations.service';
import { RegistrationDto } from '../../shared/dtos/registration.dto';
import { RegistrationEntity } from '../../database/registrations/registration.entity';
import { ReportCourseRegistrationService } from '../../reports/course-registration/report-course-registration.service';
import { MailService } from '../../mail/mail.service';
import { SettingsService } from '../../database/settings/settings.service';
import { SettingType } from '../../shared/enums/setting-type.enum';

@Controller('registration')
export class RegistrationController {
  constructor(
    private readonly registrationService: RegistrationsService,
    private reportService: ReportCourseRegistrationService,
    private mailService: MailService,
    private settingsService: SettingsService,
  ) {}

  @UserRoles(UserRole.Admin, UserRole.ContentManager)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Get(':year')
  public getAll(@Param('year') year: number): Promise<RegistrationEntity[]> {
    return this.registrationService.getAllByYear(year);
  }

  @Post()
  public async create(@Body() dto: RegistrationDto): Promise<RegistrationEntity> {
    const setting = await this.settingsService.getByType(SettingType.CourseRegistration);
    if (!setting || !setting.enable) {
      const errorMessage = 'course registration is disabled';
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }

    dto.year = +setting.parameter;

    const entity = await this.registrationService.create(dto);

    this.mailService.onRegistrationAdd(entity).then(() => {});

    return entity;
  }

  @UserRoles(UserRole.Admin, UserRole.ContentManager)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Put()
  public async update(@Body() dto: RegistrationDto): Promise<any> {
    return this.registrationService.update(dto);
  }

  @UserRoles(UserRole.Admin, UserRole.ContentManager)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Delete(':id')
  public async delete(@Param('id') id: number): Promise<any> {
    return this.registrationService.delete(id);
  }

  @UserRoles(UserRole.Admin, UserRole.ContentManager)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Get('report/:id')
  public async getRegistrationReport(@Param('id') id: number, @Res() response: any): Promise<any> {
    const entity = await this.registrationService.getById(id);
    if (entity == null) {
      const errorMessage = 'registration with id ' + id + ' does not exists';
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }

    const pdfFile = await this.reportService.generatePdf(entity);
    await pdfFile.addDataToResponse(response);
  }
}
