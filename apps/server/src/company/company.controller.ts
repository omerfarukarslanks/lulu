import {
  Controller,
  Get,
  Post,
  Body,
  Param, Put, ParseIntPipe, ParseBoolPipe,
} from '@nestjs/common';
import {CompanyService} from './company.service';
import {CreateCompanyDto, UpdateCompanyDto} from "@lulu/model";

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {
  }

  @Post()
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.create(createCompanyDto);
  }

  @Get()
  findAll() {
    return this.companyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companyService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companyService.update(+id, updateCompanyDto);
  }

  @Post('activation/:id/:isActive')
  companyActivation(@Param('id', ParseIntPipe) id: number,
                    @Param('isActive', ParseBoolPipe) isActive: boolean) {
    return this.companyService.companyActivation(+id, isActive);
  }
}
