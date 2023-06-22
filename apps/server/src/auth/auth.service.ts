import {Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {CustomerService} from "../customer/customer.service";
import {JwtService} from "@nestjs/jwt";
import {LoginDto} from "./dto/login.dto";
import {BcryptService} from "@translations-config/service";

@Injectable()
export class AuthService {
  constructor(private customerService: CustomerService,
              private jwtService: JwtService,
              private bcryptService: BcryptService) {
  }

  async validate(email: string, password: string) {
    const customer = await this.customerService.checkEmailUniqueness(email);
    if(!customer)
      throw new NotFoundException("Invalid Credentials");

    const isPasswordMatch = await this.bcryptService.compare(
      password,
      customer.email,
    );
    if (!isPasswordMatch) {
      throw new UnauthorizedException();
    }
    return customer;
  }

  async login(customer: LoginDto) {
   const findCustomer = await this.validate(customer.email, customer.password)
    const payload = { sub: findCustomer.id, email: findCustomer.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
