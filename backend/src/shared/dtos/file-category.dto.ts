import { FileDto } from './file.dto';

export class FileCategoryDto {
  id: number;
  name: string;
  abbreviation: string;
  files: FileDto[];

  constructor() {
    this.id = 0;
    this.name = '';
    this.abbreviation = '';
    this.files = new Array<FileDto>();
  }
}
