import {BadRequestException, Injectable} from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import {PrismaService} from "@translations-config/service";
import {CompanyResponse} from "./response/company.response";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class CompanyService {
  constructor(private readonly prismaService: PrismaService) {
  }
  async create(createCompanyDto: CreateCompanyDto) {
    const isEmailAvailable = await this.checkEmailUniqueness(createCompanyDto.email);

    if(isEmailAvailable)
      throw new BadRequestException(null, 'Email is available');

    const company = await this.prismaService.company.create({data: {email: createCompanyDto.email, name: createCompanyDto.name}})
    return CompanyResponse.formCompanyToEntity(company);
  }

  findAll() {
    return `This action returns all company`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} company`;
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return `This action updates a #${id} company`;
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }

  checkEmailUniqueness(email: string) {
    return this.prismaService.company.findUnique({where: {email}})
  }

  findById(id: number) {
    return this.prismaService.company.findFirst({where: {id}});
  }
}
