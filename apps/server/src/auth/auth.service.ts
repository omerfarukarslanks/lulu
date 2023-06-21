import {Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {CustomerService} from "../customer/customer.service";
import {JwtService} from "@nestjs/jwt";
import {LoginDto} from "./dto/login.dto";

@Injectable()
export class AuthService {
  constructor(private customerService: CustomerService,
              private jwtService: JwtService) {
  }

  async login(customer: LoginDto) {
    const findCustomer = await this.customerService.findByEmail(customer.email);
    if(!findCustomer)
      throw new NotFoundException("Invalid Credentials");

    if (findCustomer?.password !== customer.password) {
      throw new UnauthorizedException();
    }
    const payload = { sub: findCustomer.id, email: findCustomer.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
