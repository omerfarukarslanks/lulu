import {Company} from "@prisma/client";
import {ICompanyResponseModel} from "@lulu/model";

export class CompanyResponse {

  static fromEntityToResponse(entity: Company) {
    const companyResponse: ICompanyResponseModel = {
      email: "",
      id: 0,
      isActive: false,
      name: "",
      phoneNumber: "",
      type: undefined
    }
    companyResponse.name = entity.name;
    companyResponse.id = entity.id;
    companyResponse.email = entity.email;
    companyResponse.phoneNumber = entity.phoneNumber;
    companyResponse.type = entity.type;
    companyResponse.isActive = entity.isActive
    return companyResponse;
  }
}
