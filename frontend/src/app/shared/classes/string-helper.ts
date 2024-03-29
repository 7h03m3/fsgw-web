import { NotificationSource } from '../enums/notification-source.enum';

export class StringHelper {
  private static localeString = 'de-CH';

  public static getDateTimeString(dateNumber: number): string {
    return (
      this.getDateString(dateNumber) + ' ' + this.getTimeString(dateNumber)
    );
  }

  public static getDateString(dateNumber: number): string {
    const date = new Date(+dateNumber);
    const days = this.addLeadingZero(date.getDate());
    const month = this.addLeadingZero(date.getMonth() + 1);
    const year = date.getFullYear();
    return days + '.' + month + '.' + year;
  }

  public static getStartEndDateString(start: number, end: number): string {
    const startDate = this.getDateString(start);
    const endDate = this.getDateString(end);

    if (startDate == endDate) {
      return startDate;
    }

    return startDate + ' - ' + endDate;
  }

  public static getTimeString(dateNumber: number): string {
    const date = new Date(+dateNumber);
    const hours = this.addLeadingZero(date.getHours());
    const minutes = this.addLeadingZero(date.getMinutes());
    return hours + ':' + minutes;
  }

  public static getStartEndDateTimeString(start: number, end: number): string {
    const startDate = this.getDateString(start);
    const endDate = this.getDateString(end);
    const startTime = this.getTimeString(start);
    const endTime = this.getTimeString(end);

    if (startDate == endDate) {
      return startDate + ' ' + startTime + ' - ' + endTime;
    } else {
      return (
        startDate + ' ' + startTime + ' - ' + ' ' + endDate + ' ' + endTime
      );
    }
  }

  public static getStartEndTimeString(start: number, end: number): string {
    const startTime = this.getTimeString(start);
    const endTime = this.getTimeString(end);

    return startTime + ' - ' + endTime;
  }

  public static getDayOfWeekLong(dateNumber: number): string {
    const date = new Date(+dateNumber);
    return date.toLocaleString(this.localeString, { weekday: 'long' });
  }

  public static getDayOfWeekShort(dateNumber: number): string {
    const date = new Date(+dateNumber);
    return date.toLocaleString(this.localeString, { weekday: 'short' });
  }

  public static getDate(dateString: string, timeString: string): number {
    const temp = timeString.split(':');
    const date = new Date(Date.parse(dateString));

    if (temp[0] != undefined && temp[1] != undefined && temp[2] != undefined) {
      date.setHours(+temp[0], +temp[1], +temp[2]);
    } else if (temp[0] != undefined && temp[1] != undefined) {
      date.setHours(+temp[0], +temp[1]);
    }

    return date.getTime();
  }

  public static getDateByDateString(dateString: string): number {
    const dateStringArray = dateString.split('.');

    const date = new Date();
    date.setDate(Number.parseInt(dateStringArray[0]));
    date.setMonth(Number.parseInt(dateStringArray[1]) - 1);
    date.setFullYear(Number.parseInt(dateStringArray[2]));
    return date.getTime();
  }

  public static getFileSizeString(size: number): string {
    if (size > 2 ** 20) {
      return Math.round(size / 2 ** 20) + ' MB';
    } else if (size > 2 ** 10) {
      return Math.round(size / 2 ** 10) + ' kB';
    } else {
      return size + ' Byte';
    }
  }

  public static getNotificationTriggerText(
    sourceList: NotificationSource[]
  ): string {
    let returnString = '';

    sourceList.forEach((trigger) => {
      if (returnString.length != 0) {
        returnString += ', ';
      }

      returnString += StringHelper.getNotificationSourceText(trigger);
    });

    return returnString;
  }

  public static getNotificationSourceText(source: NotificationSource) {
    switch (source) {
      case NotificationSource.CourseRegistration:
        return 'Kursanmeldungen';
      case NotificationSource.ContactMessage:
        return 'Kontakt-Nachrichten';
      default:
        return '';
    }
  }

  private static addLeadingZero(inputNumber: number): string {
    let input = inputNumber.toString();
    if (input.length < 2) {
      input = '0' + input;
    }

    return input;
  }
}
