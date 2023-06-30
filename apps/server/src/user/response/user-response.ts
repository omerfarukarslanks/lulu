import {User} from "@prisma/client";

export class UserResponse {
  id: number;
  name: string;
  email: string
  phoneNumber: string;
  companyId: number;
  roles: Array<string>;
  permissions: Array<string>;
  static fromUserEntity(entity: User) {
    const response = new UserResponse();
    response.id = entity.id;
    response.name = entity.name
    response.email = entity.email;
    response.phoneNumber = entity.phoneNumber;
    response.companyId = entity.companyId;
    response.roles = JSON.parse(entity.roleIds);
    return response;
  }
}
