import {BadRequestException, Injectable} from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import {PrismaService} from "@translations-config/service";
import {CustomerResponse} from "./response/customer-response";

@Injectable()
export class CustomerService {

  constructor(private readonly prismaService: PrismaService) {
  }
  async create(createCustomerDto: CreateCustomerDto) {
    const isEmailAvailable = await this.isEmailAvailable(createCustomerDto.email);
    if (isEmailAvailable)
      throw new BadRequestException(null, 'Email is available');

    const createCustomer = await this.prismaService.customer.create({
      data: {
        name: createCustomerDto.name,
        email: createCustomerDto.email,
        password: createCustomerDto.password,
        phoneNumber: createCustomerDto.phoneNumber
      }
    });

    return CustomerResponse.fromUserEntity(createCustomer);
  }

  async findAll() {
    return await this.prismaService.customer.findMany();
  }

  async findOne(id: number) {
    return this.prismaService.customer.findUnique({
      where: {id}
    });
  }

  async findByEmail(email: string) {
    return this.prismaService.customer.findUnique({
      where: {email}
    });
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return `This action updates a #${id} customer`;
  }

  async remove(id: number) {
    return this.prismaService.customer.delete({where: {id}});
  }

  isEmailAvailable(email: string) {
    return this.prismaService.customer.findUnique({
      where: {email},
      select: {email: true}
    })
  }
}
