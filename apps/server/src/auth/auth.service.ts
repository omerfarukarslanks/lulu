import {Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {UserService} from "../user/user.service";
import {JwtService} from "@nestjs/jwt";
import {LoginDto} from "./dto/login.dto";
import {BcryptService} from "@lulu/service";

@Injectable()
export class AuthService {
  constructor(private userService: UserService,
              private jwtService: JwtService,
              private bcryptService: BcryptService) {
  }

  async validate(email: string, password: string) {
    const user = await this.userService.checkEmailUniqueness(email);
    if(!user)
      throw new NotFoundException("Invalid Credentials");

    const isPasswordMatch = await this.bcryptService.compare(
      password,
      user[0].password,
    );
    if (!isPasswordMatch) {
      throw new UnauthorizedException();
    }
    return user;
  }

  async login(user: LoginDto) {
   const findUser = await this.validate(user.email, user.password)
    const payload = { sub: findUser[0].id, email: findUser[0].email, companyId: findUser[0].shopId };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
