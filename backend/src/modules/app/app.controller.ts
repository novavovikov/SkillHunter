import { Body, Controller, Get, Post, Session } from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getOk(): string {
    return this.appService.getOk()
  }

  @Post('registration')
  registration (
    @Body('skillset') skillset: string,
    @Session() session,
  ) {
    session.skillset = skillset
  }
}
