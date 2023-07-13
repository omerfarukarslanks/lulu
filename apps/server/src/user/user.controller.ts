import {Body, Controller, Delete, Get, Param, ParseBoolPipe, ParseIntPipe, Post, Put, UseGuards,} from '@nestjs/common';
import {UserService} from './user.service';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {AuthGuard} from "@lulu/guard";

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
