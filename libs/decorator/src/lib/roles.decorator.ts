import { SetMetadata } from '@nestjs/common';
import {RoleEnum} from "@lulu/model";

export const ROLE_KEY = 'role';
export const HasRole = (role: RoleEnum) => SetMetadata(ROLE_KEY, role);
