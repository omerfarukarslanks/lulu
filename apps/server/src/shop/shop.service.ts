import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {ShopResponse} from "./response/shop.response";
import {CreateShopDto, UpdateShopDto} from "@lulu/model";
import {ShopValidation} from "./validation/shop-validation";
import {CompanyService} from "../company/company.service";
import {PrismaService} from "@lulu/prisma";

@Injectable()
export class ShopService {

  constructor(private readonly prismaService: PrismaService, private companyService: CompanyService) {
  }

  async create(createShopDto: CreateShopDto) {
    const invalidShop = ShopValidation.createShopDtoValidation(createShopDto);
    if (invalidShop)
      throw new BadRequestException(null, invalidShop);

    const emailAvailableCount = await this.checkEmailUniquenessCountByEmailOrById(createShopDto.email);
    if (emailAvailableCount > 0)
      throw new BadRequestException(null, 'shop.error-message.duplicate-email');

    const companyCount = await this.companyService.findCompanyCountById(createShopDto.companyId);
    if (companyCount === 0)
      throw new NotFoundException('', 'shop.error-message.not-found-company')

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
    return ShopResponse.fromEntityToResponse(shop);
  }

  async findAll() {
    return this.prismaService.shop.findMany();
  }

  async findOne(id: number) {
    const shop = await this.findShopById(id);
    if (!shop)
      throw new NotFoundException(null, 'shop.error-message.not-found-shop')

    return ShopResponse.fromEntityToResponse(shop);
  }

  async update(id: number, updateShopDto: UpdateShopDto) {

    const invalidMessage = ShopValidation.updateShopDtoValidation(updateShopDto);
    if (invalidMessage)
      throw new BadRequestException(null, invalidMessage);

    const findShopCount = await this.findShopCountById(id);
    if (findShopCount === 0)
      throw new NotFoundException(null, 'shop.error-message.not-found-shop')

    const companyCount = await this.companyService.findCompanyCountById(updateShopDto.companyId);
    if (companyCount === 0)
      throw new NotFoundException('shop.error-message.not-found-company')

    const emailAvailableCount = await this.checkEmailUniquenessCountByEmailOrById(updateShopDto.email, id);
    if (emailAvailableCount > 0)
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
    return ShopResponse.fromEntityToResponse(shop);
  }

  async shopActivation(id: number, isActive: boolean) {
    const findShopCount = await this.findShopCountById(id);
    if (findShopCount === 0)
      throw new NotFoundException(null, 'shop.error-message.not-found-shop')

    const shop = await this.prismaService.shop.update({where: {id}, data: {isActive}})
    return ShopResponse.fromEntityToResponse(shop);
  }


  async checkEmailUniquenessCountByEmailOrById(email: string, id?: number) {
    if (id)
      return this.prismaService.shop.count({where: {AND: [{email, NOT: [{id}]}]}});
    return this.prismaService.shop.count({where: {email}});
  }

  async findShopCountById(id: number) {
    return this.prismaService.shop.count({where: {id}});
  }

  async findShopById(id: number) {
    return this.prismaService.shop.findUnique({where: {id}});
  }
}
