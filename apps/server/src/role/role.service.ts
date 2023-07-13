import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import {PrismaService} from "@lulu/service";
import {RoleResponse} from "./response/role.response";

@Injectable()
export class RoleService {
  constructor(private readonly prismaService: PrismaService) {
  }
  async create(createRoleDto: CreateRoleDto) {
     const role = await this.prismaService.role.create({
       data: {
         name: createRoleDto.name,
         permissions: JSON.stringify(createRoleDto.permissions),
         isActive: createRoleDto.isActive
       }
    });

    return RoleResponse.fromRoleEntity(role);
  }

  findAll() {
    return `This action returns all role`;
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
