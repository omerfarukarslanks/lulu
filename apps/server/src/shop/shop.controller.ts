import {
  Controller,
  Get,
  Post,
  Body,
  Param, ParseIntPipe, ParseBoolPipe, Put, UseGuards,
} from '@nestjs/common';
import { ShopService } from './shop.service';
import {CreateShopDto, RoleEnum, UpdateShopDto} from "@lulu/model";
import {HasRole} from "@lulu/decorator";
import {AuthGuard, RolesGuard} from "@lulu/guard";

@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}
  @HasRole([RoleEnum.ADMIN])
  @UseGuards(AuthGuard,RolesGuard)
  @Post()
  create(@Body() createShopDto: CreateShopDto) {
    return this.shopService.create(createShopDto);
  }
  @HasRole([RoleEnum.ADMIN])
  @UseGuards(AuthGuard,RolesGuard)
  @Get()
  findAll() {
    return this.shopService.findAll();
  }
  @HasRole([RoleEnum.ADMIN])
  @UseGuards(AuthGuard,RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shopService.findOne(+id);
  }
  @HasRole([RoleEnum.ADMIN])
  @UseGuards(AuthGuard,RolesGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateShopDto: UpdateShopDto) {
    return this.shopService.update(+id, updateShopDto);
  }
  @HasRole([RoleEnum.ADMIN])
  @UseGuards(AuthGuard,RolesGuard)
  @Post('activation/:id/:isActive')
  shopActivation(@Param('id', ParseIntPipe) id: number,
                    @Param('isActive', ParseBoolPipe) isActive: boolean) {
    return this.shopService.shopActivation(+id, isActive);
  }
}
