import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserRoles } from '../../shared/decorators/user-roles.decorator';
import { UserRole } from '../../shared/enums/user-role.enum';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth/jwt-auth.guard';
import { RoleAuthGuard } from '../../auth/guards/role-auth/role-auth.guard';
import { LocationsService } from '../../database/locations/locations.service';
import { LocationEntity } from '../../database/locations/location.entity';
import { LocationDto } from '../../shared/dtos/location.dto';

@Controller('location/')
export class LocationController {
  constructor(private readonly locationsService: LocationsService) {}

  @Get()
  getAll(): Promise<LocationEntity[]> {
    return this.locationsService.getAll();
  }

  @UserRoles(UserRole.Admin)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Post()
  async create(@Body() dto: LocationDto): Promise<LocationEntity> {
    return this.locationsService.create(dto);
  }

  @UserRoles(UserRole.Admin)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Put()
  async update(@Body() dto: LocationDto): Promise<any> {
    return this.locationsService.update(dto);
  }

  @UserRoles(UserRole.Admin)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<any> {
    return this.locationsService.delete(id);
  }
}
