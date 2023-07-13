import {Company, CompanyType} from "@prisma/client";

export class CompanyResponse {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  type: CompanyType;
  isActive: boolean;

  static fromCompanyToEntity(company: Company) {
    const companyResponse = new CompanyResponse();
    companyResponse.name = company.name;
    companyResponse.id = company.id;
    companyResponse.email = company.email;
    companyResponse.phoneNumber = company.phoneNumber;
    companyResponse.type = company.type;
    companyResponse.isActive = company.isActive
    return companyResponse;
  }
}
