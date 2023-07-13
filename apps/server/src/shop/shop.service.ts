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

    const isEmailAvailable = await this.checkEmailUniqueness(createShopDto.email);
    if (isEmailAvailable)
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
    const invalidShop = ShopValidation.updateShopDtoValidation(updateShopDto);

    if (invalidShop) {
      throw new BadRequestException(null, invalidShop);
    }

    const isEmailAvailable = await this.checkEmailUniqueness(updateShopDto.email);
    if (!isEmailAvailable && id !== isEmailAvailable.id)
      throw new BadRequestException(null, 'shop.error-message.duplicate-email');

    const company = await this.companyService.findOne(updateShopDto.companyId);
    if(!company) {
      throw new NotFoundException('shop.error-message.not-found-company')
    }
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

  checkEmailUniqueness(email: string) {
    return this.prismaService.shop.findUnique({where: {email}})
  }

  async shopActivation(id: number, isActive: boolean) {
    const shop = await this.prismaService.shop.update({where: {id}, data: {isActive}})
    return ShopResponse.fromToEntity(shop);
  }
}
