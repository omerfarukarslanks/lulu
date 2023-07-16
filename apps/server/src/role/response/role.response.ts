import {Role} from "@prisma/client";
import {IRoleResponseModel} from "@lulu/model";

export class RoleResponse {

  static fromEntityToResponse(entity: Role) {
    const roleResponse: IRoleResponseModel = {id: null, name: "", permissions: undefined}
    roleResponse.id = entity.id;
    roleResponse.name = entity.name
    roleResponse.permissions = JSON.parse(<string>entity.permissions);
    return roleResponse;
  }
}
