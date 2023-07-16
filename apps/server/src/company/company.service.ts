import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {CompanyResponse} from "./response/company.response";
import {PrismaService} from "@lulu/service";
import {CreateCompanyDto, UpdateCompanyDto} from "@lulu/model";
import {CompanyValidation} from "./validation/company-validation";

@Injectable()
export class CompanyService {
  constructor(private readonly prismaService: PrismaService) {
  }

  async create(createCompanyDto: CreateCompanyDto) {
    const invalidCompany = CompanyValidation.createCompanyDtoValidation(createCompanyDto);
    if (invalidCompany)
      throw new BadRequestException(null, invalidCompany);

    const emailAvailableCount = await this.checkEmailUniquenessCountByEmailOrById(createCompanyDto.email);
    if (emailAvailableCount > 0)
      throw new BadRequestException(null, 'company.error-message.duplicate-email');

    const company = await this.prismaService.company.create({
      data: {
        email: createCompanyDto.email,
        name: createCompanyDto.name,
        isActive: createCompanyDto.isActive,
        phoneNumber: createCompanyDto.phoneNumber,
        type: createCompanyDto.type
      }
    })
    return CompanyResponse.fromEntityToResponse(company);
  }

  async findAll() {
    return this.prismaService.company.findMany();
  }

  async findOne(id: number) {
    const company = await this.findCompanyById(id);
    if (!company)
      throw new NotFoundException('', 'company.error-message.not-found-company')

    return CompanyResponse.fromEntityToResponse(company);
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto) {
    const invalidCompany = CompanyValidation.updateCompanyDtoValidation(updateCompanyDto);
    if (invalidCompany)
      throw new BadRequestException(null, invalidCompany);

    const emailAvailableCount = await this.checkEmailUniquenessCountByEmailOrById(updateCompanyDto.email, id);
    if (emailAvailableCount > 0)
      throw new BadRequestException(null, 'company.error-message.duplicate-email');

    const companyCount = await this.findCompanyCountById(id);
    if (companyCount === 0) {
      throw new NotFoundException('', 'company.error-message.not-found-company')
    }

    const company = await this.prismaService.company.update({
      where: {
        id
      },
      data: {
        email: updateCompanyDto.email,
        name: updateCompanyDto.name,
        phoneNumber: updateCompanyDto.phoneNumber,
        type: updateCompanyDto.type,
        isActive: updateCompanyDto.isActive
      }
    })
    return CompanyResponse.fromEntityToResponse(company);
  }

  async companyActivation(id: number, isActive: boolean) {
    const companyCount = await this.findCompanyCountById(id);
    if (companyCount === 0)
      throw new NotFoundException('', 'company.error-message.not-found-company')

    const company = await this.prismaService.company.update({where: {id}, data: {isActive}})
    return CompanyResponse.fromEntityToResponse(company);
  }

  async checkEmailUniquenessCountByEmailOrById(email: string, id?: number) {
    if (id)
      return this.prismaService.company.count({where: {AND: {email, NOT: {id}}}});
    return this.prismaService.company.count({where: {email}});
  }

  async findCompanyCountById(id: number) {
    return this.prismaService.company.count({where: {id}});
  }

  async findCompanyById(id: number) {
    return this.prismaService.company.findUnique({where: {id}});
  }
}
