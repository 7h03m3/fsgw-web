import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { FileEntity } from '../files/file.entity';
import { FileCategoryDto } from '../../shared/dtos/file-category.dto';

@Entity('file-categories')
export class FileCategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  abbreviation: string;

  @OneToMany((type) => FileEntity, (file) => file.category)
  files: FileCategoryEntity[];

  public loadFromDto(dto: FileCategoryDto) {
    this.id = dto.id;
    this.name = dto.name;
    this.abbreviation = dto.abbreviation;
  }
}
