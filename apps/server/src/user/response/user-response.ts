import {User} from "../entities/user.entity";

export class UserResponse {
  id: number;
  name: string;
  email: string
  phoneNumber: string;
  companyId: number;
  static fromUserEntity(entity: User) {
    const response = new UserResponse();
    response.id = entity.id;
    response.name = entity.name
    response.email = entity.email;
    response.phoneNumber = entity.phoneNumber;
    response.companyId = entity.companyId;
    return response;
  }
}
