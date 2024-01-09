import { SettingType } from '../enums/setting-type.enum';

export class SettingDto {
  id: number = 0;
  type: SettingType = SettingType.Contact;
  enable: boolean = false;
  parameter: string = '';
}
