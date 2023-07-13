import {CreateShopDto, UpdateShopDto} from "@lulu/model";

export class ShopValidation {
  static createShopDtoValidation(shop: CreateShopDto) {
    if(!shop.name)
      return 'shop.validation.name-required';
    if(!shop.email)
      return 'shop.validation.email-required';
    if(!shop.phoneNumber)
      return 'shop.validation.phoneNumber-required';
    if(!shop.companyId)
      return 'shop.validation.companyId-required'
  }

  static updateShopDtoValidation(shop: UpdateShopDto) {
    if(!shop.name)
      return 'shop.validation.name-required';
    if(!shop.email)
      return 'shop.validation.email-required';
    if(!shop.phoneNumber)
      return 'shop.validation.phoneNumber-required';
    if(!shop.companyId)
      return 'shop.validation.companyId-required'
  }
}
