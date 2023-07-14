import {CreateSupplierDto, UpdateSupplierDto} from "@lulu/model";

export class SupplierValidation {
  static createDtoValidation(dto: CreateSupplierDto) {
    if(!dto.name)
      return 'supplier.validation.name-required';
    if(!dto.email)
      return 'supplier.validation.email-required';
    if(!dto.phoneNumber)
      return 'supplier.validation.phoneNumber-required';
    if(!dto.roleIds || dto.roleIds?.length === 0)
      return 'supplier.validation.roleIds-required';
    if(!dto.shopId)
      return 'supplier.validation.shopId-required';
  }

  static updateDtoValidation(dto: UpdateSupplierDto) {
    if(!dto.name)
      return 'supplier.validation.name-required';
    if(!dto.email)
      return 'supplier.validation.email-required';
    if(!dto.phoneNumber)
      return 'supplier.validation.phoneNumber-required';
    if(!dto.roleIds || dto.roleIds?.length === 0)
      return 'supplier.validation.roleIds-required';
    if(!dto.shopId)
      return 'supplier.validation.shopId-required';
  }
}
