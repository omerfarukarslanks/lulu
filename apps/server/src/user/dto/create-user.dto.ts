import {IsEmail, IsNotEmpty, IsNumber} from "class-validator";

export class CreateUserDto {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  shopId: number;
  roleIds: Array<number>;
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

  passwordValidation = () => {
    return !!this.password
  }

  shopIdValidation = () => {
    return !!this.shopId
  }

  roleIdsValidation = () => {
    return !!this.roleIds
  }

  validation() {
    if (!this.nameValidation())
      return 'user.validation.name-required';
    if (!this.emailValidation())
      return 'user.validation.email-required';
    if (!this.phoneNumberValidation())
      return 'user.validation.phoneNumber-required';
    if (!this.passwordValidation())
      return 'user.validation.password-required';
    if (!this.shopIdValidation())
      return 'user.validation.shopId-required';
    if (!this.roleIdsValidation())
      return 'user.validation.roleIds-required';
  }
}
