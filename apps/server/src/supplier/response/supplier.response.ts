import {Supplier} from "@prisma/client";
import {ISupplierResponseModel} from "@lulu/model";

export class SupplierResponse {

  static fromEntityToResponse(entity: Supplier) {
    const response: ISupplierResponseModel = {
      email: "",
      isActive: false,
      name: "",
      phoneNumber: "",
      roleId: null,
      shopId: null
    }
    response.name = entity.name;
    response.email = entity.email;
    response.phoneNumber = entity.phoneNumber;
    response.shopId = entity.shopId;
    response.roleId = entity.roleId;
    response.isActive = entity.isActive;
    return response;
  }
}
