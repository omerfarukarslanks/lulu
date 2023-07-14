import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from "@lulu/service";
import {ShopResponse} from "./response/shop.response";
import {CreateShopDto, UpdateShopDto} from "@lulu/model";
import {ShopValidation} from "./validation/shop-validation";
import {CompanyService} from "../company/company.service";

@Injectable()
export class ShopService {

  constructor(private readonly prismaService: PrismaService, private companyService: CompanyService) {
  }

  async create(createShopDto: CreateShopDto) {
    const invalidShop = ShopValidation.createShopDtoValidation(createShopDto);

    if (invalidShop) {
      throw new BadRequestException(null, invalidShop);
    }

    const emailAvailableValues = await this.checkEmailUniqueness(createShopDto.email);
    if (emailAvailableValues?.length > 0)
      throw new BadRequestException(null, 'shop.error-message.duplicate-email');

    const shop = await this.prismaService.shop.create({
      data: {
        email: createShopDto.email,
        name: createShopDto.name,
        phoneNumber: createShopDto.phoneNumber,
        isActive: createShopDto.isActive,
        company: {
          connect: {
            id: createShopDto.companyId
          }
        }
      },
    })
    return ShopResponse.fromToEntity(shop);
  }

  async findAll() {
    return this.prismaService.shop.findMany();
  }

  async findOne(id: number) {
    const shop = await this.prismaService.shop.findUnique({where: {id}})
    if (!shop) {
      throw new NotFoundException(null, 'shop.error-message.not-found-shop')
    }
    return ShopResponse.fromToEntity(shop);
  }

  async update(id: number, updateShopDto: UpdateShopDto) {

    const invalidMessage = ShopValidation.updateShopDtoValidation(updateShopDto);
    if (invalidMessage) {
      throw new BadRequestException(null, invalidMessage);
    }

    const findShop = await this.prismaService.shop.findUnique({where: {id}})
    if (!findShop) {
      throw new NotFoundException(null, 'shop.error-message.not-found-shop')
    }

    const company = await this.companyService.findOne(updateShopDto.companyId);
    if (!company) {
      throw new NotFoundException('shop.error-message.not-found-company')
    }

    const emailAvailableValues = await this.checkEmailUniqueness(updateShopDto.email,id);
    if (emailAvailableValues?.length > 0)
      throw new BadRequestException(null, 'shop.error-message.duplicate-email');


    const shop = await this.prismaService.shop.update({
      where: {id},
      data: {
        name: updateShopDto.name,
        email: updateShopDto.email,
        phoneNumber: updateShopDto.phoneNumber,
        isActive: updateShopDto.isActive,
        company: {
          connect: {id: updateShopDto.companyId}
        }
      }
    })
    return ShopResponse.fromToEntity(shop);
  }

  async checkEmailUniqueness(email: string, id?: number) {
    if (id) {
      return this.prismaService.shop.findMany({where: {AND: [{email, NOT: [{id}]}]}})
    }
    return this.prismaService.shop.findMany({where: {email}})
  }

  async shopActivation(id: number, isActive: boolean) {
    const findShop = await this.prismaService.shop.findUnique({where: {id}})
    if (!findShop) {
      throw new NotFoundException(null, 'shop.error-message.not-found-shop')
    }
    const shop = await this.prismaService.shop.update({where: {id}, data: {isActive}})
    return ShopResponse.fromToEntity(shop);
  }
}
