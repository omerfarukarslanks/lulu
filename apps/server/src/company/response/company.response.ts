import {Company} from "@prisma/client";

export class CompanyResponse {
  id: number;
  name: string;
  email: string;

  static fromCompanyToEntity(company: Company) {
    const companyResponse = new CompanyResponse();
    companyResponse.name = company.name;
    companyResponse.id = company.id;
    companyResponse.email = company.email;
    return companyResponse;
  }
}
