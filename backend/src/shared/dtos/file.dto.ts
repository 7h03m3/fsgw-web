import { FileCategoryDto } from './file-category.dto';

export class FileDto {
  id: number;
  title: string;
  date: number;
  filename: string;
  mimetype: string;
  size: number;
  category: FileCategoryDto;
  categoryId: number;

  constructor() {
    this.id = 0;
    this.title = '';
    this.date = new Date().getTime();
    this.filename = '';
    this.mimetype = '';
    this.size = 0;
    this.category = new FileCategoryDto();
    this.categoryId = 0;
  }
}
