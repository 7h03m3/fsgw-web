import { Injectable } from '@angular/core';
import { FileDto } from '../dtos/file.dto';

@Injectable({ providedIn: 'root' })
export class SortHelper {
  public static sortFilesByDate(fileList: FileDto[], ascending: boolean) {
    fileList.sort((a, b) => {
      if (a.date > b.date) {
        return ascending ? 1 : -1;
      }

      if (a.date < b.date) {
        return ascending ? -1 : 1;
      }

      return 0;
    });
  }
}
