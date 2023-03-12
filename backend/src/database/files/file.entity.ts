import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FileCategoryEntity } from '../file-categories/file-category.entity';
import { FileDto } from '../../shared/dtos/file.dto';

@Entity('files')
export class FileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'bigint' })
  date: number;

  @Column()
  filename: string;

  @Column()
  mimetype: string;

  @Column({ type: 'bigint' })
  size: number;

  @ManyToOne((type) => FileCategoryEntity, (category) => category.files)
  @JoinColumn({ name: 'categoryId' })
  category: FileCategoryEntity;

  @Column()
  categoryId: number;

  public loadFromDto(dto: FileDto) {
    this.id = dto.id;
    this.title = dto.title;
    this.date = dto.date;
    this.filename = dto.filename;
    this.mimetype = dto.mimetype;
    this.size = dto.size;
  }
}
