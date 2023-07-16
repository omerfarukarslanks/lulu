import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {CreateSupplierDto, UpdateSupplierDto} from "@lulu/model";
import {PrismaService} from "@lulu/service";
import {SupplierValidation} from "./validation/supplier-validation";
import {ShopService} from "../shop/shop.service";
import {SupplierResponse} from "./response/supplier.response";
import {RoleService} from "../role/role.service";

@Injectable()
export class SupplierService {

  constructor(private readonly prismaService: PrismaService, private shopService: ShopService, private roleService: RoleService) {
  }

  async create(createSupplierDto: CreateSupplierDto) {
    const invalidMessage = SupplierValidation.createDtoValidation(createSupplierDto);
    if (invalidMessage)
      throw new BadRequestException(null, invalidMessage);

    const emailAvailableCount = await this.checkEmailUniquenessCountByEmailOrById(createSupplierDto.email);
    if (emailAvailableCount > 0)
      throw new BadRequestException(null, 'supplier.error-message.duplicate-email');

    const findShopCount = await this.shopService.findShopCountById(createSupplierDto.shopId);
    if (!findShopCount)
      throw new NotFoundException(null, 'supplier.error-message.not-found-shop');

    const findRoleCount = await this.roleService.findByRoleCountById(createSupplierDto.roleId);
    if(findRoleCount === 0)
      throw new NotFoundException(null, 'supplier.error-message.not-found-role');

    const supplier = await this.prismaService.supplier.create({
      data: {
        name: createSupplierDto.name,
        email: createSupplierDto.email,
        phoneNumber: createSupplierDto.phoneNumber,
        isActive: createSupplierDto.isActive,
        shop: {
          connect: {
            id: createSupplierDto.shopId
          }
        },
        role: {
          connect: {
            id: createSupplierDto.roleId
          }
        }
      }
    });
    return SupplierResponse.fromEntityToResponse(supplier);
  }

  async findAll() {
    return this.prismaService.supplier.findMany();
  }

  async findOne(id: number) {
    const findSupplier = await this.findSupplierById(id);
    if (!findSupplier)
      throw new NotFoundException(null, 'supplier.error-message.not-found-supplier');

    return SupplierResponse.fromEntityToResponse(findSupplier);
  }

  async update(id: number, updateSupplierDto: UpdateSupplierDto) {
    const findSupplierCount = await this.findSupplierCountById(id);
    if (findSupplierCount === 0)
      throw new NotFoundException(null, 'supplier.error-message.not-found-supplier');

    const invalidMessage = SupplierValidation.updateDtoValidation(updateSupplierDto);
    if (invalidMessage)
      throw new BadRequestException(null, invalidMessage);

    const emailAvailableCount = await this.checkEmailUniquenessCountByEmailOrById(updateSupplierDto.email, id);
    if (emailAvailableCount > 0)
      throw new BadRequestException(null, 'supplier.error-message.duplicate-email');

    const findShopCount = await this.shopService.findShopCountById(updateSupplierDto.shopId);
    if (findShopCount === 0)
      throw new NotFoundException(null, 'supplier.error-message.not-found-shop');

    const findRoleCount = await this.roleService.findByRoleCountById(updateSupplierDto.roleId);
    if(findRoleCount === 0)
      throw new NotFoundException(null, 'supplier.error-message.not-found-role');

    const supplier = await this.prismaService.supplier.update({
      where: {id},
      data: {
        name: updateSupplierDto.name,
        email: updateSupplierDto.email,
        phoneNumber: updateSupplierDto.phoneNumber,
        isActive: updateSupplierDto.isActive,
        shop: {
          connect: {
            id: updateSupplierDto.shopId
          }
        },
        role: {
          connect: {
            id: updateSupplierDto.roleId
          }
        }
      }
    });
    return SupplierResponse.fromEntityToResponse(supplier);
  }

  async supplierActivation(id: number, isActive: boolean) {
    const findSupplierCount = await this.findSupplierCountById(id);
    if (findSupplierCount === 0 )
      throw new NotFoundException(null, 'supplier.error-message.not-found-supplier');

    const supplier = await this.prismaService.supplier.update({where: {id}, data: {isActive}});
    return SupplierResponse.fromEntityToResponse(supplier);
  }

  async checkEmailUniquenessCountByEmailOrById(email: string, id?: number) {
    if (id)
      return this.prismaService.supplier.count({where: {AND: [{email, NOT: [{id}]}]}})
    return this.prismaService.supplier.count({where: {email}});
  }

  async findSupplierCountById(id: number) {
    return this.prismaService.supplier.count({where: {id}});
  }

  async findSupplierById(id: number) {
    return this.prismaService.supplier.findUnique({where: {id}});
  }
}
