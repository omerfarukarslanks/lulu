import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {CreateCustomerDto, UpdateCustomerDto} from "@lulu/model";
import {PrismaService} from "@lulu/service";
import {ShopService} from "../shop/shop.service";
import {CustomerValidation} from "./validation/customer-validation";
import {CustomerResponse} from "./response/customer.response";

@Injectable()
export class CustomerService {
  constructor(private readonly prismaService: PrismaService, private shopService: ShopService) {
  }

  async create(createCustomerDto: CreateCustomerDto) {
    const invalidMessage = CustomerValidation.createCustomerDtoValidation(createCustomerDto);
    if (invalidMessage)
      throw new BadRequestException(null, invalidMessage);

    const emailAvailableValues = await this.checkEmailUniqueness(createCustomerDto.email);
    if (emailAvailableValues?.length > 0)
      throw new BadRequestException(null, 'customer.error-message.duplicate-email');

    const findShop = await this.shopService.findOne(createCustomerDto.shopId);
    if (!findShop)
      throw new NotFoundException(null, 'customer.error-message.not-found-shop');

    const customer = await this.prismaService.customer.create({
      data: {
        name: createCustomerDto.name,
        email: createCustomerDto.email,
        phoneNumber: createCustomerDto.phoneNumber,
        type: createCustomerDto.type,
        roleIds: JSON.stringify(createCustomerDto.roleIds),
        isActive: createCustomerDto.isActive,
        shop: {
          connect: {
            id: createCustomerDto.shopId
          }
        }
      }
    })
    return CustomerResponse.fromDtoToEntity(customer);
  }

  findAll() {
    return this.prismaService.customer.findMany();
  }

  async findOne(id: number) {
    const customer = await this.prismaService.customer.findUnique({where: {id}});
    if (!customer)
      throw new NotFoundException(null, 'customer.error-message.not-found-customer');
    return CustomerResponse.fromDtoToEntity(customer);
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    const invalidMessage = CustomerValidation.updateCustomerDtoValidation(updateCustomerDto);
    if (invalidMessage)
      throw new BadRequestException(null, invalidMessage);

    const emailAvailableValues = await this.checkEmailUniqueness(updateCustomerDto.email, id);
    if (emailAvailableValues?.length > 0)
      throw new BadRequestException(null, 'customer.error-message.duplicate-email');

    const findCustomer = await this.prismaService.customer.findUnique({where: {id}});
    if (!findCustomer)
      throw new NotFoundException(null, 'customer.error-message.not-found-customer');

    const findShop = await this.shopService.findOne(updateCustomerDto.shopId);

    if (!findShop)
      throw new NotFoundException(null, 'customer.error-message.not-found-shop');

    const customer = await this.prismaService.customer.update({
      where: {id},
      data: {
        name: updateCustomerDto.name,
        email: updateCustomerDto.email,
        phoneNumber: updateCustomerDto.phoneNumber,
        type: updateCustomerDto.type,
        roleIds: JSON.stringify(updateCustomerDto.roleIds),
        isActive: updateCustomerDto.isActive,
        shop: {
          connect: {
            id: updateCustomerDto.shopId
          }
        }
      }
    })
    return CustomerResponse.fromDtoToEntity(customer);
  }

  async checkEmailUniqueness(email: string, id?: number) {
    if (id) {
      return this.prismaService.customer.findMany({where: {email, NOT: [{id}]}});
    } else {
      return this.prismaService.customer.findMany({where: {email}});
    }
  }

  async customerActivation(id: number, isActive: boolean) {
    const findCustomer = await this.prismaService.customer.findUnique({where: {id}});
    if (!findCustomer)
      throw new NotFoundException(null, 'customer.error-message.not-found-customer');

    const customer = await this.prismaService.customer.update({where: {id}, data: {isActive}})

    return CustomerResponse.fromDtoToEntity(customer);
  }
}
