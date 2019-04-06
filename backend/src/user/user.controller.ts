import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { UserService } from './user.service'
import { UserDto } from './user.dto'

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  showAllUsers() {
    return this.userService.showAll()
  }

  @Post()
  createUser(@Body() data: UserDto) {
    return this.userService.create(data)
  }

  @Get(':id')
  readUser(@Param('id') id: string) {
    return this.userService.read(id)
  }

  @Put(':id')
  updateUser(@Param('id') id: number, @Body() data: Partial<UserDto>) {
    return this.userService.update(id, data)
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.userService.delete(id)
  }
}
