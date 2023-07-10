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

  validation = () => {
    if(!this.nameValidation())
      return 'company.validation.name';
    if(!this.emailValidation()) {
      return 'company.validation.email';
    }
    if(!this.typeValidation())
      return 'company.validation.type'
  }

}

