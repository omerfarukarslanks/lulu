import {Shop} from "@prisma/client";
import {IShopResponseModel} from "@lulu/model";

export class ShopResponse {

  static fromEntityToResponse(entity: Shop) {
    const response: IShopResponseModel = {companyId: null, email: "", isActive: false, name: "", phoneNumber: ""}
    response.email = entity.email;
    response.name = entity.name;
    response.isActive = entity.isActive;
    response.phoneNumber = entity.phoneNumber;
    response.companyId = entity.companyId;
    return response;
  }
}
