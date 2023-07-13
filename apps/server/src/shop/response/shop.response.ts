import {Shop} from "@prisma/client";

export class ShopResponse {
  name: string;
  email: string;
  phoneNumber: string;
  companyId?: number;
  isActive: boolean;

  static fromToEntity(entity: Shop) {
    const response = new ShopResponse();
    response.email = entity.email;
    response.name = entity.name;
    response.isActive = entity.isActive;
    response.phoneNumber = entity.phoneNumber;
    response.companyId = entity.companyId;
    return response;
  }
}
