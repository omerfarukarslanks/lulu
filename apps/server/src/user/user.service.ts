import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {UserResponse} from "./response/user-response";
import {BcryptService, PrismaService} from "@lulu/service";
import {CreateUserDto, UpdateUserDto} from "@lulu/model";
import {UserValidation} from "./validation/user-validation";
import {ShopService} from "../shop/shop.service";

@Injectable()
export class UserService {

  constructor(private readonly prismaService: PrismaService, private bcryptService: BcryptService, private shopService: ShopService) {
  }

  async create(createUserDto: CreateUserDto) {
    const invalidUser = UserValidation.createUserDtoValidation(createUserDto);
    if (invalidUser) {
      throw new BadRequestException(null, invalidUser);
    }

    const findShop = await this.shopService.findOne(createUserDto.shopId);
    if (!findShop) {
      throw new NotFoundException(null, 'user.error-message.not-found-shop');
    }

    const emailAvailableValues = await this.checkEmailUniqueness(createUserDto.email);
    if (emailAvailableValues?.length > 0)
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
    return this.prismaService.user.findMany();
  }

  async findOne(id: number) {
    const user = await this.prismaService.user.findUnique({
      where: {id}
    });
    if (!user) {
      throw new NotFoundException(null, 'user.error-message.not-found-user')
    }
    return UserResponse.fromUserEntity(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const invalidUser = UserValidation.updateUserDtoValidation(updateUserDto);
    if (invalidUser) {
      throw new BadRequestException(null, invalidUser);
    }

    const findUser = await this.prismaService.user.findUnique({
      where: {id}
    });
    if (!findUser) {
      throw new NotFoundException(null, 'user.error-message.not-found-user')
    }

    const findShop = await this.shopService.findOne(updateUserDto.shopId);
    if (!findShop) {
      throw new NotFoundException(null, 'user.error-message.not-found-shop');
    }

    const emailAvailableValues = await this.checkEmailUniqueness(updateUserDto.email, id);
    if (emailAvailableValues?.length > 0)
      throw new BadRequestException(null, 'user.error-message.duplicate-email');

    const user = await this.prismaService.user.update({
      where: {id},
      data: {
        name: updateUserDto.name,
        email: updateUserDto.email,
        phoneNumber: updateUserDto.phoneNumber,
        roleIds: JSON.stringify(updateUserDto.roleIds),
        password: updateUserDto.password,
        isActive: updateUserDto.isActive,
        shop: {connect: {id: updateUserDto.shopId}}
      }
    })
    return UserResponse.fromUserEntity(user);
  }

  async userActivation(id: number, isActive: boolean) {
    const findUser = await this.prismaService.user.findUnique({
      where: {id}
    });
    if (!findUser) {
      throw new NotFoundException(null, 'user.error-message.not-found-user')
    }

    const user = await this.prismaService.user.update({
      where: {id},
      data: {isActive}
    })

    return UserResponse.fromUserEntity(user);
  }

  async checkEmailUniqueness(email: string, id?: number) {
    if (id) {
      return this.prismaService.user.findMany({where: {email, NOT: [{id}]}})
    }
    return this.prismaService.user.findMany({
      where: {email}
    })
  }
}
