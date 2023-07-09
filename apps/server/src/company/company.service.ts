import {BadRequestException, Injectable} from '@nestjs/common';
import {CreateCompanyDto} from './dto/create-company.dto';
import {UpdateCompanyDto} from './dto/update-company.dto';
import {CompanyResponse} from "./response/company.response";
import {PrismaService} from "@lulu/service";
import {UserService} from "../user/user.service";

@Injectable()
export class CompanyService {
  constructor(private readonly prismaService: PrismaService) {
  }

  async create(createCompanyDto: CreateCompanyDto) {
    const isEmailAvailable = await this.checkEmailUniqueness(createCompanyDto.email);

    if (isEmailAvailable)
      throw new BadRequestException(null, 'Email is available');

    const company = await this.prismaService.company.create({
      data: {
        email: createCompanyDto.email,
        name: createCompanyDto.name
      }
    })
    return CompanyResponse.fromCompanyToEntity(company);
  }

  async findAll() {
    return this.prismaService.company.findMany();
  }

  async findOne(id: number) {
    return this.prismaService.company.findUnique({where: {id}});
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto) {
    const company = await this.prismaService.company.update({
      where: {
        id
      },
      data: {
        email: updateCompanyDto.email,
        name: updateCompanyDto.name
      }
    })
    return CompanyResponse.fromCompanyToEntity(company);
  }

   async remove(id: number) {
    const deleteUsers = this.removeUserByCompanyId(id);
    const deleteCompany =  this.prismaService.company.delete({where: {id}});
     return await this.prismaService.$transaction([deleteUsers, deleteCompany]);
  }

  checkEmailUniqueness(email: string) {
    return this.prismaService.company.findUnique({where: {email}})
  }

  findById(id: number) {
    return this.prismaService.company.findFirst({where: {id}});
  }

  removeUserByCompanyId(id: number) {
    return this.prismaService.user.deleteMany({where: {companyId: id}})
  }
}
