import {Customer, CustomerType} from "@prisma/client";

export class CustomerResponse{
  name: string;
  email: string;
  phoneNumber: string;
  type: CustomerType;
  shopId: number;
  roleIds: Array<number>;
  isActive: boolean;

  static fromDtoToEntity(entity: Customer) {
    const response = new CustomerResponse();
    response.name = entity.name;
    response.email = entity.email;
    response.phoneNumber = entity.phoneNumber;
    response.type = entity.type;
    response.isActive  =entity.isActive;
    response.roleIds = JSON.parse(<string>entity.roleIds);
    response.shopId = entity.shopId;
  }
}
