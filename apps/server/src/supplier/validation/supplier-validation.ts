import {CreateSupplierDto, UpdateSupplierDto} from "@lulu/model";

export class SupplierValidation {
  static createDtoValidation(dto: CreateSupplierDto) {
    if(!dto.name)
      return 'supplier.validation.name-required';
    if(!dto.email)
      return 'supplier.validation.email-required';
    if(!dto.phoneNumber)
      return 'supplier.validation.phoneNumber-required';
    if(!dto.roleId)
      return 'supplier.validation.roleId-required';
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
    if(!dto.roleId)
      return 'supplier.validation.roleId-required';
    if(!dto.shopId)
      return 'supplier.validation.shopId-required';
  }
}
