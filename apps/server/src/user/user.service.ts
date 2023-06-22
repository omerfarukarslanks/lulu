import {BadRequestException, Injectable} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {BcryptService, PrismaService} from "@translations-config/service";
import {UserResponse} from "./response/user-response";

@Injectable()
export class UserService {

  constructor(private readonly prismaService: PrismaService, private bcryptService: BcryptService) {
  }
  async create(createUserDto: CreateUserDto) {
    const isEmailAvailable = await this.checkEmailUniqueness(createUserDto.email);
    if (isEmailAvailable)
      throw new BadRequestException(null, 'Email is available');

    const createUser = await this.prismaService.user.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
        password: await this.bcryptService.hash(createUserDto.password),
        phoneNumber: createUserDto.phoneNumber
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
    const user = await this.prismaService.user.update({
      where: {id},
      data: {name: updateUserDto.name, email: updateUserDto.email, phoneNumber: updateUserDto.phoneNumber}
    })
    return UserResponse.fromUserEntity(user);
  }

  async remove(id: number) {
    return this.prismaService.user.delete({where: {id}});
  }

  async checkEmailUniqueness(email: string) {
    return this.prismaService.user.findUnique({
      where: {email}
    })
  }
}
