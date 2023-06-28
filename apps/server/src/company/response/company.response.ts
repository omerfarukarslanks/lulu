import {Company} from "../entities/company.entity";

export class CompanyResponse {
  id: number;
  name: string;
  email: string;

  static formCompanyToEntity(company: Company) {
    const companyResponse = new CompanyResponse();
    companyResponse.name = company.name;
    companyResponse.id = company.id;
    companyResponse.email = company.email;
    return companyResponse;
  }
}
