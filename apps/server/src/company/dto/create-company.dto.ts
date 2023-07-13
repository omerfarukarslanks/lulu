import {CompanyType} from "@prisma/client";

export class CreateCompanyDto {
  name: string;
  email: string;
  phoneNumber: string;
  isActive?: boolean;
  type: CompanyType;

  nameValidation = () => {
    return !!this.name
  }
  emailValidation = () => {
    return !!this.email
  }
  typeValidation = () => {
    return !!this.type
  }

  phoneNumberValidation = () => {
    return !!this.phoneNumber
  }

  validation = () => {
    if(!this.nameValidation())
      return 'company.validation.name-required';
    if(!this.emailValidation()) {
      return 'company.validation.email-required';
    }
    if(!this.typeValidation())
      return 'company.validation.type-required'
    if(!this.phoneNumberValidation())
      return 'company.validation.phoneNumber-required'
  }

}

