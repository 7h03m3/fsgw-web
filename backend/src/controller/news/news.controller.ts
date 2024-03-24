import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { NewsService } from '../../database/news/news.service';
import { NewsEntity } from '../../database/news/news.entity';
import { UserRoles } from '../../shared/decorators/user-roles.decorator';
import { UserRole } from '../../shared/enums/user-role.enum';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth/jwt-auth.guard';
import { RoleAuthGuard } from '../../auth/guards/role-auth/role-auth.guard';
import { NewsCategory } from '../../shared/enums/news-category.enum';
import { NewsDto } from '../../shared/dtos/news.dto';

@Controller('news')
export class NewsController {
  constructor(private newsService: NewsService) {}

  @UserRoles(UserRole.Admin, UserRole.ContentManager)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Get()
  getAll(): Promise<NewsEntity[]> {
    return this.newsService.getAll();
  }

  @Get('/public/:limit')
  getAllPublic(@Param('limit') limit: number): Promise<NewsEntity[]> {
    return this.newsService.getAllPublic(limit);
  }

  @Get('/public/:limit/:category')
  getAllPublicByCategory(
    @Param('limit') limit: number,
    @Param('category') category: NewsCategory,
  ): Promise<NewsEntity[]> {
    return this.newsService.getAllPublicByCategory(limit, category);
  }

  @UserRoles(UserRole.Admin, UserRole.ContentManager)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Post()
  async create(@Body() dto: NewsDto): Promise<NewsEntity> {
    return this.newsService.create(dto);
  }

  @UserRoles(UserRole.Admin, UserRole.ContentManager)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Put()
  async update(@Body() dto: NewsDto): Promise<any> {
    return this.newsService.update(dto);
  }

  @UserRoles(UserRole.Admin, UserRole.ContentManager)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<any> {
    return this.newsService.delete(id);
  }
}
