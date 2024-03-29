import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {CreateCustomerDto, UpdateCustomerDto} from "@lulu/model";
import {ShopService} from "../shop/shop.service";
import {CustomerValidation} from "./validation/customer-validation";
import {CustomerResponse} from "./response/customer.response";
import {RoleService} from "../role/role.service";
import {PrismaService} from "@lulu/prisma";

@Injectable()
export class CustomerService {
  constructor(private readonly prismaService: PrismaService, private shopService: ShopService, private roleService: RoleService) {
  }

  async create(createCustomerDto: CreateCustomerDto) {
    const invalidMessage = CustomerValidation.createCustomerDtoValidation(createCustomerDto);
    if (invalidMessage)
      throw new BadRequestException(null, invalidMessage);

    const emailAvailableCount = await this.checkEmailUniquenessCountByEmailOrById(createCustomerDto.email);
    if (emailAvailableCount > 0)
      throw new BadRequestException(null, 'customer.error-message.duplicate-email');

    const findShopCount = await this.shopService.findShopCountById(createCustomerDto.shopId);
    if (findShopCount === 0)
      throw new NotFoundException(null, 'customer.error-message.not-found-shop');

    const findRoleCount = await this.roleService.findByRoleCountById(createCustomerDto.roleId);
    if(findRoleCount === 0)
      throw new NotFoundException(null, 'supplier.error-message.not-found-role');

    const customer = await this.prismaService.customer.create({
      data: {
        name: createCustomerDto.name,
        email: createCustomerDto.email,
        phoneNumber: createCustomerDto.phoneNumber,
        type: createCustomerDto.type,
        isActive: createCustomerDto.isActive,
        shop: {
          connect: {
            id: createCustomerDto.shopId
          }
        },
        role: {
          connect: {
            id: createCustomerDto.roleId
          }
        }
      }
    });
    return CustomerResponse.fromEntityToResponse(customer);
  }

  findAll() {
    return this.prismaService.customer.findMany();
  }

  async findOne(id: number) {
    const customer = await this.findCustomerById(id);
    if (!customer)
      throw new NotFoundException(null, 'customer.error-message.not-found-customer');

    return CustomerResponse.fromEntityToResponse(customer);
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    const findCustomerCount = await this.findCustomerCountById(id);
    if (findCustomerCount === 0)
      throw new NotFoundException(null, 'customer.error-message.not-found-customer');

    const invalidMessage = CustomerValidation.updateCustomerDtoValidation(updateCustomerDto);
    if (invalidMessage)
      throw new BadRequestException(null, invalidMessage);

    const emailAvailableCount = await this.checkEmailUniquenessCountByEmailOrById(updateCustomerDto.email, id);
    if (emailAvailableCount > 0)
      throw new BadRequestException(null, 'customer.error-message.duplicate-email');

    const findShopCount = await this.shopService.findShopCountById(updateCustomerDto.shopId);
    if (findShopCount === 0)
      throw new NotFoundException(null, 'customer.error-message.not-found-shop');

    const findRoleCount = await this.roleService.findByRoleCountById(updateCustomerDto.roleId);
    if(findRoleCount === 0)
      throw new NotFoundException(null, 'supplier.error-message.not-found-role');

    const customer = await this.prismaService.customer.update({
      where: {id},
      data: {
        name: updateCustomerDto.name,
        email: updateCustomerDto.email,
        phoneNumber: updateCustomerDto.phoneNumber,
        type: updateCustomerDto.type,
        isActive: updateCustomerDto.isActive,
        shop: {
          connect: {
            id: updateCustomerDto.shopId
          }
        },
        role: {
          connect: {
            id: updateCustomerDto.roleId
          }
        }
      }
    })
    return CustomerResponse.fromEntityToResponse(customer);
  }

  async customerActivation(id: number, isActive: boolean) {
    const findCustomerCount = await this.findCustomerCountById(id);
    if (findCustomerCount === 0)
      throw new NotFoundException(null, 'customer.error-message.not-found-customer');

    const customer = await this.prismaService.customer.update({where: {id}, data: {isActive}})
    return CustomerResponse.fromEntityToResponse(customer);
  }


  async checkEmailUniquenessCountByEmailOrById(email: string, id?: number) {
    if (id)
      return this.prismaService.customer.count({where: {email, NOT: [{id}]}});
    return this.prismaService.customer.count({where: {email}});
  }

  async findCustomerCountById(id: number) {
    return this.prismaService.customer.count({where: {id}});
  }

  async findCustomerById(id: number) {
    return this.prismaService.customer.findUnique({where: {id}});
  }
}
