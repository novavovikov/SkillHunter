import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import 'dotenv/config'
import session from 'express-session'
import { SESSION_SECRET_KEY } from './constants/sessions'
import { AppModule } from './modules/app/app.module'

const API_BASE_PATH = 'api'
const env = process.env.NODE_ENV || 'dev'
const port = process.env.PORT

async function bootstrap () {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix(API_BASE_PATH)

  if (env === 'dev') {
    const appName = process.env.APP_NAME
    const options = new DocumentBuilder().setTitle(`${appName} Application`).
      setDescription(`APIs for the ${appName} application.`).
      setVersion('1.0.0').
      setBasePath(API_BASE_PATH).
      setExternalDoc('For more information', 'http://swagger.io').
      addBearerAuth('Authorization', 'header', 'apiKey').
      build()

    const document = SwaggerModule.createDocument(app, options)
    SwaggerModule.setup('docs', app, document)
  }

  app.use(session({
    secret: SESSION_SECRET_KEY,
    cookie: {
      path: '/',
      domain: process.env.DOMAIN,
      maxAge: 1000 * 60 * 5
    }
  }))

  await app.listen(port)
  Logger.log(`Server running on http://localhost:${port}`)
}

bootstrap()
