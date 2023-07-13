export class CreateShopDto {
  name: string;
  email: string;
  phoneNumber: string;
  companyId: number;
  isActive: boolean;

  nameValidation = () => {
    return !!this.name
  }
  emailValidation = () => {
    return !!this.email
  }
  phoneNumberValidation = () => {
    return !!this.phoneNumber
  }

  companyIdValidation = () => {
    return !!this.companyId
  }

  validation = () => {
    if(!this.nameValidation())
      return 'shop.validation.name-required';
    if(!this.emailValidation()) {
      return 'shop.validation.email-required';
    }
    if(!this.phoneNumberValidation())
      return 'shop.validation.phoneNumber-required'
    if(!this.companyIdValidation())
      return 'shop.validation.companyId-required'
  }
}
