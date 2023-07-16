import {
  Controller,
  Get,
  Post,
  Body,
  Param, Put, ParseIntPipe, ParseBoolPipe, UseGuards,
} from '@nestjs/common';
import { RoleService } from './role.service';
import {CreateRoleDto, RoleEnum, UpdateRoleDto} from "@lulu/model";
import {HasRole} from "@lulu/decorator";
import {AuthGuard, RolesGuard} from "@lulu/guard";

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }
  @HasRole([RoleEnum.ADMIN])
  @UseGuards(AuthGuard,RolesGuard)
  @Get()
  findAll() {
    return this.roleService.findAll();
  }
  @HasRole([RoleEnum.ADMIN])
  @UseGuards(AuthGuard,RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(+id);
  }
  @HasRole([RoleEnum.ADMIN])
  @UseGuards(AuthGuard,RolesGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(+id, updateRoleDto);
  }
  @HasRole([RoleEnum.ADMIN])
  @UseGuards(AuthGuard,RolesGuard)
  @Post('activation/:id/:isActive')
  activation(@Param('id', ParseIntPipe) id: number,
             @Param('isActive', ParseBoolPipe) isActive: boolean) {
    return this.roleService.roleActivation(id, isActive);
  }
}
