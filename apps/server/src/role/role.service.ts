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

    const findRoleCount = await this.checkNameUniquenessCountByNameOrById(createRoleDto.name);
    if (findRoleCount > 0) {
      throw new BadRequestException(null, 'role.error-message.duplicate-name');
    }

    const role = await this.prismaService.role.create({
      data: {
        name: createRoleDto.name,
        permissions: JSON.stringify(createRoleDto.permissions),
        isActive: createRoleDto.isActive
      }
    });

    return RoleResponse.fromEntityToResponse(role);
  }

  async findAll() {
    return this.prismaService.role.findMany();
  }

  async findOne(id: number) {
    const role = await this.findRoleById(id);
    if (!role)
      throw new NotFoundException('', 'role.error-message.not-found-role')
    return RoleResponse.fromEntityToResponse(role)
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const invalidMessage = RoleValidation.updateRoleValidation(updateRoleDto);
    if (invalidMessage) {
      throw new BadRequestException(null, invalidMessage);
    }

    const findRoleCount = await this.findByRoleCountById(id);
    if (findRoleCount === 0)
      throw new NotFoundException('', 'role.error-message.not-found-role')

    const nameAvailableCount = await this.checkNameUniquenessCountByNameOrById(updateRoleDto.name, id);
    if (nameAvailableCount > 0) {
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
    return RoleResponse.fromEntityToResponse(role);
  }

  async roleActivation(id: number, isActive: boolean) {
    const findRoleCount = await this.findByRoleCountById(id);
    if (findRoleCount === 0)
      throw new NotFoundException('', 'role.error-message.not-found-role')

    const role = await this.prismaService.role.update({
      where: {id},
      data: {isActive}
    })
    return RoleResponse.fromEntityToResponse(role);
  }

  checkNameUniquenessCountByNameOrById(name: string, id?: number) {
    if (id)
      return this.prismaService.role.count({where: {name, NOT: [{id}]}});
    return this.prismaService.role.count({where: {name}});
  }

  async findByRoleCountById(id: number) {
    return this.prismaService.role.count({where: {id}});
  }

  async findRoleById(id: number) {
    return this.prismaService.role.findUnique({where: {id}});
  }
}
