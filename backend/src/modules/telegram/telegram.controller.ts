import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, UseGuards } from '@nestjs/common'
import { TELEGRAM_BOT_ID } from './constants/telegram'
import { TelegramService } from './telegram.service'
import { TelegramCallbackQueryDto, TelegramInitiatorDto, TelegramMessageDto } from './telegram.dto'
import { UserService } from '../user/user.service'
import { AuthService } from '../auth/auth.service'
import { UserData } from '../../common/decorators/user.decorator'
import { User } from '../user/user.entity'
import { AuthGuard } from '@nestjs/passport'
import { HttpMessageType } from '../../constants/exception'
import { JwtPayloadDto } from '../auth/Jwt-payload.dto'
import { isUrl } from '../../utils/url'
import { UserSkillService } from '../user-skill/user-skill.service'
import { generateKeyboard } from '../../utils/keyboard'
import { CacheService } from '../cache'
import { ResourceService } from '../resource/resource.service'
import { UserResourceService } from '../user-resource/user-resource.service'
import { Resource } from '../resource/resource.entity'

@Controller(`telegram`)
export class TelegramController {
  constructor (
    private cacheService: CacheService,
    private telegramService: TelegramService,
    private authService: AuthService,
    private userService: UserService,
    private userSkillService: UserSkillService,
    private userResourceService: UserResourceService,
    private resourceService: ResourceService,
  ) {}

  @Get('auth/:token')
  @UseGuards(AuthGuard('jwt'))
  async auth (
    @UserData() user: User,
    @Param('token') token: string,
  ) {
    const tokenData = AuthService.verifyToken(token) as JwtPayloadDto

    if (!tokenData || !tokenData.telegramId) {
      throw new HttpException({
        message: `Invalid token`,
        type: HttpMessageType.warning,
        statusCode: HttpStatus.BAD_REQUEST,
      }, HttpStatus.BAD_REQUEST)
    }

    if (user.telegramId) {
      throw new HttpException({
        message: `You have already logged in telegram`,
        type: HttpMessageType.warning,
        statusCode: HttpStatus.BAD_REQUEST,
      }, HttpStatus.BAD_REQUEST)
    }

    await this.userService.update(user.id, {
      telegramId: tokenData.telegramId,
    })

    this.telegramService.sendEvent('sendMessage', {
      chat_id: tokenData.telegramId,
      text: `Welcome, ${user.name}`,
    })

    return tokenData.telegramId
  }

  @Post(TELEGRAM_BOT_ID)
  async getData (
    @Body() body,
    @Body('message') message: TelegramMessageDto,
    @Body('callback_query') callbackQuery: TelegramCallbackQueryDto,
  ) {
    if (message) {
      return this.messageHandler(message)
    }

    if (callbackQuery) {
      return this.callbackQueryHandler(callbackQuery)
    }
  }

  @Post(`${TELEGRAM_BOT_ID}/:method`)
  sendEvent (
    @Param('method') method: string,
    @Body() params,
  ) {
    this.telegramService.sendEvent(method, params)
  }

  async identifyUser (initiator: TelegramInitiatorDto): Promise<User | null> {
    const { id: telegramId, is_bot } = initiator

    if (is_bot) {
      this.telegramService.sendEvent('sendMessage', {
        chat_id: telegramId,
        text: 'Bot not supported',
      })

      return null
    }

    const user = await this.userService.findOne({ telegramId })

    if (user) {
      return user
    }

    const token = AuthService.signPayload({ id: -1, telegramId }, {
      expiresIn: '2m',
    })

    const link = `[link](https://app.skillhunter.io/auth?token=${token})`
    this.telegramService.sendEvent('sendMessage', {
      chat_id: telegramId,
      text: `User is not found. Login by clicking on the ${link}`,
      parse_mode: 'Markdown',
    })

    return null
  }

  async selectSkillset (
    link: string,
    user: User
  ) {
    if (isUrl(link)) {
      await this.cacheService.set(`telegram:${user.id}`, {
        link,
      })

      return this.telegramService.sendEvent('sendMessage', {
        chat_id: user.telegramId,
        text: 'Choose skillset:',
        reply_markup: {
          inline_keyboard: generateKeyboard(user.skillsets, {
              field: 'name',
            },
          ),
        }
      })
    }

    return this.telegramService.sendEvent('sendMessage', {
      chat_id: user.telegramId,
      text: 'Link not found'
    })
  }

  async messageHandler (message: TelegramMessageDto) {
    const { from, text } = message

    const user = await this.identifyUser(from)

    if (!user) {
      return null
    }

    await this.selectSkillset(text, user)
  }

  async callbackQueryHandler (callbackQuery: TelegramCallbackQueryDto) {
    const { from, data, message } = callbackQuery
    const user = await this.identifyUser(from)

    if (!user) {
      return null
    }

    const userData = await this.cacheService.get(`telegram:${user.id}`) || {} as any

    if (userData.skillsetId) {
      const skillId = Number(data)
      const userSkill = await this.userSkillService.findById(skillId)
      const resource = await this.resourceService.createByLink(userData.link)

      console.log(222, resource)

      if (!resource) {
        return null
      }

      await this.userResourceService.addResource(
        user,
        userData.skillsetId,
        userSkill,
        resource as Resource
      )
      console.log(2, userData, skillId)
      return null
    }

    await this.selectSkill(Number(data), user)
  }

  async selectSkill (
    skillsetId: number,
    user: User,
  ) {
    const userData = await this.cacheService.get(`telegram:${user.id}`)
    await this.cacheService.set(`telegram:${user.id}`, {
      ...userData,
      skillsetId,
    })

    const userSkills = await this.userSkillService.find({ user, skillsetId })

    return this.telegramService.sendEvent('sendMessage', {
      chat_id: user.telegramId,
      text: 'Choose skill:',
      reply_markup: {
        inline_keyboard: generateKeyboard(userSkills, {
          field: 'skill.name',
        }),
      },
    })
  }
}
