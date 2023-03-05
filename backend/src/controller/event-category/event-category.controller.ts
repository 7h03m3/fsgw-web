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
import { EventCategoriesService } from '../../database/event-categories/event-categories.service';
import { EventCategoryEntity } from '../../database/event-categories/event-category.entity';
import { UserRoles } from '../../shared/decorators/user-roles.decorator';
import { UserRole } from '../../shared/enums/user-role.enum';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth/jwt-auth.guard';
import { RoleAuthGuard } from '../../auth/guards/role-auth/role-auth.guard';
import { EventCategoryDto } from '../../shared/dtos/event-category.dto';

@Controller('event-category/')
export class EventCategoryController {
  constructor(private readonly categoryService: EventCategoriesService) {}

  @Get()
  getAll(): Promise<EventCategoryEntity[]> {
    return this.categoryService.getAll();
  }

  @Get(':abbreviation')
  getByAbbreviation(
    @Param('abbreviation') abbreviation: string,
  ): Promise<EventCategoryEntity> {
    return this.categoryService.getByAbbreviation(abbreviation);
  }

  @UserRoles(UserRole.Admin)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Post()
  async create(@Body() dto: EventCategoryDto): Promise<EventCategoryEntity> {
    return this.categoryService.create(dto);
  }

  @UserRoles(UserRole.Admin)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Put()
  async update(@Body() dto: EventCategoryDto): Promise<any> {
    return this.categoryService.update(dto);
  }

  @UserRoles(UserRole.Admin)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<any> {
    return this.categoryService.delete(id);
  }
}
