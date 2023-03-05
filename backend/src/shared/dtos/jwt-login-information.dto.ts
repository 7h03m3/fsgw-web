import { UserRole } from '../enums/user-role.enum';

export class JwtLoginInformation {
  userName: string;
  id: number;
  roles: UserRole;
  access_token: string;

  constructor() {
    this.userName = '';
    this.id = 0;
    this.roles = UserRole.Anonymous;
    this.access_token = '';
  }
}
