import {CreateCustomerDto, UpdateCustomerDto} from "@lulu/model";

export class CustomerValidation {
  static createCustomerDtoValidation(customer: CreateCustomerDto) {
    if(!customer.name)
      return 'customer.validation.name-required';
    if(!customer.email)
      return 'customer.validation.email-required';
    if(!customer.phoneNumber)
      return 'customer.validation.phoneNumber-required';
    if(!customer.type)
      return 'customer.validation.type-required';
    if(!customer.shopId)
      return 'customer.validation.shopId-required';
    if(!customer.roleIds)
      return 'customer.validation.roleIds-required';
  }

  static updateCustomerDtoValidation(customer: UpdateCustomerDto) {
    if(!customer.name)
      return 'customer.validation.name-required';
    if(!customer.email)
      return 'customer.validation.email-required';
    if(!customer.phoneNumber)
      return 'customer.validation.phoneNumber-required';
    if(!customer.type)
      return 'customer.validation.type-required';
    if(!customer.shopId)
      return 'customer.validation.shopId-required';
    if(!customer.roleIds)
      return 'customer.validation.roleIds-required';
  }
}
