import {Body, Controller, Get, Param, ParseBoolPipe, ParseIntPipe, Post, Put, UseGuards} from '@nestjs/common';
import {UserService} from './user.service';
import {AuthGuard, RolesGuard} from "@lulu/guard";
import {CreateUserDto, RoleEnum, UpdateUserDto} from "@lulu/model";
import {HasRole} from "@lulu/decorator";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HasRole([RoleEnum.ADMIN])
  @UseGuards(AuthGuard,RolesGuard)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @HasRole([RoleEnum.ADMIN])
  @UseGuards(AuthGuard,RolesGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @HasRole([RoleEnum.ADMIN])
  @UseGuards(AuthGuard,RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @HasRole([RoleEnum.ADMIN])
  @UseGuards(AuthGuard,RolesGuard)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.userService.update(+id, updateUserDto);
  }

  @HasRole([RoleEnum.ADMIN])
  @UseGuards(AuthGuard,RolesGuard)
  @Put('activation/:id/:isActive')
  userActivation(
    @Param('id', ParseIntPipe) id: number,
    @Param('isActive', ParseBoolPipe)  isActive: boolean,
  ) {
    return this.userService.userActivation(id, isActive);
  }
}
