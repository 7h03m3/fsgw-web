import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../enums/user-role.enum';

export const USER_ROLES_KEY = 'roles';
export const UserRoles = (...roles: UserRole[]) =>
  SetMetadata(USER_ROLES_KEY, roles);
