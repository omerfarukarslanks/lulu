import {Role} from "@prisma/client";

export class RoleResponse {
  id: number;
  name: string;
  permissions: Array<string>;

  static fromRoleEntity(role: Role) {
    const roleResponse = new RoleResponse();
    roleResponse.id = role.id;
    roleResponse.name = role.name
    roleResponse.permissions = JSON.parse(<string>role.permissions);
    return roleResponse;
  }
}
