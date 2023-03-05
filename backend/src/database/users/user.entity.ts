import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserDto } from '../../shared/dtos/user.dto';
import { UserRole } from '../../shared/enums/user-role.enum';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  userName: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  password: string;

  @Column({
    type: 'set',
    enum: UserRole,
    default: [UserRole.Anonymous],
  })
  roles: UserRole[];

  public loadFromDto(dto: UserDto) {
    this.userName = dto.userName;
    this.firstName = dto.firstName;
    this.lastName = dto.lastName;
    this.password = dto.password;
    this.roles = dto.roles;
  }

  public getDto(): UserDto {
    const dto = new UserDto();
    dto.userName = this.userName;
    dto.firstName = this.firstName;
    dto.lastName = this.lastName;
    dto.password = this.password;
    dto.roles = this.roles;

    return dto;
  }
}
