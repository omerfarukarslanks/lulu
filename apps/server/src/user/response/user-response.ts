import {User} from "@prisma/client";

export class UserResponse {
  id: number;
  name: string;
  email: string
  phoneNumber: string;
  shopId: number;
  roleId: number;
  permissions: Array<string>;
  isActive: boolean;
  static fromUserEntity(entity: User) {
    const response = new UserResponse();
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
