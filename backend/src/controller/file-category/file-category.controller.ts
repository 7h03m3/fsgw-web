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
import { FileCategoriesService } from '../../database/file-categories/file-categories.service';
import { FileCategoryEntity } from '../../database/file-categories/file-category.entity';
import { FileCategoryDto } from '../../shared/dtos/file-category.dto';

@Controller('file-category/')
export class FileCategoryController {
  constructor(private readonly categoryService: FileCategoriesService) {}

  @Get()
  getAll(): Promise<FileCategoryEntity[]> {
    return this.categoryService.getAll();
  }

  @Get(':abbreviation')
  getByAbbreviation(
    @Param('abbreviation') abbreviation: string,
  ): Promise<FileCategoryEntity> {
    return this.categoryService.getByAbbreviation(abbreviation);
  }

  @UserRoles(UserRole.Admin)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Post()
  async create(@Body() dto: FileCategoryDto): Promise<FileCategoryEntity> {
    return this.categoryService.create(dto);
  }

  @UserRoles(UserRole.Admin)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Put()
  async update(@Body() dto: FileCategoryDto): Promise<any> {
    return this.categoryService.update(dto);
  }

  @UserRoles(UserRole.Admin)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<any> {
    return this.categoryService.delete(id);
  }
}
