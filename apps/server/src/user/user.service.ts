import {BadRequestException, Injectable} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {UserResponse} from "./response/user-response";
import {CompanyService} from "../company/company.service";
import {BcryptService, PrismaService} from "@lulu/service";

@Injectable()
export class UserService {

  constructor(private readonly prismaService: PrismaService, private bcryptService: BcryptService, private companyService: CompanyService) {
  }
  async create(createUserDto: CreateUserDto) {
    const invalidUser = createUserDto.validation();
    if(invalidUser) {
      throw new BadRequestException(null, invalidUser);
    }
    const isEmailUnique = await this.checkEmailUniqueness(createUserDto.email);
    if (isEmailUnique)
      throw new BadRequestException(null, 'user.error-message.duplicate-email');

    const createUser = await this.prismaService.user.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
        password: await this.bcryptService.hash(createUserDto.password),
        phoneNumber: createUserDto.phoneNumber,
        roleIds: JSON.stringify(createUserDto.roleIds),
        isActive: createUserDto.isActive,
        shop: {
          connect: {
            id: createUserDto.shopId
          }
        }
      }
    });

    return UserResponse.fromUserEntity(createUser);
  }

  async findAll() {
    return  this.prismaService.user.findMany();
  }

  async findOne(id: number) {
    const user = await this.prismaService.user.findUnique({
      where: {id}
    });
    return UserResponse.fromUserEntity(user);
  }
  async update(id: number, updateUserDto: UpdateUserDto) {
    const invalidUser = updateUserDto.validation();
    if(invalidUser) {
      throw new BadRequestException(null, invalidUser);
    }
    const isEmailUnique = await this.checkEmailUniqueness(updateUserDto.email);
    if (isEmailUnique)
      throw new BadRequestException(null, 'user.error-message.duplicate-email');

    const user = await this.prismaService.user.update({
      where: {id},
      data: {name: updateUserDto.name, email: updateUserDto.email, phoneNumber: updateUserDto.phoneNumber}
    })
    return UserResponse.fromUserEntity(user);
  }

  async userActivation(id: number, isActive: boolean) {
    const user = await this.prismaService.user.update({
      where: {id},
      data: {isActive}
    })

    return UserResponse.fromUserEntity(user);
  }

  async checkEmailUniqueness(email: string) {
    return this.prismaService.user.findUnique({
      where: {email}
    })
  }
}
