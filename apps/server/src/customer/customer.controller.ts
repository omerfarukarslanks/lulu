import {Body, Controller, Get, Param, ParseBoolPipe, ParseIntPipe, Post, Put, UseGuards,} from '@nestjs/common';
import {CustomerService} from './customer.service';
import {CreateCustomerDto, RoleEnum, UpdateCustomerDto} from "@lulu/model";
import {AuthGuard, RolesGuard} from "@lulu/guard";
import {HasRole} from "@lulu/decorator";

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @HasRole([RoleEnum.ADMIN])
  @UseGuards(AuthGuard,RolesGuard)
  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.create(createCustomerDto);
  }
  @HasRole([RoleEnum.ADMIN])
  @UseGuards(AuthGuard,RolesGuard)
  @Get()
  findAll() {
    return this.customerService.findAll();
  }
  @HasRole([RoleEnum.ADMIN])
  @UseGuards(AuthGuard,RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerService.findOne(+id);
  }
  @HasRole([RoleEnum.ADMIN])
  @UseGuards(AuthGuard,RolesGuard)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto
  ) {
    return this.customerService.update(+id, updateCustomerDto);
  }
  @HasRole([RoleEnum.ADMIN])
  @UseGuards(AuthGuard,RolesGuard)
  @Put('activation/:id/:isActive')
  customerActivation(@Param('id', ParseIntPipe) id: number,
                     @Param('isActive', ParseBoolPipe) isActive: boolean){
    return this.customerService.customerActivation(id, isActive);
  }
}
