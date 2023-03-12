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
  Request,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { promisify } from 'util';
import * as fs from 'fs';
import { createReadStream } from 'fs';
import { FileDto } from '../../shared/dtos/file.dto';
import { FileCategoryEntity } from '../../database/file-categories/file-category.entity';
import { FileCategoriesService } from '../../database/file-categories/file-categories.service';
import { FileEntity } from '../../database/files/file.entity';
import { FilesService } from '../../database/files/files.service';
import { UserRoles } from '../../shared/decorators/user-roles.decorator';
import { UserRole } from '../../shared/enums/user-role.enum';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth/jwt-auth.guard';
import { RoleAuthGuard } from '../../auth/guards/role-auth/role-auth.guard';
import { FileHelper } from '../../shared/classes/file-helper.classes';

@Controller('file/')
export class FileController {
  private fileDirectory = '../data/files/';

  constructor(
    private readonly fileService: FilesService,
    private readonly categoryService: FileCategoriesService,
  ) {}

  @Get()
  getAll(): Promise<FileEntity[]> {
    return this.fileService.getAll();
  }

  @Get('/filename/:filename')
  async getByFilename(
    @Param('filename') filename: string,
  ): Promise<FileEntity> {
    return await this.fileService.getByFilename(filename);
  }

  @Get('/category/:categoryAbbreviation')
  async getByCategoryAbbreviation(
    @Param('categoryAbbreviation') categoryAbbreviation: string,
  ): Promise<FileEntity[]> {
    return await this.fileService.getByCategory(categoryAbbreviation);
  }

  @Get('/category/:categoryAbbreviation/:year')
  async getByCategoryAbbreviationAndYear(
    @Param('categoryAbbreviation') categoryAbbreviation: string,
    @Param('year') year: number,
  ): Promise<FileEntity[]> {
    const start = this.getDate(year, 1, 1, 0, 0, 0);
    const end = this.getDate(year, 12, 31, 23, 59, 59);

    return await this.fileService.getByCategoryAndTimeRange(
      categoryAbbreviation,
      start,
      end,
    );
  }

  @UserRoles(UserRole.Admin, UserRole.ContentManager)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Put()
  async update(@Body() dto: FileDto): Promise<any> {
    const category = await this.getCategory(dto.categoryId);
    return this.fileService.update(dto, category);
  }

  @Post('/upload')
  @UserRoles(UserRole.Admin, UserRole.ContentManager)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  public async uploadFile(
    @Body() body,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<FileEntity> {
    const dto: FileDto = this.getDto(body);

    dto.filename = FileHelper.getFilename(dto.filename);

    const fileEntity = await this.fileService.getByFilename(dto.filename);
    if (fileEntity != null) {
      const errorMessage = 'file des already exist';
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }

    const category = await this.getCategory(dto.categoryId);
    const entity = await this.fileService.create(dto, category);

    const writeFile = promisify(fs.writeFile);
    await writeFile(this.fileDirectory + dto.filename, file.buffer, 'utf8');

    return entity;
  }

  @Get(':id')
  async download(
    @Param('id') id: number,
    @Res() response,
    @Request() req: any,
  ): Promise<any> {
    const fileEntity = await this.fileService.getById(id);
    if (!fileEntity) {
      const errorMessage = 'file with id ' + id.toString() + ' not found';
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }

    const fileStream = createReadStream(
      this.fileDirectory + fileEntity.filename,
    );
    response.set({
      'Content-Type': fileEntity.mimetype,
      'Content-Disposition': 'attachment; filename=' + fileEntity.filename,
      'Access-Control-Expose-Headers': 'Content-Disposition',
    });

    fileStream.pipe(response).on('close', () => {});
  }

  @UserRoles(UserRole.Admin, UserRole.ContentManager)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<any> {
    const fileEntity = await this.fileService.getById(id);
    if (!fileEntity) {
      const errorMessage = 'file with id ' + id.toString() + ' not found';
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }

    fs.unlink(this.fileDirectory + fileEntity.filename, () => {});
    return this.fileService.delete(id);
  }

  private async getCategory(id: number): Promise<FileCategoryEntity> {
    const category = await this.categoryService.getById(id);

    if (!category) {
      const errorMessage =
        'file category with id ' + id.toString() + ' not found';
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }

    return category;
  }

  private getDto(@Body() body): any {
    if (!body.dto) {
      const errorMessage = 'dto not provide';
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }

    return JSON.parse(body.dto) as FileDto;
  }

  private getDate(
    year: number,
    month: number,
    day: number,
    hours: number,
    min: number,
    sec: number,
  ): number {
    const date = new Date();
    date.setFullYear(year, month - 1, day);
    date.setHours(hours, min, sec);
    return date.getTime();
  }
}
