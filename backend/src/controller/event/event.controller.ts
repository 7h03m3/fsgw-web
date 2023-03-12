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
  UseGuards,
} from '@nestjs/common';
import { EventCategoriesService } from '../../database/event-categories/event-categories.service';
import { EventsService } from '../../database/events/events.service';
import { LocationsService } from '../../database/locations/locations.service';
import { UserRoles } from '../../shared/decorators/user-roles.decorator';
import { UserRole } from '../../shared/enums/user-role.enum';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth/jwt-auth.guard';
import { RoleAuthGuard } from '../../auth/guards/role-auth/role-auth.guard';
import { EventEntity } from '../../database/events/event.entity';
import { EventDto } from '../../shared/dtos/event.dto';
import { LocationEntity } from '../../database/locations/location.entity';
import { EventCategoryEntity } from '../../database/event-categories/event-category.entity';

@Controller('event/')
export class EventController {
  constructor(
    private readonly eventService: EventsService,
    private readonly categoryService: EventCategoriesService,
    private readonly locationService: LocationsService,
  ) {}

  @UserRoles(UserRole.Admin, UserRole.ContentManager)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Get()
  getAll(): Promise<EventEntity[]> {
    return this.eventService.getAll();
  }

  @Get('public/:startDate')
  async getAllPublic(
    @Param('startDate') startDate: number,
  ): Promise<EventEntity[]> {
    return await this.eventService.getAllPublicByTime(startDate);
  }

  @Get('public/:startDate/:categoryAbbreviation')
  async getAllPublicByCategory(
    @Param('startDate') startDate: number,
    @Param('categoryAbbreviation') categoryAbbreviation: string,
  ): Promise<EventEntity[]> {
    return await this.eventService.getAllPublicByTimeAndCategory(
      startDate,
      categoryAbbreviation,
    );
  }

  @UserRoles(UserRole.Admin, UserRole.ContentManager)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Post()
  async create(@Body() dto: EventDto): Promise<EventEntity> {
    const location = await this.getLocation(dto.locationId);
    const category = await this.getCategory(dto.categoryId);
    return this.eventService.create(dto, category, location);
  }

  @UserRoles(UserRole.Admin, UserRole.ContentManager)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Put()
  async update(@Body() dto: EventDto): Promise<any> {
    const location = await this.getLocation(dto.locationId);
    const category = await this.getCategory(dto.categoryId);
    return this.eventService.update(dto, category, location);
  }

  @UserRoles(UserRole.Admin, UserRole.ContentManager)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<any> {
    return this.eventService.delete(id);
  }

  private async getLocation(id: number): Promise<LocationEntity> {
    const location = await this.locationService.getById(id);

    if (!location) {
      const errorMessage = 'location with id ' + id.toString() + ' not found';
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }

    return location;
  }

  private async getCategory(id: number): Promise<EventCategoryEntity> {
    const category = await this.categoryService.getById(id);

    if (!category) {
      const errorMessage =
        'event category with id ' + id.toString() + ' not found';
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }

    return category;
  }
}
