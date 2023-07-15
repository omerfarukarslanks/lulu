import {CreateUserDto, UpdateUserDto} from "@lulu/model";

export class UserValidation {
  static createUserDtoValidation(user: CreateUserDto) {
    if(!user.name)
      return 'user.validation.name-required';
    if(!user.email)
      return 'user.validation.email-required';
    if(!user.phoneNumber)
      return 'user.validation.phoneNumber-required';
    if(!user.password)
      return 'user.validation.password-required';
    if(!user.shopId)
      return 'user.validation.shopId-required';
    if(!user.roleId) {
      return 'user.validation.roleId-required'
    }
  }

  static updateUserDtoValidation(user: UpdateUserDto) {
    if(!user.name)
      return 'user.validation.name-required';
    if(!user.email)
      return 'user.validation.email-required';
    if(!user.phoneNumber)
      return 'user.validation.phoneNumber-required';
    if(!user.password)
      return 'user.validation.password-required';
    if(!user.shopId)
      return 'user.validation.shopId-required';
    if(!user.roleId) {
      return 'user.validation.roleId-required'
    }
  }
}
