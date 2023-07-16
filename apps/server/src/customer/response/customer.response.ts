import {Customer} from "@prisma/client";
import {ICustomerResponseModel} from "@lulu/model";

export class CustomerResponse{
  static fromEntityToResponse(entity: Customer) {
    const response: ICustomerResponseModel = {
      email: "",
      isActive: false,
      name: "",
      phoneNumber: "",
      roleId: 0,
      shopId: 0,
      type: undefined
    }
    response.name = entity.name;
    response.email = entity.email;
    response.phoneNumber = entity.phoneNumber;
    response.type = entity.type;
    response.isActive  =entity.isActive;
    response.roleId = entity.roleId;
    response.shopId = entity.shopId;
    return response;
  }
}
