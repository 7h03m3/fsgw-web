import { UserRole } from '../enums/user-role.enum';

export class UserDto {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
  password: string;
  roles: UserRole[];

  constructor() {
    this.id = 0;
    this.userName = '';
    this.firstName = '';
    this.lastName = '';
    this.roles = [UserRole.Anonymous];
    this.password = '';
  }
}
