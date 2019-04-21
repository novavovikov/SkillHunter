import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common'
import { UserService } from './user.service'
import { UserDto } from './user.dto'
import { AuthGuard } from '@nestjs/passport'

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  readUser(@Param('id') id: string) {
    return this.userService.read(id)
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  updateUser(@Param('id') id: number, @Body() data: Partial<UserDto>) {
    return this.userService.update(id, data)
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  deleteUser(@Param('id') id: number) {
    return this.userService.delete(id)
  }
}
