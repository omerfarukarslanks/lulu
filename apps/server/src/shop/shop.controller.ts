import {
  Controller,
  Get,
  Post,
  Body,
  Param,ParseIntPipe, ParseBoolPipe, Put,
} from '@nestjs/common';
import { ShopService } from './shop.service';
import {CreateShopDto, UpdateShopDto} from "@lulu/model";

@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Post()
  create(@Body() createShopDto: CreateShopDto) {
    return this.shopService.create(createShopDto);
  }

  @Get()
  findAll() {
    return this.shopService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shopService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateShopDto: UpdateShopDto) {
    return this.shopService.update(+id, updateShopDto);
  }

  @Post('activation/:id/:isActive')
  shopActivation(@Param('id', ParseIntPipe) id: number,
                    @Param('isActive', ParseBoolPipe) isActive: boolean) {
    return this.shopService.shopActivation(+id, isActive);
  }
}
