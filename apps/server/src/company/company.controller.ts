import {
  Controller,
  Get,
  Post,
  Body,
  Param, Put, ParseIntPipe, ParseBoolPipe, UseGuards,
} from '@nestjs/common';
import {CompanyService} from './company.service';
import {CreateCompanyDto, RoleEnum, UpdateCompanyDto} from "@lulu/model";
import {HasRole} from "@lulu/decorator";
import {AuthGuard, RolesGuard} from "@lulu/guard";

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {
  }
  @HasRole([RoleEnum.ADMIN])
  @UseGuards(AuthGuard,RolesGuard)
  @Post()
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.create(createCompanyDto);
  }
  @HasRole([RoleEnum.ADMIN])
  @UseGuards(AuthGuard,RolesGuard)
  @Get()
  findAll() {
    return this.companyService.findAll();
  }
  @HasRole([RoleEnum.ADMIN])
  @UseGuards(AuthGuard,RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companyService.findOne(+id);
  }
  @HasRole([RoleEnum.ADMIN])
  @UseGuards(AuthGuard,RolesGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companyService.update(+id, updateCompanyDto);
  }
  @HasRole([RoleEnum.ADMIN])
  @UseGuards(AuthGuard,RolesGuard)
  @Post('activation/:id/:isActive')
  companyActivation(@Param('id', ParseIntPipe) id: number,
                    @Param('isActive', ParseBoolPipe) isActive: boolean) {
    return this.companyService.companyActivation(+id, isActive);
  }
}
