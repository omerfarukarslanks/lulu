import {User} from "@prisma/client";
import {IUserResponseModel} from "@lulu/model";

export class UserResponse {
  static fromEntityToResponse(entity: User) {
    const response: IUserResponseModel = {
      email: "",
      id: null,
      isActive: false,
      name: "",
      permissions: undefined,
      phoneNumber: "",
      roleId: null,
      shopId: null
    }
    response.id = entity.id;
    response.name = entity.name
    response.email = entity.email;
    response.phoneNumber = entity.phoneNumber;
    response.shopId = entity.shopId;
    response.roleId = entity.roleId;
    response.isActive = entity.isActive
    return response;
  }
}
