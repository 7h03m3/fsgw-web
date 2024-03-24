import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { NewsDto } from '../../shared/dtos/news.dto';
import { NewsCategory } from '../../shared/enums/news-category.enum';

@Entity('news')
export class NewsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'bigint' })
  date: number;

  @Column({
    type: 'enum',
    enum: NewsCategory,
    default: [NewsCategory.General],
  })
  category: NewsCategory;

  @Column()
  subject: string;

  @Column({ type: 'text' })
  message: string;

  @Column()
  public: boolean;

  @Column()
  sticky: boolean;

  public loadFromDto(dto: NewsDto) {
    this.id = dto.id;
    this.date = dto.date;
    this.category = dto.category;
    this.subject = dto.subject;
    this.message = dto.message;
    this.public = dto.public;
    this.sticky = dto.sticky;
  }
}
