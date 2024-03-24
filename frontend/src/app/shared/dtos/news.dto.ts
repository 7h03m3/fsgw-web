import { NewsCategory } from '../enums/news-category.enum';

export class NewsDto {
  id: number = 0;
  date: number = Date.now();
  category: NewsCategory = NewsCategory.General;
  subject: string = '';
  message: string = '';
  public: boolean = false;
  sticky: boolean = false;
}
