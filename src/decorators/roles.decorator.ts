import { RolesEnum } from 'src/users/entities/user.entity';
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: RolesEnum[]) => {
  const rolesMetaData = SetMetadata(ROLES_KEY, roles);
  return rolesMetaData;
};
