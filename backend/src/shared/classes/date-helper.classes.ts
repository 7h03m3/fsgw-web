import { Injectable } from '@nestjs/common';

@Injectable()
export class DateHelper {
  public static getDateString(dateNumber: number): string {
    const date = new Date(+dateNumber);
    const days = DateHelper.addLeadingZero(date.getDate());
    const month = DateHelper.addLeadingZero(date.getMonth() + 1);
    const year = date.getFullYear();
    return days + '.' + month + '.' + year;
  }

  public static getYearStart(year: number): Date {
    const date = new Date();
    date.setFullYear(year, 0, 1);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);

    return date;
  }

  public static getYearEnd(year: number): Date {
    const date = new Date();
    date.setFullYear(year, 11, 31);
    date.setHours(23);
    date.setMinutes(59);
    date.setSeconds(59);

    return date;
  }

  private static addLeadingZero(inputNumber: number): string {
    let input = inputNumber.toString();
    if (input.length < 2) {
      input = '0' + input;
    }

    return input;
  }
}
