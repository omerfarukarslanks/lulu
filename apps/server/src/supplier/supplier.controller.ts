import {
  Controller,
  Get,
  Post,
  Body,
  Param, Put, ParseIntPipe, ParseBoolPipe, UseGuards,
} from '@nestjs/common';
import { SupplierService } from './supplier.service';
import {CreateSupplierDto, RoleEnum, UpdateSupplierDto} from "@lulu/model";
import {HasRole} from "@lulu/decorator";
import {AuthGuard, RolesGuard} from "@lulu/guard";

@Controller('supplier')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}
  @HasRole(RoleEnum.ADMIN)
  @UseGuards(AuthGuard,RolesGuard)
  @Post()
  create(@Body() createSupplierDto: CreateSupplierDto) {
    return this.supplierService.create(createSupplierDto);
  }
  @HasRole(RoleEnum.ADMIN)
  @UseGuards(AuthGuard,RolesGuard)
  @Get()
  findAll() {
    return this.supplierService.findAll();
  }
  @HasRole(RoleEnum.ADMIN)
  @UseGuards(AuthGuard,RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.supplierService.findOne(+id);
  }
  @HasRole(RoleEnum.ADMIN)
  @UseGuards(AuthGuard,RolesGuard)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateSupplierDto: UpdateSupplierDto
  ) {
    return this.supplierService.update(+id, updateSupplierDto);
  }
  @HasRole(RoleEnum.ADMIN)
  @UseGuards(AuthGuard,RolesGuard)
  @Put('activation/:id/:isActive')
  supplierActivation(@Param('id', ParseIntPipe) id: number,
                     @Param('isActive', ParseBoolPipe) isActive: boolean) {
    return this.supplierService.supplierActivation(id, isActive);
  }
}
