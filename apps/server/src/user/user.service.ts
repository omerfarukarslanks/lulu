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
    const invalidMessage = UserValidation.createUserDtoValidation(createUserDto);
    if (invalidMessage)
      throw new BadRequestException(null, invalidMessage);

    const findShopCount = await this.shopService.findShopCountById(createUserDto.shopId);
    if (findShopCount === 0)
      throw new NotFoundException(null, 'user.error-message.not-found-shop');

    const emailAvailableCount = await this.checkEmailUniquenessCountByEmailOrById(createUserDto.email);
    if (emailAvailableCount > 0)
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
    const user = await this.findUserById(id);
    if (!user)
      throw new NotFoundException(null, 'user.error-message.not-found-user')

    return UserResponse.fromUserEntity(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const invalidUser = UserValidation.updateUserDtoValidation(updateUserDto);
    if (invalidUser)
      throw new BadRequestException(null, invalidUser);

    const findUserCount = await this.findUserCountById(id);
    if (findUserCount === 0)
      throw new NotFoundException(null, 'user.error-message.not-found-user')


    const findShopCount = await this.shopService.findShopCountById(updateUserDto.shopId);
    if (findShopCount === 0)
      throw new NotFoundException(null, 'user.error-message.not-found-shop');

    const emailAvailableCount = await this.checkEmailUniquenessCountByEmailOrById(updateUserDto.email, id);
    if (emailAvailableCount > 0)
      throw new BadRequestException(null, 'user.error-message.duplicate-email');

    const user = await this.prismaService.user.update({
      where: {id},
      data: {
        name: updateUserDto.name,
        email: updateUserDto.email,
        phoneNumber: updateUserDto.phoneNumber,
        roleIds: JSON.stringify(updateUserDto.roleIds),
        password: await this.bcryptService.hash(updateUserDto.password),
        isActive: updateUserDto.isActive,
        shop: {connect: {id: updateUserDto.shopId}}
      }
    })
    return UserResponse.fromUserEntity(user);
  }

  async userActivation(id: number, isActive: boolean) {
    const findUserCount = await this.findUserCountById(id);
    if (findUserCount === 0)
      throw new NotFoundException(null, 'user.error-message.not-found-user')

    const user = await this.prismaService.user.update({
      where: {id},
      data: {isActive}
    })

    return UserResponse.fromUserEntity(user);
  }

  async checkEmailUniquenessCountByEmailOrById(email: string, id?: number) {
    if (id)
      return this.prismaService.user.count({where: {email, NOT: [{id}]}})
    return this.prismaService.user.count({
      where: {email}
    })
  }

  async findUserCountById(id: number) {
    return this.prismaService.user.count({where: {id}});
  }

  async findUserById(id: number) {
    return this.prismaService.user.findUnique({where: {id}});
  }

  async findUserByEmail(email: string) {
    return this.prismaService.user.findUnique({where: {email}});
  }
}
