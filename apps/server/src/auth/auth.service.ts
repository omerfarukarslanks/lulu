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
    const userCount = await this.userService.checkEmailUniquenessCountByEmailOrById(email);
    const user = await this.userService.findUserByEmail(email);
    if (userCount === 0)
      throw new NotFoundException("auth.error-message.invalid-credentials");

    if (!user?.isActive)
      throw new UnauthorizedException(null, 'auth.error-message.user-passive')

    const isPasswordMatch = await this.bcryptService.compare(
      password,
      user?.password,
    );
    if (!isPasswordMatch)
      throw new UnauthorizedException(null, 'auth.error-message.wrong-password');

    return user;
  }

  async login(user: LoginDto) {
    const findUser = await this.validate(user.email, user.password)
    const payload = {id: findUser?.id, email: findUser?.email, companyId: findUser?.shopId, roleId: findUser?.roleId};
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
