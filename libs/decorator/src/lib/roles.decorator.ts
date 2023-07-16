import { SetMetadata } from '@nestjs/common';
import {RoleEnum} from "@lulu/model";

export const ROLES_KEY = 'roles';
export const HasRole = (roles: Array<RoleEnum>) => SetMetadata(ROLES_KEY, roles);
