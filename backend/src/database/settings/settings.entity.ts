import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { SettingType } from '../../shared/enums/setting-type.enum';
import { SettingDto } from '../../shared/dtos/setting.dto';

@Entity('settings')
export class SettingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: SettingType,
    default: [SettingType.Contact],
  })
  type: SettingType;

  @Column({ default: false })
  enable: boolean;

  @Column({ default: '' })
  parameter: string;

  public loadFromDto(dto: SettingDto) {
    this.id = dto.id;
    this.type = dto.type;
    this.enable = dto.enable;
    this.parameter = dto.parameter;
  }
}
