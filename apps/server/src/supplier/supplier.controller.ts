import {
  Controller,
  Get,
  Post,
  Body,
  Param, Put, ParseIntPipe, ParseBoolPipe,
} from '@nestjs/common';
import { SupplierService } from './supplier.service';
import {CreateSupplierDto, UpdateSupplierDto} from "@lulu/model";

@Controller('supplier')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  @Post()
  create(@Body() createSupplierDto: CreateSupplierDto) {
    return this.supplierService.create(createSupplierDto);
  }

  @Get()
  findAll() {
    return this.supplierService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.supplierService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateSupplierDto: UpdateSupplierDto
  ) {
    return this.supplierService.update(+id, updateSupplierDto);
  }

  @Put('activation/:id/:isActive')
  supplierActivation(@Param('id', ParseIntPipe) id: number,
                     @Param('isActive', ParseBoolPipe) isActive: boolean) {
    return this.supplierService.supplierActivation(id, isActive);
  }
}
