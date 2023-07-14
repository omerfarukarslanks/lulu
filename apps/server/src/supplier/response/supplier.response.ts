import {Supplier} from "@prisma/client";

export class SupplierResponse {
  name: string;
  email: string;
  phoneNumber: string;
  roleIds: Array<string>;
  shopId: number;
  isActive: boolean;

  static fromDtoToEntity(entity: Supplier) {
    const response = new SupplierResponse();
    response.name = entity.name;
    response.email = entity.email;
    response.phoneNumber = entity.phoneNumber;
    response.shopId = entity.shopId;
    response.roleIds = JSON.parse(<string>entity.roleIds);
    response.isActive = entity.isActive;
    return response;
  }
}
