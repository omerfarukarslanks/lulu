import {Body, Controller, Delete, Get, Param, ParseBoolPipe, ParseIntPipe, Post, Put, UseGuards,} from '@nestjs/common';
import {UserService} from './user.service';
import {AuthGuard} from "@lulu/guard";
import {CreateUserDto, UpdateUserDto} from "@lulu/model";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.userService.update(+id, updateUserDto);
  }

  @UseGuards(AuthGuard)
  @Put('activation/:id/:isActive')
  userActivation(
    @Param('id', ParseIntPipe) id: number,
    @Param('isActive', ParseBoolPipe)  isActive: boolean,
  ) {
    return this.userService.userActivation(id, isActive);
  }
}
