import {
  Controller,
  Get,
  Post,
  Body,
  Param, Put, ParseIntPipe, ParseBoolPipe,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import {CreateCustomerDto, UpdateCustomerDto} from "@lulu/model";

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.create(createCustomerDto);
  }

  @Get()
  findAll() {
    return this.customerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto
  ) {
    return this.customerService.update(+id, updateCustomerDto);
  }

  @Put('activation/:id/:isActive')
  customerActivation(@Param('id', ParseIntPipe) id: number,
                     @Param('isActive', ParseBoolPipe) isActive: boolean){
    return this.customerService.customerActivation(id, isActive);
  }
}
