import {CreateCompanyDto, UpdateCompanyDto} from "@lulu/model";

export class CompanyValidation {
  static createCompanyDtoValidation(company: CreateCompanyDto) {
    if(!company.name)
      return 'company.validation.name-required'
    if(!company.email)
      return 'company.validation.email-required';
    if(!company.type)
      return 'company.validation.type-required'
    if (!company.phoneNumber)
      return 'company.validation.phoneNumber-required'
  }

  static updateCompanyDtoValidation(company: UpdateCompanyDto) {
    if(!company.name)
      return 'company.validation.name-required'
    if(!company.email)
      return 'company.validation.email-required';
    if(!company.type)
      return 'company.validation.type-required'
    if (!company.phoneNumber)
      return 'company.validation.phoneNumber-required'
  }
}
