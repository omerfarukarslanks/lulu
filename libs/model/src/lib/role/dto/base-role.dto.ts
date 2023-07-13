import {PermissionDto} from "@lulu/model";

export interface BaseRoleDto{
  name: string;
  permissions: Array<PermissionDto>;
  isActive: boolean;
}
