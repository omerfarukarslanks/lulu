import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from "@lulu/service";
import {RoleResponse} from "./response/role.response";
import {RoleValidation} from "./validation/role-validation";
import {CreateRoleDto, UpdateRoleDto} from "@lulu/model";
import {Role} from "./entities/role.entity";

@Injectable()
export class RoleService {
  constructor(private readonly prismaService: PrismaService) {
  }

  async create(createRoleDto: CreateRoleDto) {
    const invalidMessage = RoleValidation.createRoleValidation(createRoleDto);
    if (invalidMessage) {
      throw new BadRequestException(null, invalidMessage);
    }

    const findRole = await this.checkNameUniqueness(createRoleDto.name);
    if (findRole) {
      throw new BadRequestException(null, 'role.error-message.duplicate-name');
    }

    const role = await this.prismaService.role.create({
      data: {
        name: createRoleDto.name,
        permissions: JSON.stringify(createRoleDto.permissions),
        isActive: createRoleDto.isActive
      }
    });

    return RoleResponse.fromRoleEntity(role);
  }

  async findAll() {
    return this.prismaService.role.findMany();
  }

  async findOne(id: number) {
    const role = await this.prismaService.role.findUnique({where: {id}});
    if (!role)
      throw new NotFoundException('', 'role.error-message.not-found-role')
    return RoleResponse.fromRoleEntity(role)
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {

    const uniqueRole = await this.prismaService.role.findUnique({where: {id}});
    if (!uniqueRole)
      throw new NotFoundException('', 'role.error-message.not-found-role')


    const invalidMessage = RoleValidation.updateRoleValidation(updateRoleDto);
    if (invalidMessage) {
      throw new BadRequestException(null, invalidMessage);
    }

    const findRole = await this.checkNameUniqueness(updateRoleDto.name);
    if (findRole && findRole.id !== id) {
      throw new BadRequestException(null, 'role.error-message.duplicate-name');
    }

    const role = await this.prismaService.role.update({
      where: {id},
      data: {
        name: updateRoleDto.name,
        permissions: JSON.stringify(updateRoleDto.permissions),
        isActive: updateRoleDto.isActive
      }
    })
    return RoleResponse.fromRoleEntity(role);
  }

  async roleActivation(id: number, isActive: boolean) {
    const findRole = await this.prismaService.role.findUnique({where: {id}});
    if (!findRole)
      throw new NotFoundException('', 'role.error-message.not-found-role')

    const role = await this.prismaService.role.update({
      where: {id},
      data: {isActive}
    })
     return RoleResponse.fromRoleEntity(role);
  }

  checkNameUniqueness(name: string) {
    return this.prismaService.role.findUnique({where: {name}});
  }
}
