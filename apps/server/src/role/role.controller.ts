import {
  Controller,
  Get,
  Post,
  Body,
  Param, Put, ParseIntPipe, ParseBoolPipe,
} from '@nestjs/common';
import { RoleService } from './role.service';
import {CreateRoleDto, UpdateRoleDto} from "@lulu/model";

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Get()
  findAll() {
    return this.roleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(+id, updateRoleDto);
  }

  @Post('activation/:id/:isActive')
  activation(@Param('id', ParseIntPipe) id: number,
             @Param('isActive', ParseBoolPipe) isActive: boolean) {
    return this.roleService.roleActivation(id, isActive);
  }
}
